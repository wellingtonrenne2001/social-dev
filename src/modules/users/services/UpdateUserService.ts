import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUpdateUserDto } from '../dtos/IUpdateUserDto';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(id: string, data: IUpdateUserDto) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);

    if (data.email) {
      const emailAlreadyInUse = await this.usersRepository.findByEmail(data.email);
      if (emailAlreadyInUse && user.email !== data.email) throw new AppError('Email already in use', 422);

      user.email = data.email;
    }

    user.fullName = data.fullName ? data.fullName : user.fullName;
    user.username = data.username ? data.username : user.username;
    user.password = data.password ? await hash(data.password, 8) : user.password;

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserService };
