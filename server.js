import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './connect.js';
import cookieParser from 'cookie-parser';
import routes from './routes.js';
dotenv.config();
const port = 3333 || process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.listen(port, () => {
  if (db) {
    console.log('connected to mongoDB!');
  }
  console.log(`Auth server is listening on port ${port}`);
});
