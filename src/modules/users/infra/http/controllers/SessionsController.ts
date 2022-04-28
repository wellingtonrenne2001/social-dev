import { ICreateSessionDto } from '@modules/users/dtos/ICreateSessionDto';
import { CreateSessionService } from '@modules/users/services/CreateSessionService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const data: ICreateSessionDto = request.body;

    const createSession = container.resolve(CreateSessionService);
    const token = await createSession.execute(data);

    return response.status(201).json({ token });
  }
}

export { SessionsController };
