// api/meta-event.ts (ESM Syntax EXCEPT for crypto-js require)

import fetch from 'node-fetch';
// Use require specifically for crypto-js
const crypto = require('crypto-js');
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Hashing function - now uses the 'required' crypto object
const hashData = (data: string | null | undefined): string | null => {
    if (!data) return null;
    return crypto.SHA256(data.toLowerCase().trim()).toString(crypto.enc.Hex);
};

// Export default handler function (still ESM)
export default async (req: VercelRequest, res: VercelResponse) => {
    // ... (Rest of the function code remains exactly the same as the previous full ESM version) ...
    // Make sure CORS headers are still present
     res.setHeader('Access-Control-Allow-Credentials', 'true');
     res.setHeader('Access-Control-Allow-Origin', '*'); // Restrict in production!
     res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
     res.setHeader(
       'Access-Control-Allow-Headers',
       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
     );

     if (req.method === 'OPTIONS') { res.status(200).end(); return; }
     if (req.method !== 'POST') { res.setHeader('Allow', ['POST', 'OPTIONS']); return res.status(405).json({ message: `Method ${req.method} Not Allowed` }); }

     console.log("API Function: Received POST request (ESM .ts / CJS crypto)."); // Log change

     const { eventName, eventTime, eventSourceUrl, userData = {}, customData = {}, actionSource, eventId } = req.body ?? {};
     const pixelId = process.env.META_PIXEL_ID;
     const accessToken = process.env.META_ACCESS_TOKEN;
     const apiVersion = 'v19.0';

     if (!pixelId || !accessToken) { /* ... */ return res.status(500).json({ message: '...' }); }
     if (!eventName || !eventTime || !eventSourceUrl || !customData.value || !customData.currency) { /* ... */ return res.status(400).json({ message: '...' }); }

     const capiUserData = { /* ... */ };
     Object.keys(capiUserData).forEach(/* ... */);

     const payload = { /* ... */ test_event_code: "TEST25707" };
     const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${accessToken}`;

     try {
         console.log('API Function: Sending CAPI Event (ESM .ts / CJS crypto):', JSON.stringify(payload, null, 2));
         const metaResponse = await fetch(url, { /* ... */ });
         const responseText = await metaResponse.text();
         /* ... logging ... */

         if (!metaResponse.ok) { /* ... error handling ... */ return res.status(502).json({ message: '...', details: {} });}

         let metaResponseData; /* ... parsing ... */
         console.log('API Function: Meta CAPI Succeeded:', metaResponseData);
         return res.status(200).json({ message: 'Event sent via CAPI (ESM .ts / CJS crypto).', fb_response: metaResponseData });

     } catch (error: any) { /* ... error handling ... */ return res.status(500).json({ message: '...', error: error.message }); }
};