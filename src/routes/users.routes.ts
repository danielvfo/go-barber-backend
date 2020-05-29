import { Router } from 'express';
import bodyParser from 'body-parser';
import CreateUsersService from '../services/CreateUsers.service';

const usersRouter = Router();

usersRouter.use(bodyParser.json());

usersRouter.post('/', async (request, response) => {
  try {
    const { name, userName, email, password } = request.body;
    const createUser = new CreateUsersService();
    const user = await createUser.execute({
      name,
      userName,
      email,
      password,
    });
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
