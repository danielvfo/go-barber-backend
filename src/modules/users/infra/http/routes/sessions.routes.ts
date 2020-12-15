import { Router } from 'express';
import bodyParser from 'body-parser';
import CreateSessionsService from '@modules/users/services/CreateSessions.service';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const sessionsRouter = Router();

sessionsRouter.use(bodyParser.json());

sessionsRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { email, password } = request.body;
  const createSessionsService = new CreateSessionsService(usersRepository);

  const { user, token } = await createSessionsService.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionsRouter;
