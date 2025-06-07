const axios = require('axios');
module.exports = (SAA_BASE_URL, authParams) => {
  const JOBS_SEARCH = "/jobs/searchv2"
  const SUPPORTED_OBSERVABLES = ['domain', 'ip', 'url', 'email', 'sha1', 'sha256', 'md5', 'filename']

  const getForsenicsByType = async (observable) => {
    if (!SUPPORTED_OBSERVABLES.includes(observable.type)) {
        return
    }
    let params = {"mode":"forensics", "field":observable.type, "type":"exact"}
    const response = await axios.post(SAA_BASE_URL+JOBS_SEARCH,{params: params});
    return response.data;
  }
};