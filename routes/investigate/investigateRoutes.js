// const saa = require('../utils/saaApiCalls.js');
// const { getForsenicsByType } = require('../utils/saaApiCalls.js')
const axios = require('axios');
const JOBS_SEARCH = "/jobs/searchv2"
const SAA_BASE_URL = "https://api.global2.twinwave.io/v1"
  const SUPPORTED_OBSERVABLES = ['domain', 'ip', 'url', 'email', 'sha1', 'sha256', 'md5', 'filename']

  const getForsenicsByType = async (observable) => {
    if (!SUPPORTED_OBSERVABLES.includes(observable.type)) {
        return
    }
    const response = await axios.get(SAA_BASE_URL+JOBS_SEARCH, {
        params: {
            'mode': 'forensics', 'field':observable.type, 'type':'exact', 'count':100, 'score_min':70
        },
        headers: {
            'X-API-KEY': '398c4b2b01fe3af91e9cfe2132e8f19a84d23d323040bbf4'
        }
        });
    const data = await response.data
    console.log(data["Forensics"])
    // return response.data;
  }


module.exports = (app) => {
  app.post('/observe/observables', async (req, res) => {

    // console.log(req.headers)
        const exData= [
        {
            "type": "domain",
            "value": "ilo.brenz.pl"
        },
        {
            "type": "email",
            "value": "no-reply@internetbadguys.com"
        },
        {
            "type": "sha256",
            "value": "9f32b18120ec0bd113310fc2d21a29ea1182958d0a4b3388f7688197d1698f18"
        }
    ]
    if (req.headers["accept"] != "application/json") {
        res.status(406).send({ error: 'Not supported Accept Type' });
        return;
        }
    if (req.headers["content-type"] != "application/json") {
        res.status(406).send({ error: 'Not supported Content Type' });
        return;
        }
    else {
        getForsenicsByType(exData[2]).then((data) => {
        res.send({ data: { status: 'ok' } });
    })}

  
})}