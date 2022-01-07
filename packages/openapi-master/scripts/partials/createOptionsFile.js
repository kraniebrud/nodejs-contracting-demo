const fs = require('fs');
const path = require('path');

const dest = path.resolve(__dirname, '..', '.options.js')

/**
 * @returns {boolean}
 */
const hasExistingOptionsFile = () => {
  try {
    require(dest);
    return true;
  }
  catch {
    return false;
  }
}

const defaultOptions = `module.exports = {
  URL: 'https://stoplight.io/api/v1/projects/kranie/persons/nodes/persons-spec.json'
};`;

/**
 * creates the options file if not already exists
 * @returns {Promise<string>} path to options file
 */
const createOptionsFile = () => new Promise((resolve) => {
  if (hasExistingOptionsFile() === false) {
    fs.writeFileSync(dest, defaultOptions);
  }
  resolve(dest);
});

module.exports = createOptionsFile;
