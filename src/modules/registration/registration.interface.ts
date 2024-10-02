export type TRegistration = {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
};

export type TLogin = {
  email: string;
  password: string;
};

export type TChangePassword = {
  newPassword: string;
  oldPassword: string;
};
