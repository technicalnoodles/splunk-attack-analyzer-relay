const axios = require('axios');
const tileTypes = require('../../utils/tileTypes.js');
const timeFunctions = require('../../utils/time.js');
const saaApiCalls = require('./tileData/submissionPoll.js');
module.exports = (app) => {
  app.post('/tiles', async (req, res) => {
    // console.log(req.headers);
    res.send({ data: tileTypes });
  });
  //   app.post('/tiles/tile', async (req, res) => {
  //     console.log(req.body);
  //     res.send({ data: tileTypes });
  //   });
  app.post('/tiles/tile-data', async (req, res) => {
    const postBody = req.body;
    console.log(postBody);
    const period = postBody.period;
    const tileId = postBody.tile_id;

    const nowTime = timeFunctions.getNow();
    const hourAgo = timeFunctions.getHourAgo(nowTime);
    const nowDate = new Date(nowTime * 1000);
    const hourDate = new Date(hourAgo * 1000);
    let timeFrame;
    let tileData;
    if (period === 'last_hour') {
      timeFrame = timeFunctions.getHourAgo(nowTime);
    }
    if (period === 'last_24_hours') {
      timeFrame = timeFunctions.getDayAgo(nowTime);
    }
    if (period === 'last_week') {
      timeFrame = timeFunctions.getMonthAgo(nowTime);
    }
    if (period === 'last_month') {
      timeFrame = timeFunctions.getMonthAgo(nowTime);
    }

    if (tileId === 'Splunk_Attack_Analyzer_File_Analyzed') {
      tileData = await saaApiCalls.getFilesSubmitted(timeFrame);
    }

    res.send({
      data: {
        tile_id: 'Splunk_Attack_Analyzer_File_Analyzed',
        cache_scope: 'org',
        labels: [['Critical', 'High', 'Medium', 'Low']],
        valid_time: {
          start_time: hourDate,
          end_time: nowDate,
        },
        observed_time: {
          start_time: hourDate,
          end_time: nowDate,
        },
        observable_type: false,
        data: tileData,
      },
    });
  });
};
