import cors from 'cors';
import express from 'express';
import env from './configs/env.config';
import bodyParser from 'body-parser';
import router from './routes/index';
import { setupSwagger } from './swagger';

const PORT = env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});

export default app;
