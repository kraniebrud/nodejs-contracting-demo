type Persons = typeof import('../db/persons');

declare const main: {
  get persons (): ReturnType<Persons>
}

export = main;
