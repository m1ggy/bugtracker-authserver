import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

const port = 3333 || process.env.PORT;

app.listen(8888, () => {
  console.log(`Auth server is listening on port ${port}`);
});
