interface IUser {
  id: string;
  fullName: string;
  username: string;
  avatar: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export { IUser };
