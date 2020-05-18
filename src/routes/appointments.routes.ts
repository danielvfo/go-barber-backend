import { Router } from 'express';
import bodyParser from 'body-parser';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment.model';

const appointmentsRouter = Router();
appointmentsRouter.use(bodyParser.json());
const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const roundDate = startOfHour(parseISO(date));

  const isDateAlreadyBooked = appointments.find(appointment =>
    isEqual(roundDate, appointment.date)
  );

  if (isDateAlreadyBooked) {
    return response.status(400).json({
      message: 'This date and time already has a booking.',
    });
  }

  const appointment = new Appointment(provider, roundDate);

  appointments.push(appointment);
  return response.json(appointment);
});

export default appointmentsRouter;
