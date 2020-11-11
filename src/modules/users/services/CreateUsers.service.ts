import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User.model';
import AppError from '@shared/errors/AppError';

interface RequestUserDTO {
  name: string;
  userName: string;
  email: string;
  password: string;
}

class CreateUsersService {
  public async execute({
    name,
    userName,
    email,
    password,
  }: RequestUserDTO): Promise<User> {
    const userRepository = getRepository(User);

    const emailExists = await userRepository.findOne({
      where: { email },
    });
    const userNameExists = await userRepository.findOne({
      where: { userName },
    });

    if (emailExists || userNameExists) {
      throw new AppError('User name or email already registered.');
    }

    const hashedPassword = await hash(password, 7);
    const user = userRepository.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);

    user.password = '';
    return user;
  }
}

export default CreateUsersService;
