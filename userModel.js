import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  enrolledCourses: [{
    courseId: {
      type: String,
      required: true
    },
    progress: {
      type: Number,
      default: 0
    },
    lastAccessed: {
      type: Date,
      default: Date.now
    },
    completedLessons: [{
      moduleIndex: Number,
      lessonIndex: Number
    }],
    completedProjects: [Number]
  }],
  completedCourses: [{
    courseId: {
      type: String,
      required: true
    },
    completedDate: {
      type: Date,
      default: Date.now
    },
    certificateId: String
  }],
  interviewHistory: [{
    role: String,
    date: {
      type: Date,
      default: Date.now
    },
    score: Number,
    feedback: String,
    answers: [String]
  }],
  skills: [{
    name: String,
    level: Number
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;