import { isEqual, parseISO } from 'date-fns';
import Appointment from '../models/Appointment.model';

class AppointmentsService {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const foundAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    );

    return foundAppointment || null;
  }
}

export default AppointmentsService;
