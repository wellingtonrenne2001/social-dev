import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(username: string) {
    const user = await this.usersRepository.findByUsername(username);
    if (!user) throw new AppError('User not found', 404);

    return user;
  }
}

export { ShowUserService };
