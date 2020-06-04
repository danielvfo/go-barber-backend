import { Router } from 'express';
import bodyParser from 'body-parser';
import CreateSessionsService from '../services/CreateSessions.service';

const sessionsRouter = Router();

sessionsRouter.use(bodyParser.json());

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createSessionsService = new CreateSessionsService();

    const { user, token } = await createSessionsService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
