const axios = require('axios');
import { getAuthHeaders } from '../../../utils/auth.js';
const getSaaData = async (offset, timeFrame) => {
  const apiKey = await getAuthHeaders();
  let response = await axios.get(
    'https://api.global2.twinwave.io/v1/jobs/poll',
    {
      params: {
        since: timeFrame,
        token: offset,
      },
      headers: {
        'X-API-Key': apiKey,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }
  );

  let data = await response.data;
  // console.log(data);
  return data;
};

const makeSubmissionData = (submissions) => {
  let submissionTotals = [
    {
      tooltip: 'Critical',
      value: 0,
      key: 0,
    },
    {
      tooltip: 'High',
      value: 0,
      key: 1,
    },
    {
      tooltip: 'Medium',
      value: 0,
      key: 2,
    },
    {
      tooltip: 'Low',
      value: 0,
      key: 3,
    },
  ];
  submissions.forEach((submission) => {
    let fileScore = submission['score'];
    if (fileScore < 50) {
      submissionTotals[3]['value'] = submissionTotals[3]['value'] + 1;
    }
    if (fileScore >= 50 && fileScore < 70) {
      submissionTotals[2]['value'] = submissionTotals[2]['value'] + 1;
    }
    if (fileScore >= 70 && fileScore < 90) {
      submissionTotals[1]['value'] = submissionTotals[1]['value'] + 1;
    }
    if (fileScore >= 90) {
      submissionTotals[0]['value'] = submissionTotals[0]['value'] + 1;
      console.log(submissionTotals[0]['value']);
    }
  });
  return submissionTotals;
};
const getFilesSubmitted = async (timeFrame) => {
  let submissions = [];
  newToken = '';
  let jobs = true;

  while (jobs) {
    const saaData = await getSaaData(newToken, timeFrame);
    newToken = await saaData.NextToken;
    if (saaData['Jobs'].length === 0) {
      jobs = false;
      break;
    }
    let reversedSaaData = saaData['Jobs'].reverse();
    reversedSaaData.forEach((job) => {
      let fileId = job['ID'];
      let fileScore = job['DisplayScore'];
      let fileTime = new Date(job['Resources'][0]['CreatedAt']);
      let fileEpochMili = fileTime.getTime() / 1000;
      let fileEpochSeconds = Math.floor(fileEpochMili);

      submissions.push({
        id: fileId,
        score: fileScore,
        time: fileEpochSeconds,
      });
    });
  }
  return makeSubmissionData(submissions);
};

module.exports.getFilesSubmitted = getFilesSubmitted;
