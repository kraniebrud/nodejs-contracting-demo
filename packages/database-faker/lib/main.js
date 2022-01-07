const persons = require('../db/persons');

module.exports = {
  get persons() {
    return persons();
  },
}
