import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: String,
  dateCreated: {
    type: Date,
    dafault: Date.now,
  },
});

const team = mongoose.model('team', teamSchema);

export { team, teamSchema };
