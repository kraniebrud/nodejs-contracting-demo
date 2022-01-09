const fs = require('fs');

const { OAS_DIR, OAS_FILE_JSON } = require('../../opts/locations');
const createDefaultOptions = require('./partials/createOptionsFile');
const getSpecJson = require('./partials/getSpecJson');

module.exports = async () => {
  fs.rmSync(OAS_DIR, { recursive: true, force: true });
  fs.mkdirSync(OAS_DIR);

  await createDefaultOptions();
  const specJsonStr = await getSpecJson();
  fs.writeFileSync(OAS_FILE_JSON, specJsonStr);
};
