import mongoose from 'mongoose';
import { NewPerson } from '../types/person';

const personSchema = new mongoose.Schema<NewPerson>({
  name: {
    type: String,
    required: true,
  },
  number: String,
});

export default mongoose.model<NewPerson>('Person', personSchema);
