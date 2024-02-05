import { Request, Response } from 'express';
import morgan from 'morgan';

// Morgan middleware
morgan.token('body', (req: Request, _res) => {
  return JSON.stringify(req.body);
});

const morganCustomTokens = ':method :url :status :res[content-length] - :response-time ms :body';
const customMorgan = morgan(morganCustomTokens);

// Catch requests to non-existing routes
const unknownEndpoint = (_req: Request, res: Response) => {
  return res.status(404).send({
    error: 'unknown endpoint'
  });
};