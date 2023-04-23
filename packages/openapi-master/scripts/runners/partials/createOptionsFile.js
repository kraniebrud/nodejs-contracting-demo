const fs = require('node:fs');

const { OPTIONS_FILE_JS } = require('../../../opts/locations');
const defaultOptions = require('../../../opts/defaults/options');

/**
 * @returns {boolean}
 */
const hasExistingOptionsFile = () => {
  try {
    require(OPTIONS_FILE_JS);
    return true;
  }
  catch {
    return false;
  }
}

const optionsJs = `module.exports = {
  // the url to retrieve specifactions from, fx '${defaultOptions.URL}'
  URL: '${defaultOptions.URL}'
};`;

/**
 * creates the options file if not already exists
 * @returns {Promise<string>} path to options file
 */
const createOptionsFile = () => new Promise((resolve) => {
  if (hasExistingOptionsFile() === false) {
    fs.writeFileSync(OPTIONS_FILE_JS, optionsJs);
  }
  resolve(OPTIONS_FILE_JS);
});

module.exports = createOptionsFile;
