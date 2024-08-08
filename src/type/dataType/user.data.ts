export type IUserDataType = {
  id: string;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  password: string;
  email: string;
  phone_number: string | null;
  role: string;
  points?: number;
  img: string | null;
  createdAt: string;
  updatedAt: string;
};

export type IUserSchema = {
  name: string;
  password: string;
  email: string;
  points?: number;
  img: string;
};
