import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});