import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './connect.js';
import journalRoute from './routes/journal.js';
import userRoute from './routes/user.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// routes
app.use('/api/journal', journalRoute);
app.use('/api/user', userRoute);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log('Server is listening on http://localhost:8080');
    })
  } catch (error) {
    console.log(error);
  }
}

startServer();