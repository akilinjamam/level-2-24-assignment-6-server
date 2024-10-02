export type TRegistration = {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
};
