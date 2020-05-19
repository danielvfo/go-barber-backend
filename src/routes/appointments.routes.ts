import { Router } from 'express';
import bodyParser from 'body-parser';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/Appointments.repository';
import CreateAppointmentsService from '../services/CreateAppointments.service';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(bodyParser.json());

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentsService(
      appointmentsRepository
    );
    const appointment = createAppointment.excecute({
      provider,
      date: parsedDate,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

export default appointmentsRouter;
