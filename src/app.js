import express from 'express';
import eventRoutes from './routes/event.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
      res.send('hello event api ');
    });

app.use(errorHandler);

export default app;