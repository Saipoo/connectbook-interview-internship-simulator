import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  skills: [String],
  verificationUrl: String
}, {
  timestamps: true
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;