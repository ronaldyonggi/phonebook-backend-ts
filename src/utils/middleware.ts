import { Request } from 'express';
import morgan from 'morgan';

// Morgan middleware
morgan.token('body', (req: Request, _res) => {
  return JSON.stringify(req.body);
});

const morganCustomTokens = ':method :url :status :res[content-length] - :response-time ms :body';
const customMorgan = morgan(morganCustomTokens);