import uploadConfig from '@config/uploadConfig';
import { AppError } from '@shared/errors/AppError';
import { stat, unlink } from 'fs/promises';
import { join } from 'path';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(id: string, fileName: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);

    if (user.avatar) {
      const userAvatarFilePath = join(uploadConfig.uploadsFolderPath, user.avatar);
      const userAvatarFileStat = await stat(userAvatarFilePath);

      if (userAvatarFileStat) unlink(userAvatarFilePath);
    }

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarService };
