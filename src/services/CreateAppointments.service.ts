import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment.model';
import AppointmentsRepository from '../repositories/Appointments.repository';

interface RequestDTO {
  providerId: string;
  date: Date;
}

class CreateAppointmentsService {
  public async execute({ providerId, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const roundDate = startOfHour(date);
    const foundAppointment = await appointmentsRepository.findByDate(roundDate);
    if (foundAppointment) {
      throw Error('This date and time already has a booking.');
    }
    const appointment = appointmentsRepository.create({
      providerId,
      date: roundDate,
    });
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentsService;
