export type TRegistration = {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  profileImg?: string;
  coverImg?: string;
  verified?: boolean;
  premium?: boolean;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TChangePassword = {
  newPassword: string;
  oldPassword: string;
};

export type TRecoveryPassword = {
  email: string;
};
