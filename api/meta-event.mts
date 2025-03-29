// api/meta-event.mts (This runs on Vercel's servers, not the browser)

// Import types for Vercel Serverless Functions
import type { VercelRequest, VercelResponse } from '@vercel/node';
// Use node-fetch for making HTTP requests from the server
import fetch from 'node-fetch';
// Use crypto-js for hashing (needs to be installed as dependency)
import crypto from 'crypto-js';

// Hashing function (same as client-side util but runs on server)
const hashData = (data: string | null | undefined): string | null => {
    if (!data) return null;
    return crypto.SHA256(data.toLowerCase().trim()).toString(crypto.enc.Hex);
};

// This is the main function Vercel will run when /api/meta-event is called
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests (from our Thank You page fetch)
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // --- Get Data from the Request Body ---
    // This data comes from the fetch call in ThankYouPage.tsx
    const {
        eventName,       // e.g., 'Purchase'
        eventTime,       // Timestamp in seconds
        eventSourceUrl,  // The Thank You page URL
        userData,        // Data like userAgent sent from client
        customData,      // Data like value, currency
        actionSource,    // Should be 'website'
        eventId          // Optional: For deduplication if generated client-side
     } = req.body;

    // --- Get Secrets from Environment Variables ---
    // Vercel makes .env variables available via process.env
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;
    const apiVersion = 'v19.0'; // Use a recent API version

    // --- Validation ---
    if (!pixelId || !accessToken) {
        console.error('SERVER ERROR: Missing Meta Pixel ID or Access Token in environment variables.');
        return res.status(500).json({ message: 'Server configuration error.' });
    }
    if (!eventName || !eventTime || !eventSourceUrl || !userData || !customData) {
         console.error('SERVER ERROR: Missing required event data in request body.');
         return res.status(400).json({ message: 'Missing required event data.' });
    }


    // --- Prepare User Data for CAPI ---
    // IMPORTANT: Hash any PII *here* on the server if you were to receive it.
    // We are primarily relying on browser signals sent from the client + IP/UA added here.
    const capiUserData = {
        // Example: If email/phone were somehow securely passed (e.g., via webhook lookup - NOT from client body directly)
        // em: hashData(securelyObtainedEmail),
        // ph: hashData(securelyObtainedPhone),

        // Add IP Address and User Agent from the request headers (more reliable than client-sent)
        client_ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress || undefined, // Get user's IP
        client_user_agent: req.headers['user-agent'] || undefined, // Get user's browser/device info

        // Pass through browser cookies if sent from client (optional, might require helper)
        fbc: userData?.fbc || undefined,
        fbp: userData?.fbp || undefined,
    };

    // Clean up undefined values, Meta API might reject nulls for some fields
     Object.keys(capiUserData).forEach(key => {
        if (capiUserData[key as keyof typeof capiUserData] === undefined) {
            delete capiUserData[key as keyof typeof capiUserData];
        }
    });

    // --- Construct the CAPI Payload ---
    const payload = {
        data: [
            {
                event_name: eventName,
                event_time: eventTime,
                action_source: actionSource || 'website',
                event_source_url: eventSourceUrl,
                event_id: eventId, // Include if provided for deduplication
                user_data: capiUserData,
                custom_data: customData, // e.g., { value: 1295, currency: 'EUR', ... }
            },
        ],
        // --- TESTING ---
        // Uncomment and add your Test Event Code from Meta Events Manager during testing
        // test_event_code: 'YOUR_TEST_EVENT_CODE'
    };

    // --- Send Data to Meta CAPI ---
    const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${accessToken}`;

    try {
        console.log('Sending CAPI Event to Meta:', JSON.stringify(payload, null, 2));

        const metaResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const metaResponseData = await metaResponse.json(); // Attempt to parse Meta's response

        if (!metaResponse.ok) {
            console.error('Meta CAPI Request Failed:', metaResponse.status, metaResponse.statusText, metaResponseData);
            // Return a generic error to the client
            return res.status(500).json({ message: 'Failed to send event data to Meta.' });
        }

        // Success!
        console.log('Meta CAPI Request Succeeded:', metaResponseData);
        return res.status(200).json({ message: 'Event successfully sent via CAPI.', facebook_response: metaResponseData });

    } catch (error) {
        console.error('Error calling Meta CAPI:', error);
        return res.status(500).json({ message: 'Internal server error while sending event.' });
    }
}