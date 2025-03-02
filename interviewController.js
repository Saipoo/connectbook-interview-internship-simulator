import InterviewRole from '../models/interviewModel.js';

// @desc    Get all interview roles
// @route   GET /api/interviews/roles
// @access  Public
const getInterviewRoles = async (req, res) => {
  try {
    const roles = await InterviewRole.find({});
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get interview questions by role
// @route   GET /api/interviews/questions/:roleId
// @access  Public
const getInterviewQuestions = async (req, res) => {
  try {
    const role = await InterviewRole.findOne({ id: req.params.roleId });

    if (role) {
      res.json(role.questions);
    } else {
      res.status(404).json({ message: 'Interview role not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Seed interview data (admin only)
// @route   POST /api/interviews/seed
// @access  Public (should be restricted in production)
const seedInterviewData = async (req, res) => {
  try {
    // Sample interview roles and questions
    const interviewRoles = [
      {
        id: 'software-engineering',
        name: 'Software Engineering',
        icon: '💻',
        description: 'Practice software engineering interview questions and receive feedback.',
        questions: [
          {
            question: "Tell me about yourself and your experience with programming.",
            expectedPoints: [
              "Brief introduction with relevant educational background",
              "Mention programming languages and technologies you're familiar with",
              "Highlight any relevant projects or work experience",
              "Express enthusiasm for software development"
            ]
          },
          {
            question: "What is the difference between a stack and a queue?",
            expectedPoints: [
              "Stack follows LIFO (Last In First Out) principle",
              "Queue follows FIFO (First In First Out) principle",
              "Stack operations: push and pop",
              "Queue operations: enqueue and dequeue",
              "Examples of real-world applications for each"
            ]
          },
          {
            question: "Explain how you would approach debugging a complex issue in your code.",
            expectedPoints: [
              "Reproduce the issue consistently",
              "Isolate the problem area",
              "Use debugging tools/console logs",
              "Check recent code changes",
              "Break down the problem into smaller parts",
              "Test hypotheses systematically"
            ]
          }
        ]
      },
      {
        id: 'data-science',
        name: 'Data Science',
        icon: '📊',
        description: 'Practice data science interview questions and receive feedback.',
        questions: [
          {
            question: "Explain the difference between supervised and unsupervised learning.",
            expectedPoints: [
              "Supervised learning uses labeled data",
              "Unsupervised learning uses unlabeled data",
              "Examples of supervised algorithms (regression, classification)",
              "Examples of unsupervised algorithms (clustering, dimensionality reduction)",
              "When to use each approach"
            ]
          },
          {
            question: "How would you handle missing data in a dataset?",
            expectedPoints: [
              "Identify the extent and pattern of missing data",
              "Determine if data is missing at random",
              "Consider deletion methods (listwise, pairwise)",
              "Consider imputation methods (mean/median/mode, regression, KNN)",
              "Evaluate the impact of the chosen method on analysis"
            ]
          },
          {
            question: "Explain overfitting and how to prevent it.",
            expectedPoints: [
              "Definition of overfitting",
              "Signs of overfitting in models",
              "Cross-validation techniques",
              "Regularization methods (L1, L2)",
              "Early stopping",
              "Ensemble methods",
              "Proper train/test/validation splits"
            ]
          }
        ]
      }
    ];

    // Clear existing data
    await InterviewRole.deleteMany({});

    // Insert new data
    await InterviewRole.insertMany(interviewRoles);

    res.status(201).json({ message: 'Interview data seeded successfully', count: interviewRoles.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { 
  getInterviewRoles, 
  getInterviewQuestions,
  seedInterviewData
};