import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment.model';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}
interface FindByDateDTO {
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);
    return appointment;
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate({ date }: FindByDateDTO): Appointment | null {
    const foundAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    );
    return foundAppointment || null;
  }
}

export default AppointmentsRepository;
