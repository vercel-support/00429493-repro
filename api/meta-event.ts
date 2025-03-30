// api/meta-event.ts (Using ES Module Syntax)

import fetch from 'node-fetch';
import crypto from 'crypto-js';
// Import Vercel types (optional but good practice)
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Hashing function remains the same
const hashData = (data: string | null | undefined): string | null => {
    if (!data) return null;
    return crypto.SHA256(data.toLowerCase().trim()).toString(crypto.enc.Hex);
};

// Use export default for the handler
export default async (req: VercelRequest, res: VercelResponse) => {
     // Allow CORS
     res.setHeader('Access-Control-Allow-Credentials', 'true');
     res.setHeader('Access-Control-Allow-Origin', '*'); // Restrict in production!
     res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS'); // Allow POST and OPTIONS
     res.setHeader(
       'Access-Control-Allow-Headers',
       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
     );

     // Handle OPTIONS preflight request for CORS
     if (req.method === 'OPTIONS') {
         res.status(200).end();
         return;
     }

    // Ensure only POST requests proceed after OPTIONS
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

     console.log("API Function: Received POST request (ESM/.ts).");

     // Use optional chaining and nullish coalescing for safety
    const {
        eventName,
        eventTime,
        eventSourceUrl,
        userData = {}, // Default to empty object
        customData = {}, // Default to empty object
        actionSource,
        eventId
    } = req.body ?? {}; // Use nullish coalescing for req.body

    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;
    const apiVersion = 'v19.0';

    // Improved Validation
    if (!pixelId || !accessToken) {
         console.error('API Function ERROR: Missing Meta Pixel ID or Access Token env variables.');
         return res.status(500).json({ message: 'Server configuration error.' });
    }
    // Check specifically for required fields from customData as well
    if (!eventName || !eventTime || !eventSourceUrl || !customData.value || !customData.currency) {
          console.error('API Function ERROR: Missing required event data (eventName, eventTime, eventSourceUrl, customData.value, customData.currency).', { body: req.body });
          return res.status(400).json({ message: 'Missing required event data fields.' });
     }

    // Prepare User Data (Handle potential undefined safely)
    const capiUserData = {
        client_ip_address: req.headers['x-forwarded-for'] as string || req.socket?.remoteAddress || undefined,
        client_user_agent: req.headers['user-agent'] || undefined,
        fbc: userData.fbc || undefined, // Access potential properties via userData default
        fbp: userData.fbp || undefined,
    };
    Object.keys(capiUserData).forEach(key => {
        if (capiUserData[key as keyof typeof capiUserData] === undefined) {
             delete capiUserData[key as keyof typeof capiUserData];
        }
    });

    const payload = {
        data: [{
            event_name: eventName,
            event_time: eventTime,
            action_source: actionSource || 'website',
            event_source_url: eventSourceUrl,
            event_id: eventId, // Pass if available
            user_data: capiUserData,
            custom_data: customData
        }],
         test_event_code: "TEST25707" // Keep for testing
    };

    const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${accessToken}`;

    try {
        console.log('API Function: Sending CAPI Event (ESM):', JSON.stringify(payload, null, 2));
        const metaResponse = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const responseText = await metaResponse.text(); // Always get text first
        console.log('API Function: Meta Response Status:', metaResponse.status);
        console.log('API Function: Meta Response Text:', responseText);

        if (!metaResponse.ok) {
            console.error('API Function ERROR: Meta CAPI Request Failed:', metaResponse.status, responseText);
            let errorData; try { errorData = JSON.parse(responseText); } catch(e) { errorData = { errorText: responseText }; }
            // Return 502 Bad Gateway if Meta responded badly, 500 for other fetch errors
            return res.status(502).json({ message: 'Failed to send event to Meta.', details: errorData });
        }

        let metaResponseData; try { metaResponseData = JSON.parse(responseText); } catch(e) { metaResponseData = { responseText: responseText }; }
        console.log('API Function: Meta CAPI Succeeded (ESM):', metaResponseData);
        return res.status(200).json({ message: 'Event sent via CAPI (ESM/.ts).', fb_response: metaResponseData });

    } catch (error: any) {
        console.error('API Function ERROR: Exception calling Meta CAPI:', error);
        return res.status(500).json({ message: 'Internal server error while sending event.', error: error.message });
    }
};