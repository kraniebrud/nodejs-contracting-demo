const https = require('https');

const { OPTIONS_FILE_JS } = require('../../opts/locactions');

const fallback = {
  URL: 'https://stoplight.io/api/v1/projects/kranie/persons/nodes/persons-spec.json',
};

const getOptions = () => {
  try {
    const { URL } = require(OPTIONS_FILE_JS);
    return {
      URL,
    };
  } catch {
    return {
      ...fallback,
    };
  };
};

/**
 * get openapi specification from options file URL
 * @returns {Promise<Buffer>} openapi specifications data
 */
const getSpecJson = () => new Promise((resolve, reject) => {
  const { URL } = getOptions();
  https.get(URL, (res) => {
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
