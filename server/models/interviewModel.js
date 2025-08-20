import mongoose from 'mongoose';

const expectedPointSchema = new mongoose.Schema({
  point: String
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  expectedPoints: [String]
});

const interviewRoleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  icon: String,
  description: String,
  questions: [questionSchema]
}, {
  timestamps: true
});

const InterviewRole = mongoose.model('InterviewRole', interviewRoleSchema);

export default InterviewRole;