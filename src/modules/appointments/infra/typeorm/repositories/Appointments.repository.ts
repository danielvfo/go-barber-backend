import { EntityRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment.model';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointments.repository';

@EntityRepository(Appointment)
class AppointmentsRepository
  extends Repository<Appointment>
  implements IAppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = await this.findOne({
      where: { date },
    });
    return foundAppointment;
  }
}

export default AppointmentsRepository;
