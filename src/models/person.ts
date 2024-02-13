import mongoose from 'mongoose';
import { NewPerson } from '../types/person';

const personSchema = new mongoose.Schema<NewPerson>({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: String,
});

personSchema.set('toJSON', {
  transform: (_document, returnedObject: Record<string, string>) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<NewPerson>('Person', personSchema);
