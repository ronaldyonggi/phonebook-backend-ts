import { Request } from 'express';
import morgan from 'morgan';
import logger from './logger';
import { ExpressParams } from '../types/expressParams';

// Morgan middleware
morgan.token('body', (req: Request, _res) => {
  return JSON.stringify(req.body);
});

const morganCustomTokens = ':method :url :status :res[content-length] - :response-time ms :body';
const customMorgan = morgan(morganCustomTokens);

// Catch requests to non-existing routes
const unknownEndpoint = ({res}: ExpressParams) => {
  return res.status(404).send({
    error: 'unknown endpoint'
  });
};

// Error handler
const errorHandler = ({error, res, next}: ExpressParams) => {
  logger.error(error.message);

  switch (error.name) {
    case 'CastError':
      return res.status(400).send({ error: 'provided id has incorrect format'});
    case 'ValidationError':
      return res.status(400).json({ error: error.message });
    default:
      return next(error);
  }
};

export default {
  customMorgan,
  unknownEndpoint,
  errorHandler
};