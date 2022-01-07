type Persons = typeof import('./data/persons');
type Person = Persons[0];
type PersonInput = Omit<Person, 'personId'>;

declare const persons: {
  get getAll(): () => Persons;
  get getPersonById(): (personId: Person['personId']) => Person;
  get createPerson(): (person: PersonInput) => { personId: Person['personId'] };
};

export = persons;
