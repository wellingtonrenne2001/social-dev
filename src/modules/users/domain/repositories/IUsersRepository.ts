import { ICreateUserDto } from '@modules/users/dtos/ICreateUserDto';
import { IUser } from '../models/IUser';

interface IUsersRepository {
  create(data: ICreateUserDto): Promise<IUser>;
  save(user: IUser): Promise<void>;
  findById(id: string): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository };
