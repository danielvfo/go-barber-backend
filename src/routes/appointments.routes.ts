import { Router } from 'express';
import bodyParser from 'body-parser';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsService from '../services/Appointments.service';

const appointmentsRouter = Router();
const appointmentsService = new AppointmentsService();

appointmentsRouter.use(bodyParser.json());

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const roundDate = startOfHour(parseISO(date));

  const foundAppointment = appointmentsService.findByDate(roundDate);

  if (foundAppointment !== null) {
    return response.status(400).json({
      message: 'This date and time already has a booking.',
    });
  }

  const appointment = appointmentsService.create(provider, roundDate);

  return response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsService.all();
  return response.json(appointments);
});

export default appointmentsRouter;
