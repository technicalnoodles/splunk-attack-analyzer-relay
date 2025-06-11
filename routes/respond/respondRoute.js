const auth = require('../../utils/auth.js');
const axios = require('axios');
const JOBS_SEARCH = '/jobs/urls';
const SAA_BASE_URL = 'https://api.global2.twinwave.io/v1';

const urlLoopRefer = async (observableArray) => {
  let returnData = [];
  for (const observable of observableArray) {
    if (observable.type === 'url') {
      console.log(`Processing URL: ${observable.value}`);
      await returnData.push({
        id: `ref-saa-respond-url`,
        title: 'Analyze URL in SAA',
        description: 'Submit this URL to SAA',
        'query-params': {
          observable_value: observable.value,
          observable_type: observable.type,
        },
      });
      console.log(returnData);
    }
    if (observable.type === 'domain') {
      console.log(`Processing URL: ${observable.value}`);
      await returnData.push({
        id: 'ref-saa-respond-domain',
        title: 'Analyze Domain in SAA',
        description: 'Submit this domain to SAA',
        'query-params': {
          observable_value: observable.value,
          observable_type: observable.type,
        },
      });
      console.log(returnData);
    }
  }

  return returnData;
};

const exData = {
  observable_type: 'url',
  observable_value: 'http://gooogle.com/',
  'action-id': 'ref-saa-respond-url',
};

const submitDomain = async (observable, apiKey) => {
  const data = {
    url: `https://${observable}`,
    priority: 1,
    // engines: ['string'],
  };
  const request = await axios.post(
    'https://api.global2.twinwave.io/v1/jobs/urls',
    data,
    {
      headers: {
        'X-API-Key': apiKey,
      },
    }
  );
  const responseData = await request.data;
  if (responseData && responseData['JobID']) {
    console.log('URL submitted successfully:', responseData);
    return true;
  }
};
const submitUrl = async (observable, apiKey) => {
  console.log('Submitting URL:', observable);
  const data = {
    url: observable,
    priority: 1,
  };
  const request = await axios.post(
    'https://api.global2.twinwave.io/v1/jobs/urls',
    data,
    {
      headers: {
        'X-API-Key': apiKey,
      },
    }
  );
  const responseData = await request.data;
  if (responseData && responseData['JobID']) {
    console.log('URL submitted successfully:', responseData);
    return true;
  }
};

const respondHandler = async (observable, apiKey) => {
  //   const authParams = await auth.getAuthHeaders();
  if (observable['action-id'] === 'ref-saa-respond-url') {
    return await submitUrl(observable['observable_value'], apiKey);
  }
  if (observable['action-id'] === 'ref-saa-respond-domain') {
    return await submitDomain(observable['observable_value'], apiKey);
  }
  return false;
};

module.exports = (app) => {
  app.post('/respond/observables', async (req, res) => {
    const observables = req.body;
    const returnData = await urlLoopRefer(observables);
    res.send({ data: returnData });
  });

  app.post('/respond/trigger', async (req, res) => {
    const observables = req.body;
    const apiKey = await auth.getAuthHeaders();
    console.log(observables);
    await respondHandler(observables, apiKey)
      .then((data) => {
        if (data) {
          res.send({
            data: {
              status: 'success',
            },
          });
        } else {
          res.status(500).send({ error: 'Failed to submit observable' });
        }
      })
      .catch((error) => {
        console.error('Error in respondHandler:', error);
      });
  });
};
