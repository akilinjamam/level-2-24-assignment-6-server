import mongoose, { Schema } from 'mongoose';
import { TRegistration } from './registration.interface';

const userSchema = new Schema<TRegistration>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<TRegistration>('User', userSchema);

export default User;
