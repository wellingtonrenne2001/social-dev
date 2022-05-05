import { ICreateUserDto } from '@modules/users/dtos/ICreateUserDto';
import { IUpdateUserDto } from '@modules/users/dtos/IUpdateUserDto';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { DeleteUserService } from '@modules/users/services/DeleteUserService';
import { ShowUserService } from '@modules/users/services/ShowUserService';
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
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

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const data: IUpdateUserDto = request.body;

    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute(id, data);

    return response.json(instanceToInstance(user));
  }

  async updateAvatar(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const file = request.file as Express.Multer.File;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatar.execute(id, file.filename);

    return response.json(instanceToInstance(user));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute(id);

    return response.status(204).send();
  }
}

export { UsersController };
