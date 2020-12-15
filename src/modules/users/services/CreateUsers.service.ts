import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User.model';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestUserDTO {
  name: string;
  userName: string;
  email: string;
  password: string;
}

class CreateUsersService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    email,
    password,
  }: IRequestUserDTO): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('User email already registered.');
    }

    const hashedPassword = await hash(password, 7);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUsersService;
