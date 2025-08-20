import Internship from '../models/internshipModel.js';
import User from '../models/userModel.js';
import Certificate from '../models/certificateModel.js';

// @desc    Get all internships
// @route   GET /api/internships
// @access  Public
const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find({});
    res.json(internships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get internship by ID
// @route   GET /api/internships/:id
// @access  Public
const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findOne({ id: req.params.id });

    if (internship) {
      res.json(internship);
    } else {
      res.status(404).json({ message: 'Internship not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Complete an internship and generate certificate
// @route   POST /api/internships/complete
// @access  Private
const completeInternship = async (req, res) => {
  try {
    const { courseId } = req.body;
    
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
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

    // Check if progress is 100%
    if (user.enrolledCourses[courseIndex].progress < 100) {
      return res.status(400).json({ 
        message: 'Cannot complete internship. Progress must be 100%',
        currentProgress: user.enrolledCourses[courseIndex].progress
      });
    }

    // Get internship details
    const internship = await Internship.findOne({ id: courseId });

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Generate certificate ID
    const certificateId = `CB-${Math.floor(100000 + Math.random() * 900000)}`;

    // Create certificate
    const certificate = await Certificate.create({
      certificateId,
      userId: user._id,
      courseId,
      courseName: internship.title,
      issueDate: new Date(),
      skills: internship.skills,
      verificationUrl: `https://connectbook.com/verify/${certificateId}`
    });

    // Move from enrolled to completed courses
    const completedCourse = {
      courseId,
      completedDate: new Date(),
      certificateId
    };

    user.completedCourses.push(completedCourse);
    
    // Remove from enrolled courses
    user.enrolledCourses.splice(courseIndex, 1);

    await user.save();

    res.status(201).json({ 
      message: 'Internship completed successfully',
      certificate,
      completedCourses: user.completedCourses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Seed internship data (admin only)
// @route   POST /api/internships/seed
// @access  Public (should be restricted in production)
const seedInternships = async (req, res) => {
  try {
    // Sample internship data
    const internships = [
      {
        id: 'web-dev',
        title: 'Web Development',
        description: 'Learn to build responsive websites and web applications using modern frameworks and tools.',
        duration: '4 Weeks',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80',
        skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Responsive Design'],
        modules: [
          {
            title: 'Fundamentals of Web Development',
            lessons: [
              { 
                title: 'HTML5 Structure and Semantics',
                content: 'Introduction to HTML5 structure and semantic elements.'
              },
              { 
                title: 'CSS3 Styling and Layouts',
                content: 'Learn CSS3 styling techniques and layout methods.'
              }
            ]
          },
          {
            title: 'Frontend Development with React',
            lessons: [
              { 
                title: 'React Components and Props',
                content: 'Understanding React components and props system.'
              },
              { 
                title: 'State Management',
                content: 'Managing state in React applications.'
              }
            ]
          }
        ],
        projects: [
          {
            title: 'Personal Portfolio Website',
            description: 'Create a responsive portfolio website to showcase your skills and projects.',
            requirements: ['HTML5', 'CSS3', 'Responsive Design'],
            resources: ['Sample code', 'Design templates']
          },
          {
            title: 'E-commerce Product Page',
            description: 'Build a product listing page with filtering and sorting functionality.',
            requirements: ['React', 'CSS', 'State Management'],
            resources: ['API documentation', 'UI mockups']
          }
        ]
      },
      {
        id: 'data-science',
        title: 'Data Science',
        description: 'Analyze data, create visualizations, and build predictive models for business insights.',
        duration: '4 Weeks',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        skills: ['Python', 'Data Analysis', 'Machine Learning', 'Data Visualization', 'Statistical Analysis'],
        modules: [
          {
            title: 'Introduction to Data Science',
            lessons: [
              { 
                title: 'Data Science Workflow',
                content: 'Overview of the data science workflow and methodologies.'
              },
              { 
                title: 'Python for Data Science',
                content: 'Introduction to Python libraries for data science.'
              }
            ]
          },
          {
            title: 'Data Analysis and Visualization',
            lessons: [
              { 
                title: 'Statistical Analysis Fundamentals',
                content: 'Learn fundamental statistical concepts for data analysis.'
              },
              { 
                title: 'Data Visualization Techniques',
                content: 'Techniques for effective data visualization.'
              }
            ]
          }
        ],
        projects: [
          {
            title: 'Exploratory Data Analysis Project',
            description: 'Analyze a real-world dataset and create visualizations to communicate insights.',
            requirements: ['Python', 'Pandas', 'Matplotlib/Seaborn'],
            resources: ['Dataset', 'Jupyter notebook template']
          },
          {
            title: 'Predictive Modeling Challenge',
            description: 'Build and evaluate machine learning models to predict outcomes from a dataset.',
            requirements: ['Python', 'Scikit-learn', 'Data preprocessing'],
            resources: ['Training dataset', 'Evaluation metrics']
          }
        ]
      }
    ];

    // Clear existing data
    await Internship.deleteMany({});

    // Insert new data
    await Internship.insertMany(internships);

    res.status(201).json({ message: 'Internship data seeded successfully', count: internships.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { 
  getInternships, 
  getInternshipById, 
  completeInternship,
  seedInternships
};