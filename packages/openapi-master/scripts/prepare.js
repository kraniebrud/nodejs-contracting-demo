const fs = require('fs');

const { OAS_DIR, OAS_FILE_JSON } = require('../opts/locactions');
const createDefaultOptions = require('./partials/createOptionsFile');
const getSpecJson = require('./partials/getSpecJson');

const clean = () => {
  fs.rmSync(OAS_DIR, { recursive: true, force: true });
  fs.mkdirSync(OAS_DIR);
};

/**
 * @param {string} dest
 * @param {Buffer | string} input
 */
const writeFile = (dest, input) => {
  fs.writeFileSync(dest, input);
};

;(async () => {
  try {
    clean();
    await createDefaultOptions();
    const specJsonStr = await getSpecJson();
    writeFile(OAS_FILE_JSON, specJsonStr);
  }
  catch(err) {
    console.error(err);
    process.exit(1);
  }
})();
