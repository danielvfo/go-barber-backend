import { Router } from 'express';
import bodyParser from 'body-parser';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/Appointments.repository';
import CreateAppointmentsService from '../services/CreateAppointments.service';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const appointmentsRouter = Router();

appointmentsRouter.use(bodyParser.json());
appointmentsRouter.use(ensureAuthentication);

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { providerId, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentsService();
    const appointment = await createAppointment.execute({
      providerId,
      date: parsedDate,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

export default appointmentsRouter;
