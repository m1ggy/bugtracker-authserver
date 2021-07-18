import mongoose from 'mongoose';
import { teamSchema } from './teamModel.js';

const userSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  teams: [teamSchema],
});

const user = mongoose.model('user', userSchema);

export { user, userSchema };
