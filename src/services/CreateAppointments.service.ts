import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment.model';
import AppointmentsRepository from '../repositories/Appointments.repository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentsService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public excecute({ provider, date }: RequestDTO): Appointment {
    const roundDate = startOfHour(date);
    const foundAppointment = this.appointmentsRepository.findByDate({
      date: roundDate,
    });
    if (foundAppointment) {
      throw Error('This date and time already has a booking.');
    }
    const appointment = this.appointmentsRepository.create({
      provider,
      date: roundDate,
    });
    return appointment;
  }
}

export default CreateAppointmentsService;
