import dbfaker from '@ncd/database-faker';
import app from '../app';

import { operations } from '../.oas/types';

type GetPersons = {
  200: operations['getPersons']['responses']['200']['content']['application/json'];
}
app.get('/persons', (_, res) => {
  const persons: GetPersons[200] = dbfaker.persons.getAll();

  res.json(persons);
});

type GetPersonById = {
  request: {
    params: operations['getPersonById']['parameters']['path'];
  },
  200: operations['getPersonById']['responses']['200']['content']['application/json'];
};
app.get('/persons/:personId', (req: GetPersonById['request'], res) => {
  const person: GetPersonById[200] = dbfaker.persons.getPersonById(req.params.personId);

  if(!person) {
    return res.status(404).send();
  }

  res.json(person);
});

type CreatePerson = {
  request: {
    body: operations['createPerson']['requestBody']['content']['application/json'];
  },
  201: operations['createPerson']['responses']['201']['content']['application/json'];
}
app.post('/persons', (req: CreatePerson['request'], res) => {
  const props = req.body;
  const result: CreatePerson[201] = dbfaker.persons.createPerson(props);

  res.status(201).json(result);
});
