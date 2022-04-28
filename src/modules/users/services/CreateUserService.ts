import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { ICreateUserDto } from '../dtos/ICreateUserDto';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserDto) {
    const usernameAlreadyInUse = await this.usersRepository.findByUsername(data.username);
    if (usernameAlreadyInUse) throw new AppError('Username already in use', 422);

    const emailAlreadyInUse = await this.usersRepository.findByEmail(data.email);
    if (emailAlreadyInUse) throw new AppError('Email already in use', 422);

    const hashPassword = await hash(data.password, 8);
    const user = await this.usersRepository.create({ ...data, password: hashPassword });

    return user;
  }
}

export { CreateUserService };
