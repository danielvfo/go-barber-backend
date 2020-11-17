import { getRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment.model';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointments.repository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return foundAppointment;
  }

  public async create({
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ providerId, date });
    this.ormRepository.save(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
