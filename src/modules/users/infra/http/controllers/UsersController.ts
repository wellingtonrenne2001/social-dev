import { ICreateUserDto } from '@modules/users/dtos/ICreateUserDto';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { ShowUserService } from '@modules/users/services/ShowUserService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const data: ICreateUserDto = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute(data);

    return response.status(201).json(instanceToInstance(user));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const showUser = container.resolve(ShowUserService);
    const user = await showUser.execute(username);

    return response.json(instanceToInstance(user));
  }
}

export { UsersController };
