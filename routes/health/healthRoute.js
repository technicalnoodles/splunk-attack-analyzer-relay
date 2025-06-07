module.exports = (app) => {
  app.post('/health', async (req, res) => {
    console.log(req.headers);
    res.send({ data: { status: 'ok' } });
  });
};
