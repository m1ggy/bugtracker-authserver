import mongoose from 'mongoose';
import { commentSchema } from './commentModel';

const bugSchema = new mongoose.Schema({
  title: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  resolved: Boolean,
  thread: [commentSchema],
});

const bug = mongoose.model('bug', bugSchema);

export { bug, bugSchema };
