const https = require('https');

const { OPTIONS_FILE_JS } = require('../../../opts/locations');
const defaultOptions = require('../../../opts/defaults/options');

const getOptionsURL = () => {
  try {
    return require(OPTIONS_FILE_JS).URL;
  } catch {
    return defaultOptions.URL
  };
};

/**
 * get openapi specification from options file URL
 * @returns {Promise<Buffer>} openapi specifications data
 */
const getSpecJson = () => new Promise((resolve, reject) => {
  const specJsonURL = getOptionsURL();
  https.get(specJsonURL, (res) => {
    const { statusCode } = res

    if(statusCode >= 400){
      reject(`${statusCode}: failed to obtain openapi specifications from "${URL}"`);
    }

    let data = [];

    res.on('data', (chunk) => {
      data.push(chunk);
    });

    res.on('end', () => {
      const result = Buffer.concat(data);
      resolve(result);
    });
  })
  .on('error', (err) => {
    console.log('err', err)
    reject(err);
  });
});

module.exports = getSpecJson;
