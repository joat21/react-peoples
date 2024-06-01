export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export interface People {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  age: number;
  gender: Gender;
  city: string;
}

export type AuthData = {
  token: string;
  data: People;
};

export type RegData = Omit<People, "id"> & { password: string };
