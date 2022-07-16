const faker = require('faker');

const getFakeAvatarUrl = (personId) => {
  return `https://robohash.org/${personId}`;
}

const maybeUndefined = (input) => {
  const asUndefined = Math.round(Math.random() * 1) === 1;
  if (asUndefined) {
    return undefined
  }
  return typeof input === 'function' ? input() : input;
};

const personsArr = [];

do {
  const personId = personsArr.length + 1;
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  const person = {
    personId,
    firstName,
    lastName,
    email: `${firstName}${lastName}@mailit.net`
  }

  // lets mix it up, with and w/o optional - avatar, address
  const avatar = maybeUndefined(getFakeAvatarUrl(personId));
  const address = maybeUndefined({
    streetAddress: faker.address.streetAddress(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    country: faker.address.country(),
  });

  if (avatar) {
    person.avatar = avatar;
  }

  if (address) {
    person.address = address;
  }

  personsArr.push(person);
}
while (personsArr.length < 10);

module.exports = [ ...personsArr ];
