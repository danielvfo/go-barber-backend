import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment.model';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointments.repository';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  providerId: string;
  date: Date;
}

class CreateAppointmentsService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({
    providerId,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const roundDate = startOfHour(date);
    const foundAppointment = await this.appointmentsRepository.findByDate(
      roundDate
    );
    if (foundAppointment) {
      throw new AppError('This date and time already has a booking.');
    }
    const appointment = await this.appointmentsRepository.create({
      providerId,
      date: roundDate,
    });
    return appointment;
  }
}

export default CreateAppointmentsService;
