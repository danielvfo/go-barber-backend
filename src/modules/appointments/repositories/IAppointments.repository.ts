import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment.model';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
