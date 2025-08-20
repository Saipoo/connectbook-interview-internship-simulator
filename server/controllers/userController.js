import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store hashed password
      enrolledCourses: [],
      completedCourses: [],
      interviewHistory: [],
      skills: []
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // Exclude password

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Enroll user in a course
// @route   POST /api/users/enroll
// @access  Private
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already enrolled
    const alreadyEnrolled = user.enrolledCourses.some(course => course.courseId === courseId);

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push({
      courseId,
      progress: 0,
      lastAccessed: new Date(),
      completedLessons: [],
      completedProjects: []
    });

    await user.save();

    res.status(201).json({ message: 'Successfully enrolled', enrolledCourses: user.enrolledCourses });
  } catch (error) {
    console.error('Error in enrollCourse:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Save interview results
// @route   POST /api/users/interview
// @access  Private
const saveInterviewResults = async (req, res) => {
  try {
    const { role, score, feedback, answers } = req.body;
    
    if (!role || score === undefined) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.interviewHistory.push({
      role,
      date: new Date(),
      score,
      feedback,
      answers: answers || []
    });

    // Update skills based on interview performance
    const skillName = role.toLowerCase().includes('software') ? 'Technical Interview' : 
                     role.toLowerCase().includes('data') ? 'Data Analysis' : 
                     'Communication Skills';
    
    const existingSkill = user.skills.find(skill => skill.name === skillName);
    
    if (existingSkill) {
      existingSkill.level = Math.round((existingSkill.level + score) / 2);
    } else {
      user.skills.push({ name: skillName, level: score });
    }

    await user.save();

    res.status(201).json({ message: 'Interview results saved', interviewHistory: user.interviewHistory, skills: user.skills });
  } catch (error) {
    console.error('Error in saveInterviewResults:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// @desc    Update course progress
// @route   PUT /api/users/course-progress
// @access  Private
const updateCourseProgress = async (req, res) => {
  try {
    const { courseId, progress } = req.body;

    if (!courseId || progress === undefined) {
      return res.status(400).json({ message: 'Course ID and progress are required' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the course
    const course = user.enrolledCourses.find(c => c.courseId === courseId);

    if (!course) {
      return res.status(400).json({ message: 'User not enrolled in this course' });
    }

    // Update progress
    course.progress = progress;
    course.lastAccessed = new Date();

    await user.save();

    res.status(200).json({ message: 'Progress updated', enrolledCourses: user.enrolledCourses });
  } catch (error) {
    console.error('Error in updateCourseProgress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile,
  enrollCourse,
  updateCourseProgress,
  saveInterviewResults
};
