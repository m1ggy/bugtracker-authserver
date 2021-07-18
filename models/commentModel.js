import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  author: String,
  content: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const comment = mongoose.model('comment', commentSchema);

export { comment, commentSchema };
