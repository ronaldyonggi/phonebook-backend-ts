import { NextFunction, Request, Response } from 'express';
import PersonModel from '../models/person';
import toNewPerson from '../utils/utils';

// GET all persons
const getAllPersons = (_req: Request, res: Response, next: NextFunction) => {
  PersonModel.find({})
    .then(persons => res.json(persons))
    .catch(error => next(error));
};

// GET a specific person based on given id
const getPerson = (req: Request, res: Response, next: NextFunction) => {
  PersonModel.findById(req.params.id)
    .then(person => {
      person ? res.json(person).end() : res.status(404).json({ error : 'Cannot find note with that id'}).end();
    })
    .catch(error => next(error));
};

// DELETE a specific person based on given id
const deletePerson = (req: Request, res: Response, next: NextFunction) => {
  PersonModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
};

// UPDATE a specific person
const updatePerson = (req: Request, res: Response, next: NextFunction) => {
  const {name, number} = toNewPerson(req.body);

  const toUpdatePerson = {
    name, number
  };

  PersonModel.findByIdAndUpdate(req.params.id, toUpdatePerson, { new: true})
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error));
};

// CREATE a person
const createPerson = (req: Request, res: Response, next: NextFunction) => {
  const validatedPerson = toNewPerson(req.body);

  const newPerson = new PersonModel({
    ...validatedPerson
  });

  newPerson.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => next(error));
};

export default {
  getAllPersons,
  getPerson,
  deletePerson,
  updatePerson,
  createPerson
};