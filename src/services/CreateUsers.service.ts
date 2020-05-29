import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User.model';

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
      throw Error('User name or email already registered.');
    }

    const hashedPassword = await hash(password, 7);
    const user = userRepository.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);

    delete user.password;
    return user;
  }
}

export default CreateUsersService;
