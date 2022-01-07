const persons = require('./fake/persons');

module.exports = () => {
  return {
    get getAll() {
      return persons.getAll;
    },
    get getPersonById() {
      return persons.getPersonById;
    },
    get createPerson() {
      return persons.createPerson;
    },
  }
}
