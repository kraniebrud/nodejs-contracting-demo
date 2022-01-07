const { OAS_FILE_JSON } = require('../opts/locactions');

module.exports = {
  get specJson() {
    return { file: OAS_FILE_JSON };
  }
};
