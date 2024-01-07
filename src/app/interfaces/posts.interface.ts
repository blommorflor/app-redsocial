import { User } from "./user.interface";

export interface Post {
  id?:        number;
  title:     string;
  content:   string;
  likes?:     number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
  user?:      User;
  userId?:   number;
}
