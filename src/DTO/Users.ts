export type UsersDTO = {
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  birthday: string;
  password: string;
};

export type AdminDTO = {
  userId: number;
  username: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export enum Role {
  'USER',
  'ADMIN',
  'WAITERS',
  'CHEFF',
  'CASIER',
}

export interface PhoneCodeDTO {
  id: number;
  name: string;
  dial_code: string;
  code: string;
}
