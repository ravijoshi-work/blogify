import { IGetUser } from "./user";

export interface IImage {
  id: string;
  url: string;
}

export interface IComment {
  _id: string;
  user: IGetUser;
  text: string;
  date: Date;
}

export interface IGetBlog {
  _id: string;
  title: string;
  description: string;
  excerpt: string;
  quote: string;
  image: IImage;
  category: "Songbirds" | "Waterfowl" | "Parrots" | "Seabirds" | "Gamebirds";
  authorId: IGetUser;
  likes: string[];
  comments: IComment[];
  createdAt: Date;
  ipdatedAt: Date;
}


export interface BlogPayload {
  title: string;
  description: string;
  excerpt: string;
  quote: string;
  image: IImage;
  category: "Songbirds" | "Waterfowl" | "Parrots" | "Seabirds" | "Gamebirds";
  authorId: IGetUser;
  likes: string[];
  comments: IComment[];
  createdAt: Date;
  ipdatedAt: Date;
}
