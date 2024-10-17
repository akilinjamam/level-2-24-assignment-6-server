import { Types } from 'mongoose';

export type TPosts = {
  userId: Types.ObjectId;
  name: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  premium: boolean;
  favourite: boolean;
  upvotes: number;
};
