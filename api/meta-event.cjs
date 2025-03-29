// api/meta-event.cjs

const fetch = require('node-fetch');
const crypto = require('crypto-js');

const hashData = (data) => {
    if (!data) return null;
    return crypto.SHA256(data.toLowerCase().trim()).toString(crypto.enc.Hex);
};

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { eventName, eventTime, eventSourceUrl, userData, customData, actionSource, eventId } = req.body;

    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;
    const apiVersion = 'v19.0';

    if (!pixelId || !accessToken) {
        console.error('SERVER ERROR: Missing Meta Pixel ID or Access Token.');
        return res.status(500).json({ message: 'Server configuration error.' });
    }
     if (!eventName || !eventTime || !eventSourceUrl || !userData || !customData) {
         console.error('SERVER ERROR: Missing required event data.');
         return res.status(400).json({ message: 'Missing required event data.' });
    }

    const capiUserData = {
        client_ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress || undefined,
        client_user_agent: req.headers['user-agent'] || undefined,
        fbc: userData?.fbc || undefined,
        fbp: userData?.fbp || undefined,
    };

    Object.keys(capiUserData).forEach(key => {
        if (capiUserData[key] === undefined) delete capiUserData[key];
    });

    const payload = {
        data: [{
            event_name: eventName,
            event_time: eventTime,
            action_source: actionSource || 'website',
            event_source_url: eventSourceUrl,
            event_id: eventId,
            user_data: capiUserData,
            custom_data: customData
        }],
         test_event_code: "TEST25707" // Keep this for testing CAPI
    };

    const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${accessToken}`;

    try {
        console.log('Sending CAPI Event (CommonJS):', JSON.stringify(payload, null, 2));
        const metaResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const metaResponseData = await metaResponse.json();

        if (!metaResponse.ok) {
            console.error('Meta CAPI Failed:', metaResponse.status, metaResponseData);
            return res.status(500).json({ message: 'Failed to send event to Meta.' });
        }
        console.log('Meta CAPI Succeeded:', metaResponseData);
        return res.status(200).json({ message: 'Event sent via CAPI (CommonJS).', fb_response: metaResponseData });

    } catch (error) {
        console.error('Error calling Meta CAPI:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};