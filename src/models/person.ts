import mongoose from 'mongoose';
import { NewPerson } from '../types/person';

const personSchema = new mongoose.Schema<NewPerson>({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: (v: string) => /\d{2,3}-\d+/.test(v),
      message: props => `${props.value} is not a valid phone number`
    }
  }
});

personSchema.set('toJSON', {
  transform: (_document, returnedObject: Record<string, string>) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<NewPerson>('Person', personSchema);
