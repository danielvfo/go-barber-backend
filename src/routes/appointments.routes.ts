import { Router } from 'express';
import bodyParser from 'body-parser';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();
appointmentsRouter.use(bodyParser.json());
const appointments = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const appointment = {
    id: uuid(),
    provider,
    date,
  };
  appointments.push(appointment);
  return response.json(appointment);
});

export default appointmentsRouter;
