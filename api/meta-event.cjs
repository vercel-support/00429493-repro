// api/meta-event.cjs - Minimal Test
module.exports = (req, res) => {
  console.log(`API Route Hit! Method: ${req.method}, Path: ${req.url}`);
  res.status(200).send('API Route OK');
};