import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User.model';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface RequestSessionDTO {
  email: string;
  password: string;
}

interface ResponseSessionDTO {
  user: User;
  token: string;
}
class CreateSessionsService {
  public async execute({
    email,
    password,
  }: RequestSessionDTO): Promise<ResponseSessionDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email or password', 401);
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new AppError('Incorrect email or password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    delete user.password;

    return { user, token };
  }
}

export default CreateSessionsService;
