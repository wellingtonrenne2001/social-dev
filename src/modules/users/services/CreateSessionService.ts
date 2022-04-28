import { authConfig } from '@config/authConfig';
import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { ICreateSessionDto } from '../dtos/ICreateSessionDto';

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateSessionDto) {
    const user = await this.usersRepository.findByEmail(data.email);
    if (!user) throw new AppError('Incorrect email or password');

    const passwordConfirm = await compare(data.password, user.password);
    if (!passwordConfirm) throw new AppError('Incorrect email or password');

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return token;
  }
}

export { CreateSessionService };
