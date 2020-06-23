import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User.model';
import uploadConfig from '../config/upload';

interface RequestUserAvatarDTO {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFilename,
  }: RequestUserAvatarDTO): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new Error('You must be authenticated to update your avatar.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const avatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (avatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await userRepository.save(user);
    delete user.password;
    return user;
  }
}

export default UpdateUserAvatarService;
