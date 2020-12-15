import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User.model';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestSessionDTO {
  email: string;
  password: string;
}

interface IResponseSessionDTO {
  user: User;
  token: string;
}
class CreateSessionsService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    email,
    password,
  }: IRequestSessionDTO): Promise<IResponseSessionDTO> {
    const user = await this.usersRepository.findByEmail(email);

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

    user.password = '';

    return { user, token };
  }
}

export default CreateSessionsService;
