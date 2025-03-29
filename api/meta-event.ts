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

// Export default function (ESM style)
export default async (req: VercelRequest, res: VercelResponse) => {
     // Allow CORS
     res.setHeader('Access-Control-Allow-Credentials', 'true');
     res.setHeader('Access-Control-Allow-Origin', '*'); // Restrict in production
     res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
     res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

     if (req.method === 'OPTIONS') {
         res.status(200).end();
         return;
     }

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

     console.log("API Function: Received POST request (ESM/.ts).");

    const { eventName, eventTime, eventSourceUrl, userData, customData, actionSource, eventId } = req.body;

    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;
    const apiVersion = 'v19.0';

    if (!pixelId || !accessToken) { console.error('...'); return res.status(500).json({ message: '...' }); }
    if (!eventName || !eventTime || !eventSourceUrl || !userData || !customData) { console.error('...'); return res.status(400).json({ message: '...' }); }

    const capiUserData = {
        client_ip_address: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || undefined,
        client_user_agent: req.headers['user-agent'] || undefined,
        fbc: userData?.fbc || undefined,
        fbp: userData?.fbp || undefined,
    };
    Object.keys(capiUserData).forEach(key => { if (capiUserData[key as keyof typeof capiUserData] === undefined) delete capiUserData[key as keyof typeof capiUserData]; });

    const payload = {
        data: [{ event_name: eventName, event_time: eventTime, action_source: actionSource || 'website', event_source_url: eventSourceUrl, event_id: eventId, user_data: capiUserData, custom_data: customData }],
         test_event_code: "TEST25707"
    };

    const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${accessToken}`;

    try {
        console.log('API Function: Sending CAPI Event (ESM):', JSON.stringify(payload, null, 2));
        const metaResponse = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const responseText = await metaResponse.text();
        console.log('API Function: Meta Response Status:', metaResponse.status);
        console.log('API Function: Meta Response Text:', responseText);

        if (!metaResponse.ok) { /* ... error handling ... */ return res.status(500).json({ message: '...', details: {} });}

        let metaResponseData; try { metaResponseData = JSON.parse(responseText); } catch(e) { metaResponseData = { responseText: responseText }; }
        console.log('API Function: Meta CAPI Succeeded (ESM):', metaResponseData);
        return res.status(200).json({ message: 'Event sent via CAPI (ESM/.ts).', fb_response: metaResponseData });

    } catch (error: any) { // Catch error properly
        console.error('API Function ERROR: Error calling Meta CAPI:', error);
        return res.status(500).json({ message: 'Internal server error while sending event.', error: error.message });
    }
};