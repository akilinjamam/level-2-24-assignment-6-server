import mongoose, { Schema } from 'mongoose';
import { TRegistration } from './registration.interface';

const userSchema = new Schema<TRegistration>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profileImg: {
      type: String,
      default: 'add profile img',
    },
    coverImg: {
      type: String,
      default: 'add cover img',
    },
    verified: {
      type: String,
      default: false,
    },
    premium: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<TRegistration>('User', userSchema);

export default User;
