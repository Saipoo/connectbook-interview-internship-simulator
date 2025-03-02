import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
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
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
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
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        enrolledCourses: user.enrolledCourses,
        completedCourses: user.completedCourses,
        interviewHistory: user.interviewHistory,
        skills: user.skills
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
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
        user.password = req.body.password;
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
    console.error(error);
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
    const alreadyEnrolled = user.enrolledCourses.find(
      course => course.courseId === courseId
    );

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

    res.status(201).json({ 
      message: 'Successfully enrolled',
      enrolledCourses: user.enrolledCourses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update course progress
// @route   PUT /api/users/progress
// @access  Private
const updateCourseProgress = async (req, res) => {
  try {
    const { courseId, moduleIndex, lessonIndex, completed, type } = req.body;
    
    if (!courseId || type === undefined) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the enrolled course
    const courseIndex = user.enrolledCourses.findIndex(
      course => course.courseId === courseId
    );

    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found in enrolled courses' });
    }

    // Update last accessed
    user.enrolledCourses[courseIndex].lastAccessed = new Date();

    if (type === 'lesson' && moduleIndex !== undefined && lessonIndex !== undefined) {
      // Handle lesson completion
      if (completed) {
        // Check if already completed
        const lessonCompleted = user.enrolledCourses[courseIndex].completedLessons.some(
          lesson => lesson.moduleIndex === moduleIndex && lesson.lessonIndex === lessonIndex
        );

        if (!lessonCompleted) {
          user.enrolledCourses[courseIndex].completedLessons.push({
            moduleIndex,
            lessonIndex
          });
        }
      } else {
        // Remove from completed lessons if marked as incomplete
        user.enrolledCourses[courseIndex].completedLessons = user.enrolledCourses[courseIndex].completedLessons.filter(
          lesson => !(lesson.moduleIndex === moduleIndex && lesson.lessonIndex === lessonIndex)
        );
      }
    } else if (type === 'project' && moduleIndex !== undefined) {
      // Handle project completion
      if (completed) {
        if (!user.enrolledCourses[courseIndex].completedProjects.includes(moduleIndex)) {
          user.enrolledCourses[courseIndex].completedProjects.push(moduleIndex);
        }
      } else {
        user.enrolledCourses[courseIndex].completedProjects = user.enrolledCourses[courseIndex].completedProjects.filter(
          projectIndex => projectIndex !== moduleIndex
        );
      }
    }

    // Calculate new progress (simplified calculation)
    // In a real app, you would need to know the total number of lessons and projects
    // This is just a placeholder calculation
    const totalCompleted = user.enrolledCourses[courseIndex].completedLessons.length + 
                          user.enrolledCourses[courseIndex].completedProjects.length;
    
    // Assuming 20 total items (lessons + projects) per course for this example
    const totalItems = 20;
    const progress = Math.min(Math.round((totalCompleted / totalItems) * 100), 100);
    
    user.enrolledCourses[courseIndex].progress = progress;

    await user.save();

    res.json({ 
      message: 'Progress updated',
      progress,
      enrolledCourses: user.enrolledCourses
    });
  } catch (error) {
    console.error(error);
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
    // This is a simplified example
    const skillName = role.toLowerCase().includes('software') ? 'Technical Interview' : 
                     role.toLowerCase().includes('data') ? 'Data Analysis' : 
                     'Communication Skills';
    
    const existingSkill = user.skills.find(skill => skill.name === skillName);
    
    if (existingSkill) {
      // Average with previous skill level
      existingSkill.level = Math.round((existingSkill.level + score) / 2);
    } else {
      user.skills.push({
        name: skillName,
        level: score
      });
    }

    await user.save();

    res.status(201).json({ 
      message: 'Interview results saved',
      interviewHistory: user.interviewHistory,
      skills: user.skills
    });
  } catch (error) {
    console.error(error);
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