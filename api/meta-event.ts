// api/meta-event.ts (Standard ES Module Syntax)

import fetch from 'node-fetch'; // Standard ESM import for node-fetch v3+
import crypto from 'crypto-js'; // Standard ESM import (should work if types are correct)
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Hashing function using imported crypto
const hashData = (data: string | null | undefined): string | null => {
    if (!data) return null;
    // Use the imported crypto object
    return crypto.SHA256(data.toLowerCase().trim()).toString(crypto.enc.Hex);
};

export default async (req: VercelRequest, res: VercelResponse) => {
    // CORS Headers
     res.setHeader('Access-Control-Allow-Credentials', 'true');
     res.setHeader('Access-Control-Allow-Origin', '*'); // Restrict in production!
     res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
     res.setHeader(
       'Access-Control-Allow-Headers',
       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
     );

     if (req.method === 'OPTIONS') { res.status(200).end(); return; }
     if (req.method !== 'POST') { res.setHeader('Allow', ['POST', 'OPTIONS']); return res.status(405).json({ message: `Method ${req.method} Not Allowed` }); }

     console.log("API Function: Received POST request (Standard ESM/.ts).");

     const { eventName, eventTime, eventSourceUrl, userData = {}, customData = {}, actionSource, eventId } = req.body ?? {};
     const pixelId = process.env.META_PIXEL_ID;
     const accessToken = process.env.META_ACCESS_TOKEN;
     const apiVersion = 'v19.0';

     // Validation
     if (!pixelId || !accessToken) { console.error('...'); return res.status(500).json({ message: '...' }); }
     if (!eventName || !eventTime || !eventSourceUrl || !customData.value || !customData.currency) { console.error('...'); return res.status(400).json({ message: '...' }); }

     // Prepare User Data
     const capiUserData = {
         client_ip_address: req.headers['x-forwarded-for'] as string || req.socket?.remoteAddress || undefined,
         client_user_agent: req.headers['user-agent'] || undefined,
         fbc: userData.fbc || undefined,
         fbp: userData.fbp || undefined,
     };
     Object.keys(capiUserData).forEach((key) => { const typedKey = key as keyof typeof capiUserData; if (capiUserData[typedKey] === undefined) { delete capiUserData[typedKey]; }});

     // Construct Payload
     const payload = {
         data: [{ event_name: eventName, event_time: eventTime, action_source: actionSource || 'website', event_source_url: eventSourceUrl, event_id: eventId, user_data: capiUserData, custom_data: customData }],
          test_event_code: "TEST25707"
     };

     const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${accessToken}`;

     // Send to Meta API
     try {
         console.log('API Function: Sending CAPI Event (Standard ESM):', JSON.stringify(payload, null, 2));
         // Use imported fetch directly
         const metaResponse = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
         const responseText = await metaResponse.text();
         console.log('API Function: Meta Response Status:', metaResponse.status);
         console.log('API Function: Meta Response Text:', responseText);

         if (!metaResponse.ok) { /* ... error handling ... */ return res.status(502).json({ message: '...', details: {} });}

         let metaResponseData; try { metaResponseData = JSON.parse(responseText); } catch(e) { metaResponseData = { responseText: responseText }; }
         console.log('API Function: Meta CAPI Succeeded (Standard ESM):', metaResponseData);
         return res.status(200).json({ message: 'Event sent via CAPI (Standard ESM/.ts).', fb_response: metaResponseData });

     } catch (error: any) {
         console.error('API Function ERROR: Exception calling Meta CAPI:', error);
         return res.status(500).json({ message: 'Internal server error.', error: error.message });
     }
};