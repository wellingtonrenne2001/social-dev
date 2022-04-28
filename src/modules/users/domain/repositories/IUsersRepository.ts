import { ICreateUserDto } from '@modules/users/dtos/ICreateUserDto';
import { IUser } from '../models/IUser';

interface IUsersRepository {
  create(data: ICreateUserDto): Promise<IUser>;
  findByUsername(username: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  save(user: IUser): Promise<IUser>;
}

export { IUsersRepository };