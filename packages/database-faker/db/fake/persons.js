const _persons = require('./data/persons');

const createdPersons = [];

module.exports = {
  get getAll() {
    return () => {
      const personsList = [..._persons, ...createdPersons]
      return personsList.sort((a, b) => b.personId - a.personId);
    };
  },
  get getPersonById() {
    const { getAll } = this;
    return (/** @type {Number} */personId) => {
      const person = getAll().find((f) => f.personId === Number(personId));
      return person ? { ...person } : undefined;
    };
  },
  get createPerson() {
    const { getAll } = this;
    return ({ firstName, lastName, email, avatar, address }) => {
      const personId = getAll().length + 1;
      const person = {
        personId,
        firstName,
        lastName,
        email
      };

      if (avatar) {
        person.avatar = avatar;
      }
      if (address) {
        person.address = address;
      }

      createdPersons.push(person)

      return { personId };
    }
  },
}
