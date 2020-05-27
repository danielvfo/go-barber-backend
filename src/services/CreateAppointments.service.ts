import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment.model';
import AppointmentsRepository from '../repositories/Appointments.repository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentsService {
  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const roundDate = startOfHour(date);
    const foundAppointment = await appointmentsRepository.findByDate(roundDate);
    if (foundAppointment) {
      throw Error('This date and time already has a booking.');
    }
    const appointment = appointmentsRepository.create({
      provider,
      date: roundDate,
    });
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentsService;
