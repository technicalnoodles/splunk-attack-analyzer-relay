const ex = {
  data: {
    valid_time: {
      start_time: '2025-04-29T17:27:22.000Z',
      end_time: '2025-04-29T18:27:22.000Z',
    },
    module_type_id: 'd80e8041-e8ed-4d42-9b4c-7b0a7a4a6d1b',
    color_scale: 'status',
    module: 'Secure Malware Analytics - Event SOC',
    tile_id: 'total_submissions_by_threat_score',
    keys: [
      {
        key: 'low',
        label: 'Low (0-49)',
      },
      {
        key: 'medium',
        label: 'Medium (50-74)',
      },
      {
        key: 'high',
        label: 'High (75-89)',
      },
      {
        key: 'critical',
        label: 'Critical (90-100)',
      },
    ],
    cache_scope: 'org',
    key_type: 'timestamp',
    observable_type: false,
    period: 'last_hour',
    observed_time: {
      start_time: '2025-04-29T17:27:22.000Z',
      end_time: '2025-04-29T18:27:22.000Z',
    },
    module_instance_id: 'b5607d61-c89c-43a1-8e51-42d49a6f8db8',
    data: [
      {
        key: 1745946000000,
        values: [
          {
            key: 'low',
            value: 244,
          },
          {
            key: 'medium',
            value: 22,
          },
          {
            key: 'high',
            value: 34,
          },
          {
            key: 'critical',
            value: 1,
          },
        ],
      },
      {
        key: 1745949600000,
        values: [
          {
            key: 'low',
            value: 30,
          },
          {
            key: 'medium',
            value: 109,
          },
          {
            key: 'high',
            value: 56,
          },
          {
            key: 'critical',
            value: 0,
          },
        ],
      },
    ],
  },
};
import axios from 'axios';

const getNow = () => {
  const date = new Date();
  const epochTimeInSeconds = Math.floor(Date.now() / 1000);
  return epochTimeInSeconds;
};

const getHourAgo = (nowTime) => {
  const hourAgo = nowTime - 3600;
};

const getDayAgo = (nowTime) => {
  const dayAgo = nowTime - 86400;
};

const getWeekAgo = (nowTime) => {
  const weekAgo = nowTime - 604800;
};
const getMonthAgo = (nowTime) => {
  const monthAgo = nowTime - 2592000;
};
// const epochTimeInSeconds = Math.floor(Date.now() / 1000);
// const hourAgo = epochTimeInSeconds - 3600;
const hoursAgo = epochTimeInSeconds - 86400;
const sevenDaysAgo = epochTimeInSeconds - 604800;

let submissionTime = epochTimeInSeconds;
console.log(submissionTime);
let offset = 0;
let submissions = [];

const getSaaData = async (offset) => {
  let response = await axios.get(
    'https://api.global2.twinwave.io/v1/jobs/poll',
    {
      params: {
        count: 100,
        offset: offset,
        state: 'done',
      },
      headers: {
        'X-API-Key': '',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }
  );

  let data = await response.data;
  return data;
};

while (submissionTime > hourAgo) {
  const saaData = await getSaaData(offset);
  saaData.map((submission) => {
    let submissionID = submission['ID'];
    let submissionScore = submission['DisplayScore'];
    let date = new Date(submission['Resources'][0]['CreatedAt']);
    let epochTime = date.getTime() / 1000;
    let epochSeconds = Math.floor(epochTime);
    submissionTime = epochSeconds;
    console.log(submissionTime);
    if (epochSeconds >= hourAgo) {
      submissions.push({
        id: submissionID,
        score: submissionScore,
        time: epochSeconds,
      });
    }
  });
  offset += 100;
  console.log(submissions.length);
  console.log(submissionTime);
  console.log(hourAgo);
}

// const getSaaData = async () => {
//   let submissionTime = epochTimeInSeconds;
//   let offset = 0;
//   let submissions = [];
//   while (submissionTime > hourAgo) {
//     console.log(hourAgo);
//     console.log(submissionTime);
//     let response = await axios.get(
//       'https://api.global2.twinwave.io/v1/jobs/recent',
//       {
//         params: {
//           count: 100,
//           offset: offset,
//           state: 'done',
//         },
//         headers: {
//           'X-API-Key': '398c4b2b01fe3af91e9cfe2132e8f19a84d23d323040bbf4',
//           'Cache-Control': 'no-cache, no-store, must-revalidate',
//         },
//       }
//     );
//     // console.log(response.request);
//     let data = await response.data;
//     data.forEach((submission) => {
//       submissionID = submission['ID'];
//       submissionScore = submission['DisplayScore'];
//       let date = new Date(submission['Resources'][0]['CreatedAt']);
//       let epochTime = date.getTime() / 1000;
//       let epochSeconds = Math.floor(epochTime);
//       submissionTime = submissionTime - (submissionTime - epochSeconds);
//       if (epochSeconds >= hourAgo) {
//         submissions.push({
//           id: submissionID,
//           score: submissionScore,
//           time: epochSeconds,
//         });
//       }
//     });
//     offset += 100;
//     // let newTime = new Date(data[99]['Resources'][0]['CreatedAt']);
//     // let epochTime = newTime.getTime() / 1000;
//     // let epochSeconds = Math.floor(epochTime);
//     // submissionTime -= epochSeconds;
//     // console.log(submissions);
//     console.log(submissions.length);
//   }
// };

// // const dateString = '2025-04-29T18:45:05.277Z';
// // const date = new Date(dateString);
// // const epochTime = date.getTime() / 1000;
// // const epochSeconds = Math.floor(epochTime);

// getSaaData();
