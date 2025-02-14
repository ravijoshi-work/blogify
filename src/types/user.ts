export interface IAvatar {
  [key: string]: string;
}


export interface IGetUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  designation: string;
  avatar: IAvatar;
  age: string;
  location: string;
  about: string;
  createdAt: Date;
  updatedAt: Date;
  accessToken?: string;
}