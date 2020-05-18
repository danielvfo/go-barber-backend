import { Router } from 'express';
import bodyParser from 'body-parser';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

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

  const appointment = {
    id: uuid(),
    provider,
    date: roundDate,
  };
  appointments.push(appointment);
  return response.json(appointment);
});

export default appointmentsRouter;
