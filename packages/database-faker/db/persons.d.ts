type Persons = typeof import('./fake/persons');

declare function persons(): {
  get getAll(): Persons['getAll'];
  get getPersonById(): Persons['getPersonById'];
  get createPerson(): Persons['createPerson'];
};

export = persons;
