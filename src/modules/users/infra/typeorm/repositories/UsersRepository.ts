import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { ICreateUserDto } from '@modules/users/dtos/ICreateUserDto';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private readonly repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create(data: ICreateUserDto): Promise<IUser> {
    const user = this.repository.create(data);
    await this.repository.save(user);

    return user;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const user = this.repository.findOneBy({ username });

    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = this.repository.findOneBy({ email });

    return user;
  }

  async save(user: IUser): Promise<IUser> {
    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
