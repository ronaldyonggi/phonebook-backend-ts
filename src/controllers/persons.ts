import PersonModel from '../models/person';
import { ExpressParams } from '../types/Express';
import toNewPerson from '../utils/person';

// GET all persons
const getAllPersons = ({res, next}: ExpressParams) => {
  PersonModel.find({})
    .then(persons => res.json(persons))
    .catch(error => next(error));
};

// GET a specific person based on given id
const getPerson = ({req, res, next}: ExpressParams) => {
  PersonModel.findById(req.params.id)
    .then(person => {
      person ? res.json(person).end() : res.status(404).json({ error : 'Cannot find note with that id'}).end()
    })
    .catch(error => next(error));
};

// DELETE a specific person based on given id
const deletePerson = ({req, res, next}: ExpressParams) => {
  PersonModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
};
