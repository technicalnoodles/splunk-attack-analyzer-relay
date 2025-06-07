const express = require('express');
const port = 6000;
const axios = require('axios');
const bodyParser = require('body-parser');

const SAA_BASE_URL = 'https://api.global2.twinwave.io/v1';

const app = express();
app.use(bodyParser.json());

require('./routes/health/healthRoute.js')(app);
// require('./routes/tiles/tilesRoute.js')(app);
require('./routes/deliberate/deliberateRoute.js')(app);
require('./routes/respond/respondRoute.js')(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
