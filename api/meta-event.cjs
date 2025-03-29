// api/meta-event.cjs - TEMPORARY TEST VERSION
module.exports = (req, res) => {
    console.log(`API route hit! Method: ${req.method}`); // Log method
    if (req.method === 'POST') {
      // Keep original POST logic (or just send simple success for now)
      console.log("Handling POST request");
      return res.status(200).json({ message: "POST received (test)" });
    } else if (req.method === 'GET') {
      // Respond to GET requests
       console.log("Handling GET request");
      return res.status(200).send('GET request received by meta-event function!');
    } else {
       // Reject other methods
       res.setHeader('Allow', ['GET', 'POST']);
       return res.status(405).json({ message: 'Method Not Allowed' });
    }
  };