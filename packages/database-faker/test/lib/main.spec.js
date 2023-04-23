const { describe, it } = require('node:test');

const { expect, assert } = require ('chai');

const dbfaker = require('../../lib/main');

// test data persons properties
const john = {
  firstName: 'john',
  lastName: 'doe',
  email: 'johndoe@mail.xyz',
};

const jane = {
  firstName: 'jane',
  lastName: 'doe',
  email: 'janedoe@mail.xyz',
  avatar: 'https://robohash.org/janedoe',
  address: {
    streetAddress: 'jane street',
    zipCode: '45600',
    city: 'jane city',
    country: 'jane country',
  }
};

describe('#persons', () => {
  describe('creation', () => {
    it('createPerson - without optionals', async () => {
      const created = dbfaker.persons.createPerson({ ...john });
      expect(created).to.have.property('personId').that.is.a('number');

      john.personId = created.personId;
    });

    it('createPerson - with optionals (avatar + address)', async () => {
      const created = dbfaker.persons.createPerson({ ...jane });
      expect(created).to.have.property('personId').that.is.a('number');

      jane.personId = created.personId;
    });
  })

  describe('retrieving', () => {
    it('getAll', async () => {
      const persons = dbfaker.persons.getAll();
      expect(persons).to.be.an('array').and.to.have.lengthOf.above(1);

      expect(persons).to.deep.include(john);
      expect(persons).to.deep.include(jane);

      for(const person of persons) {
        assert.isNumber(person.personId, 'personId');
        assert.isString(person.firstName, 'firstName');
        assert.isString(person.lastName, 'lastName');
        assert.isString(person.email, 'email');

        // optional avatar
        if (!person.avatar) {
          assert.isUndefined(person.avatar, 'avatar');
        }
        else {
          assert.isString(person.avatar, 'avatar')
        }

        // optional address
        if (!person.address) {
          assert.isUndefined(person.address, 'address');
        }
        else {
          assert.isString(person.address.streetAddress, 'streetAddress');
          assert.isString(person.address.zipCode, 'zipCode');
          assert.isString(person.address.city, 'city');
          assert.isString(person.address.country, 'country');
        }
      }
    });

    it('getPersonById - without optionals', async () => {
      const person = dbfaker.persons.getPersonById(john.personId);

      expect(person).to.have.all.keys([
        'personId',
        'firstName',
        'lastName',
        'email'
      ]);

      // we want to test to an extend where we include the declarations
      // this means instead of testing "object to deep equal / satisfy",
      // we will instead target the direct outcome of a person returned "ie. expect(person.personId)".
      // if not doing so, we will loose context and only test the I/O and not properly typecheck the property declarations.

      expect(person.personId).to.equal(john.personId);
      expect(person.firstName).to.equal(john.firstName);
      expect(person.lastName).to.equal(john.lastName);
      expect(person.email).to.equal(john.email);
    });

    it('getPersonById - with optionals (avatar + address)', async () => {
      const person = dbfaker.persons.getPersonById(jane.personId);

      expect(person).to.have.all.keys([
        'personId',
        'firstName',
        'lastName',
        'email',
        'avatar',
        'address',
      ]);

      expect(person.address).to.have.all.keys([
        'streetAddress',
        'zipCode',
        'city',
        'country',
      ]);

      // we want to test to an extend where we include the declarations
      // this means instead of testing "object to deep equal / satisfy",
      // we will instead target the direct outcome of a person returned "ie. expect(person.personId)".
      // if not doing so, we will loose context and only test the I/O and not properly typecheck the property declarations.

      expect(person.personId).to.equal(jane.personId);
      expect(person.firstName).to.equal(jane.firstName);
      expect(person.lastName).to.equal(jane.lastName);
      expect(person.email).to.equal(jane.email);
      expect(person.address).to.be.an('object');
      expect(person.address.streetAddress).to.equal(jane.address.streetAddress);
      expect(person.address.zipCode).to.equal(jane.address.zipCode);
      expect(person.address.city).to.equal(jane.address.city);
      expect(person.address.country).to.equal(jane.address.country);
    });
  })
});
