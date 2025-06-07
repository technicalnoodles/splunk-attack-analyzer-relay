const urlLoopRefer = async (observableArray) => {
  let returnData = [];
  for (const observable of observableArray) {
    // file pivots
    if (observable.type === 'sha256') {
      console.log(`Processing URL: ${observable.value}`);
      const observable_link = `https://app.global2.twinwave.io/search?mode=forensics&term=${observable.value}&field=sha256`;
      await returnData.push({
        id: `ref-saa-search-url-${observable.value}`,
        title: 'Search for this SHA256',
        description: 'Lookup this SHA256 in SAA',
        url: observable_link,
      });
      console.log(returnData);
    }
    if (observable.type === 'md5') {
      console.log(`Processing URL: ${observable.value}`);
      const observable_link = `https://app.global2.twinwave.io/search?mode=forensics&term=${observable.value}&field=md5`;
      await returnData.push({
        id: `ref-saa-search-url-${observable.value}`,
        title: 'Search for this MD5',
        description: 'Lookup this MD5 in SAA',
        url: observable_link,
      });
      console.log(returnData);
    }

    //web pivots
    if (observable.type === 'url') {
      console.log(`Processing URL: ${observable.value}`);
      const observable_link = `https://app.global2.twinwave.io/search?mode=forensics&term=${observable.value}&field=url`;
      await returnData.push({
        id: `ref-saa-search-url-${observable.value}`,
        title: 'Search for this URL',
        description: 'Lookup this URL in SAA',
        url: observable_link,
      });
      console.log(returnData);
    }
    if (observable.type === 'domain') {
      console.log(`Processing URL: ${observable.value}`);
      const observable_link = `https://app.global2.twinwave.io/search?mode=forensics&term=${observable.value}&field=domain`;
      await returnData.push({
        id: `ref-saa-search-url-${observable.value}`,
        title: 'Search for this domain',
        description: 'Lookup this domain in SAA',
        url: observable_link,
      });
      console.log(returnData);
    }
    if (observable.type === 'ip') {
      console.log(`Processing URL: ${observable.value}`);
      const observable_link = `https://app.global2.twinwave.io/search?mode=forensics&term=${observable.value}&field=ip`;
      await returnData.push({
        id: `ref-saa-search-url-${observable.value}`,
        title: 'Search for this IP',
        description: 'Lookup this IP in SAA',
        url: observable_link,
      });
      console.log(returnData);
    }
  }

  return returnData;
};

module.exports = (app) => {
  app.post('/refer/observables', async (req, res) => {
    const observables = req.body;
    const returnData = await urlLoopRefer(observables);
    res.send({ data: returnData });
  });
};
