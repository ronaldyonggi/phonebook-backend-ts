import { NextFunction, Request, Response } from 'express';
import PersonModel from '../models/person';

// GET all persons
const getAllPersons = (_req: Request, res: Response, next: NextFunction) => {
  PersonModel.find({})
    .then(persons => res.json(persons))
    .catch(error => next(error));
};
