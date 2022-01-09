const { OAS_FILE_JSON } = require('../opts/locations');

module.exports = {
  get specJson() {
    return { file: OAS_FILE_JSON };
  }
};
