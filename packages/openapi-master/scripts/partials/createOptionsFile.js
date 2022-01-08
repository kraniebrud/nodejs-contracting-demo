const fs = require('fs');
const path = require('path');

const { OPTIONS_FILE_JS } = require('../../opts/locactions');

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

const defaultOptions = `module.exports = {
  // the url to retrieve specifactions from, fx https://stoplight.io/api/v1/projects/kranie/persons/nodes/persons-spec.json
  URL: 'https://stoplight.io/api/v1/projects/kranie/persons/nodes/persons-spec.json'
};`;

/**
 * creates the options file if not already exists
 * @returns {Promise<string>} path to options file
 */
const createOptionsFile = () => new Promise((resolve) => {
  if (hasExistingOptionsFile() === false) {
    fs.writeFileSync(OPTIONS_FILE_JS, defaultOptions);
  }
  resolve(OPTIONS_FILE_JS);
});

module.exports = createOptionsFile;
