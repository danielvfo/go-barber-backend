import { Router } from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUsersService from '../services/CreateUsers.service';
import UpdateUserAvatarService from '../services/UpdateUserAvatar.service';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();
      const user = await updateUserAvatarService.execute({
        userId: request.user.id,
        avatarFilename: request.file.filename,
      });
      return response.json({ user });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
);

export default usersRouter;
