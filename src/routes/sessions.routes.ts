import { Router } from 'express';
import bodyParser from 'body-parser';
import CreateSessionsService from '../services/CreateSessions.service';

const sessionsRouter = Router();

sessionsRouter.use(bodyParser.json());

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionsService = new CreateSessionsService();

  const { user, token } = await createSessionsService.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionsRouter;
