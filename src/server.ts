import express from 'express';
import routes from './routes/index.routes';

const app = express();

app.use(routes);

app.listen(3333, () => {
  console.log('🧑🏽‍💻 -> Server up at :3333');
});
