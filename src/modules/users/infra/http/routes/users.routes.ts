import { Router } from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUsersService from '@modules/users/services/CreateUsers.service';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar.service';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.use(bodyParser.json());

usersRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { name, userName, email, password } = request.body;
  const createUser = new CreateUsersService(usersRepository);
  const user = await createUser.execute({
    name,
    userName,
    email,
    password,
  });
  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository
    );
    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });
    return response.json({ user });
  }
);

export default usersRouter;
