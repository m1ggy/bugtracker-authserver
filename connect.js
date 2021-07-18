import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to mongodb!');
  });

const db = mongoose.connection;

export { db };
