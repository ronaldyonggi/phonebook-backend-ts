import { NewPerson } from '../types/person';
import { isString } from './utils';

// String parser
const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error(`Invalid input: ${str}`);
  }
  return str;
};

// toNewPerson
const toNewPerson = (object: unknown): NewPerson => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data!');
  }

  if ('name' in object && 'number' in object) {
    const newPerson = {
      name: parseString(object.name),
      number: parseString(object.number)
    };

    return newPerson;
  }

  throw new Error('Invalid input data!');
};

export default toNewPerson;