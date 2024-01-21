import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import toNewPerson from './utils/person';
const app = express();

app.use(express.json());

let persons = [
  { 
    'id': 1,
    'name': 'Arto Hellas', 
    'number': '040-123456'
  },
  { 
    'id': 2,
    'name': 'Ada Lovelace', 
    'number': '39-44-5323523'
  },
  { 
    'id': 3,
    'name': 'Dan Abramov', 
    'number': '12-43-234345'
  },
  { 
    'id': 4,
    'name': 'Mary Poppendieck', 
    'number': '39-23-6423122'
  }
];

// GET all persons
app.get('/api/persons', (_req, res) => {
  return res.json(persons);
});

// INFO page
app.get('/info', (_req, res) => {
  return res.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`);
});

// GET a specific person
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const matchedPerson = persons.find(person => person.id === id);
  if (matchedPerson) {
    return res.json(matchedPerson);
  } else {
    return res.status(404).end();
  }
});

// DELETE a specific person
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const matchedPerson = persons.find(person => person.id === id);
  if (!matchedPerson) {
    return res.status(404).json({
      error: `no person with id ${id}`
    });
  }

  persons = persons.filter(person => person.id !== id);
  return res.status(202).json({
    message: 'person successfully deleted!'
  });
});

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

// CREATE a person
app.post('/api/persons', (req, res) => {
  const { name, number } = toNewPerson(req.body);

  const nameAlreadyExist = persons.find(person => person.name === name);
  if (nameAlreadyExist) {
    return res.status(400).json({
      error: 'Name already exists!'
    });
  }

  if (!name || !number) {
    return res.status(400).json({
      error: 'Missing information!'
    });
  }

  const id = getRandomInt(10, 10000);
  const newPerson = { id, name, number};
  persons = persons.concat(newPerson);
  return res.status(201).json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});