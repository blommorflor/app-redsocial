export interface User {
  id?:      number;
  fullName:  string;
  age:       number;
  email:     string;
  password:  string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
}
