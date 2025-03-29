// api/meta-event.js (Using CommonJS Syntax)

const fetch = require('node-fetch');
const crypto = require('crypto-js');

const hashData = (data) => {
    if (!data) return null;
    return crypto.SHA256(data.toLowerCase().trim()).toString(crypto.enc.Hex);
};

module.exports = async (req, res) => {
    // Allow CORS - Important for browser fetch to work
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Or restrict to your Vercel domain in production
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS preflight request for CORS
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST after handling OPTIONS
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST', 'OPTIONS']); // Update Allow header
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    console.log("API Function: Received POST request."); // Add log

    const { eventName, eventTime, eventSourceUrl, userData, customData, actionSource, eventId } = req.body;

    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;
    const apiVersion = 'v19.0';

    if (!pixelId || !accessToken) {
        console.error('API Function ERROR: Missing Meta Pixel ID or Access Token.');
        return res.status(500).json({ message: 'Server configuration error.' });
    }
     if (!eventName || !eventTime || !eventSourceUrl || !userData || !customData) {
         console.error('API Function ERROR: Missing required event data.');
         return res.status(400).json({ message: 'Missing required event data.' });
    }

    const capiUserData = {
        client_ip_address: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || undefined,
        client_user_agent: req.headers['user-agent'] || undefined,
        fbc: userData?.fbc || undefined,
        fbp: userData?.fbp || undefined,
    };
    Object.keys(capiUserData).forEach(key => {
        if (capiUserData[key] === undefined) delete capiUserData[key];
    });

    const payload = {
        data: [{ event_name: eventName, event_time: eventTime, action_source: actionSource || 'website', event_source_url: eventSourceUrl, event_id: eventId, user_data: capiUserData, custom_data: customData }],
         test_event_code: "TEST25707" // Keep test code
    };

    const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${accessToken}`;

    try {
        console.log('API Function: Sending CAPI Event to Meta:', JSON.stringify(payload, null, 2));
        const metaResponse = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), });
        // Try getting text first in case of non-JSON error from Meta
        const responseText = await metaResponse.text();
        console.log('API Function: Meta Response Status:', metaResponse.status);
        console.log('API Function: Meta Response Text:', responseText);

        if (!metaResponse.ok) {
            console.error('API Function ERROR: Meta CAPI Request Failed:', metaResponse.status, responseText);
            // Attempt to parse as JSON only if needed, otherwise send text
            let errorData; try { errorData = JSON.parse(responseText); } catch(e) { errorData = { errorText: responseText }; }
            return res.status(500).json({ message: 'Failed to send event to Meta.', details: errorData });
        }

        let metaResponseData; try { metaResponseData = JSON.parse(responseText); } catch(e) { metaResponseData = { responseText: responseText }; }
        console.log('API Function: Meta CAPI Succeeded:', metaResponseData);
        return res.status(200).json({ message: 'Event sent via CAPI (CommonJS/.js).', fb_response: metaResponseData });

    } catch (error) {
        console.error('API Function ERROR: Error calling Meta CAPI:', error);
        return res.status(500).json({ message: 'Internal server error while sending event.', error: error.message });
    }
};