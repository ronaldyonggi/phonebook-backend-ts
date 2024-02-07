import { NextFunction, Request, Response } from 'express';
import PersonModel from '../models/person';

// GET all persons
const getAllPersons = (_req: Request, res: Response, next: NextFunction) => {
  PersonModel.find({})
    .then(persons => res.json(persons))
    .catch(error => next(error));
};

// Get a specific person based on given id
const getPerson = (req: Request, res: Response, next: NextFunction) => {
  PersonModel.findById(req.params.id)
    .then(person => {
      person ? res.json(person).end() : res.status(404).json({ error : 'Cannot find note with that id'}).end()
    })
    .catch(error => next(error));
};