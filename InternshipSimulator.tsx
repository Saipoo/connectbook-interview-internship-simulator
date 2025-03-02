import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, Calendar, Award, ArrowRight, ArrowLeft, Briefcase } from 'lucide-react';

// Mock data for internship courses
const internshipCourses = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Learn to build responsive websites and web applications using modern frameworks and tools.',
    duration: '4 Weeks',
    projects: 5,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Responsive Design'],
    modules: [
      {
        title: 'Fundamentals of Web Development',
        lessons: [
          { title: 'HTML5 Structure and Semantics', completed: false },
          { title: 'CSS3 Styling and Layouts', completed: false },
          { title: 'JavaScript Basics', completed: false },
          { title: 'Responsive Design Principles', completed: false }
        ]
      },
      {
        title: 'Frontend Development with React',
        lessons: [
          { title: 'React Components and Props', completed: false },
          { title: 'State Management', completed: false },
          { title: 'Hooks and Context API', completed: false },
          { title: 'Routing and Navigation', completed: false }
        ]
      },
      {
        title: 'Backend Development with Node.js',
        lessons: [
          { title: 'Node.js Fundamentals', completed: false },
          { title: 'Express.js Framework', completed: false },
          { title: 'RESTful API Design', completed: false },
          { title: 'Database Integration', completed: false }
        ]
      },
      {
        title: 'Full Stack Integration',
        lessons: [
          { title: 'Connecting Frontend and Backend', completed: false },
          { title: 'Authentication and Authorization', completed: false },
          { title: 'Deployment Strategies', completed: false },
          { title: 'Performance Optimization', completed: false }
        ]
      }
    ],
    projects: [
      {
        title: 'Personal Portfolio Website',
        description: 'Create a responsive portfolio website to showcase your skills and projects.',
        completed: false
      },
      {
        title: 'E-commerce Product Page',
        description: 'Build a product listing page with filtering and sorting functionality.',
        completed: false
      },
      {
        title: 'Task Management Application',
        description: 'Develop a full-stack task manager with CRUD operations.',
        completed: false
      },
      {
        title: 'Real-time Chat Application',
        description: 'Create a chat application with real-time messaging capabilities.',
        completed: false
      },
      {
        title: 'Final Project: Social Media Dashboard',
        description: 'Build a comprehensive social media dashboard with analytics and content management.',
        completed: false
      }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Analyze data, create visualizations, and build predictive models for business insights.',
    duration: '4 Weeks',
    projects: 4,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    skills: ['Python', 'Data Analysis', 'Machine Learning', 'Data Visualization', 'Statistical Analysis'],
    modules: [
      {
        title: 'Introduction to Data Science',
        lessons: [
          { title: 'Data Science Workflow', completed: false },
          { title: 'Python for Data Science', completed: false },
          { title: 'Data Collection and Cleaning', completed: false },
          { title: 'Exploratory Data Analysis', completed: false }
        ]
      },
      {
        title: 'Data Analysis and Visualization',
        lessons: [
          { title: 'Statistical Analysis Fundamentals', completed: false },
          { title: 'Data Visualization Techniques', completed: false },
          { title: 'Dashboard Creation', completed: false },
          { title: 'Storytelling with Data', completed: false }
        ]
      },
      {
        title: 'Machine Learning Fundamentals',
        lessons: [
          { title: 'Supervised Learning', completed: false },
          { title: 'Unsupervised Learning', completed: false },
          { title: 'Model Evaluation', completed: false },
          { title: 'Feature Engineering', completed: false }
        ]
      },
      {
        title: 'Applied Data Science',
        lessons: [
          { title: 'Time Series Analysis', completed: false },
          { title: 'Natural Language Processing', completed: false },
          { title: 'Recommendation Systems', completed: false },
          { title: 'Deployment of ML Models', completed: false }
        ]
      }
    ],
    projects: [
      {
        title: 'Exploratory Data Analysis Project',
        description: 'Analyze a real-world dataset and create visualizations to communicate insights.',
        completed: false
      },
      {
        title: 'Predictive Modeling Challenge',
        description: 'Build and evaluate machine learning models to predict outcomes from a dataset.',
        completed: false
      },
      {
        title: 'Natural Language Processing Application',
        description: 'Develop a text analysis tool for sentiment analysis or text classification.',
        completed: false
      },
      {
        title: 'Final Project: Business Intelligence Dashboard',
        description: 'Create a comprehensive dashboard with actionable insights for a business case.',
        completed: false
      }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Create marketing campaigns, optimize SEO, and manage social media strategies.',
    duration: '4 Weeks',
    projects: 6,
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    skills: ['SEO', 'Content Marketing', 'Social Media', 'Email Marketing', 'Analytics'],
    modules: [
      {
        title: 'Digital Marketing Fundamentals',
        lessons: [
          { title: 'Introduction to Digital Marketing', completed: false },
          { title: 'Building a Marketing Strategy', completed: false },
          { title: 'Target Audience Analysis', completed: false },
          { title: 'Digital Marketing Channels', completed: false }
        ]
      },
      {
        title: 'Content and SEO',
        lessons: [
          { title: 'Content Marketing Strategies', completed: false },
          { title: 'SEO Fundamentals', completed: false },
          { title: 'Keyword Research', completed: false },
          { title: 'On-page and Off-page SEO', completed: false }
        ]
      },
      {
        title: 'Social Media and Email Marketing',
        lessons: [
          { title: 'Social Media Strategy', completed: false },
          { title: 'Content Creation for Social Media', completed: false },
          { title: 'Email Marketing Campaigns', completed: false },
          { title: 'Automation and Personalization', completed: false }
        ]
      },
      {
        title: 'Analytics and Optimization',
        lessons: [
          { title: 'Marketing Analytics Tools', completed: false },
          { title: 'KPI Tracking and Reporting', completed: false },
          { title: 'A/B Testing', completed: false },
          { title: 'Campaign Optimization', completed: false }
        ]
      }
    ],
    projects: [
      {
        title: 'Digital Marketing Strategy',
        description: 'Develop a comprehensive digital marketing strategy for a business.',
        completed: false
      },
      {
        title: 'SEO Audit and Optimization',
        description: 'Conduct an SEO audit and implement optimization recommendations.',
        completed: false
      },
      {
        title: 'Content Marketing Campaign',
        description: 'Create and execute a content marketing campaign across multiple channels.',
        completed: false
      },
      {
        title: 'Social Media Management',
        description: 'Develop and implement a social media content calendar and engagement strategy.',
        completed: false
      },
      {
        title: 'Email Marketing Sequence',
        description: 'Design an automated email marketing sequence for lead nurturing.',
        completed: false
      },
      {
        title: 'Final Project: Integrated Marketing Campaign',
        description: 'Plan and execute an integrated marketing campaign with performance analysis.',
        completed: false
      }
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Design user interfaces and experiences that are intuitive, accessible, and visually appealing.',
    duration: '4 Weeks',
    projects: 5,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
    modules: [
      {
        title: 'UX Fundamentals',
        lessons: [
          { title: 'Introduction to UX Design', completed: false },
          { title: 'User Research Methods', completed: false },
          { title: 'User Personas and Journey Maps', completed: false },
          { title: 'Information Architecture', completed: false }
        ]
      },
      {
        title: 'UI Design Principles',
        lessons: [
          { title: 'Visual Design Fundamentals', completed: false },
          { title: 'Color Theory and Typography', completed: false },
          { title: 'Design Systems', completed: false },
          { title: 'Responsive Design', completed: false }
        ]
      },
      {
        title: 'Wireframing and Prototyping',
        lessons: [
          { title: 'Sketching and Wireframing', completed: false },
          { title: 'Interactive Prototyping', completed: false },
          { title: 'User Flows', completed: false },
          { title: 'Design Tools Mastery', completed: false }
        ]
      },
      {
        title: 'Testing and Iteration',
        lessons: [
          { title: 'Usability Testing Methods', completed: false },
          { title: 'Analyzing User Feedback', completed: false },
          { title: 'Iterative Design Process', completed: false },
          { title: 'Accessibility in Design', completed: false }
        ]
      }
    ],
    projects: [
      {
        title: 'User Research Project',
        description: 'Conduct user research and create personas for a digital product.',
        completed: false
      },
      {
        title: 'Information Architecture and Wireframing',
        description: 'Create the information architecture and wireframes for a web application.',
        completed: false
      },
      {
        title: 'Interactive Prototype',
        description: 'Design and build an interactive prototype for a mobile application.',
        completed: false
      },
      {
        title: 'Design System',
        description: 'Develop a comprehensive design system with components and guidelines.',
        completed: false
      },
      {
        title: 'Final Project: End-to-End UX/UI Design',
        description: 'Complete an end-to-end design project from research to high-fidelity prototype.',
        completed: false
      }
    ]
  },
  {
    id: 'product-management',
    title: 'Product Management',
    description: 'Learn to define, develop, and launch successful digital products.',
    duration: '4 Weeks',
    projects: 5,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    skills: ['Product Strategy', 'User Research', 'Roadmapping', 'Agile Methodologies', 'Data Analysis'],
    modules: [
      {
        title: 'Product Management Fundamentals',
        lessons: [
          { title: 'Introduction to Product Management', completed: false },
          { title: 'Product Lifecycle', completed: false },
          { title: 'Product Strategy', completed: false },
          { title: 'Market Analysis', completed: false }
        ]
      },
      {
        title: 'User-Centered Product Development',
        lessons: [
          { title: 'User Research for Product Managers', completed: false },
          { title: 'Problem Definition', completed: false },
          { title: 'Feature Prioritization', completed: false },
          { title: 'Product Requirements Documents', completed: false }
        ]
      },
      {
        title: 'Agile Product Management',
        lessons: [
          { title: 'Agile Methodologies', completed: false },
          { title: 'Sprint Planning', completed: false },
          { title: 'Backlog Management', completed: false },
          { title: 'Working with Development Teams', completed: false }
        ]
      },
      {
        title: 'Product Analytics and Growth',
        lessons: [
          { title: 'Product Metrics and KPIs', completed: false },
          { title: 'Data-Driven Decision Making', completed: false },
          { title: 'Growth Strategies', completed: false },
          { title: 'Product Launch Planning', completed: false }
        ]
      }
    ],
    projects: [
      {
        title: 'Market Analysis and Opportunity Assessment',
        description: 'Conduct market research and identify product opportunities.',
        completed: false
      },
      {
        title: 'Product Roadmap Development',
        description: 'Create a strategic product roadmap with prioritized features.',
        completed: false
      },
      {
        title: 'User Story Mapping',
        description: 'Develop user stories and acceptance criteria for a product feature.',
        completed: false
      },
      {
        title: 'Product Analytics Dashboard',
        description: 'Design a product analytics dashboard to track key metrics.',
        completed: false
      },
      {
        title: 'Final Project: Product Launch Strategy',
        description: 'Create a comprehensive product launch strategy and go-to-market plan.',
        completed: false
      }
    ]
  }
];

const InternshipSimulator = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [progress, setProgress] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleEnroll = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
    setSelectedCourse(courseId);
    setActiveTab('curriculum');
  };

  const handleCompleteLesson = (moduleIndex, lessonIndex) => {
    const course = internshipCourses.find(c => c.id === selectedCourse);
    if (!course) return;

    // Create a deep copy of the course
    const updatedCourse = JSON.parse(JSON.stringify(course));
    updatedCourse.modules[moduleIndex].lessons[lessonIndex].completed = true;

    // Calculate new progress
    const totalLessons = updatedCourse.modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedLessons = updatedCourse.modules.reduce((total, module) => {
      return total + module.lessons.filter(lesson => lesson.completed).length;
    }, 0);

    const newProgress = Math.round((completedLessons / totalLessons) * 100);
    setProgress(newProgress);

    // Update the course in the internshipCourses array
    const courseIndex = internshipCourses.findIndex(c => c.id === selectedCourse);
    if (courseIndex !== -1) {
      internshipCourses[courseIndex] = updatedCourse;
    }
  };

  const handleCompleteProject = (projectIndex) => {
    const course = internshipCourses.find(c => c.id === selectedCourse);
    if (!course) return;

    // Create a deep copy of the course
    const updatedCourse = JSON.parse(JSON.stringify(course));
    updatedCourse.projects[projectIndex].completed = true;

    // Update the course in the internshipCourses array
    const courseIndex = internshipCourses.findIndex(c => c.id === selectedCourse);
    if (courseIndex !== -1) {
      internshipCourses[courseIndex] = updatedCourse;
    }
  };

  const getCourseProgress = (courseId) => {
    const course = internshipCourses.find(c => c.id === courseId);
    if (!course) return 0;

    const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedLessons = course.modules.reduce((total, module) => {
      return total + module.lessons.filter(lesson => lesson.completed).length;
    }, 0);

    return Math.round((completedLessons / totalLessons) * 100);
  };

  const isCourseCertificateAvailable = (courseId) => {
    return getCourseProgress(courseId) === 100;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!selectedCourse ? (
        <div>
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Internship Simulator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gain practical experience through our industry-focused internship simulations with real-world projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internshipCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                    <span className="mx-2">•</span>
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{course.projects.length} Projects</span>
                  </div>

                  {enrolledCourses.includes(course.id) && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{getCourseProgress(course.id)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${getCourseProgress(course.id)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedCourse(course.id)}
                      className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition"
                    >
                      {enrolledCourses.includes(course.id) ? 'Continue' : 'View Details'}
                    </button>
                    
                    {isCourseCertificateAvailable(course.id) && (
                      <Link 
                        to={`/certificate/${course.id}`}
                        className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
                      >
                        <Award className="h-4 w-4 mr-1" />
                        Certificate
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Course Details */}
          <div className="mb-8">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to All Internships
            </button>

            {internshipCourses.filter(course => course.id === selectedCourse).map((course) => (
              <div key={course.id}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title} Internship</h1>
                    <p className="text-xl text-gray-600">{course.description}</p>
                  </div>
                  
                  {enrolledCourses.includes(course.id) ? (
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                      <div className="flex items-center mb-2">
                        <span className="text-gray-700 mr-2">Progress:</span>
                        <span className="font-bold">{progress}%</span>
                      </div>
                      <div className="w-full md:w-64 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md transition"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`px-6 py-3 text-sm font-medium ${
                        activeTab === 'overview' 
                          ? 'border-b-2 border-indigo-600 text-indigo-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('curriculum')}
                      className={`px-6 py-3 text-sm font-medium ${
                        activeTab === 'curriculum' 
                          ? 'border-b-2 border-indigo-600 text-indigo-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Curriculum
                    </button>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className={`px-6 py-3 text-sm font-medium ${
                        activeTab === 'projects' 
                          ? 'border-b-2 border-indigo-600 text-indigo-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Projects
                    </button>
                  </div>

                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                              <h3 className="font-semibold text-gray-900">Duration</h3>
                            </div>
                            <p className="text-gray-700">{course.duration}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Briefcase className="h-5 w-5 text-indigo-600 mr-2" />
                              <h3 className="font-semibold text-gray-900">Projects</h3>
                            </div>
                            <p className="text-gray-700">{course.projects.length} Hands-on Projects</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Award className="h-5 w-5 text-indigo-600 mr-2" />
                              <h3 className="font-semibold text-gray-900">Certificate</h3>
                            </div>
                            <p className="text-gray-700">Awarded upon completion</p>
                          </div>
                        </div>

                        <div className="mb-8">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {course.skills.map((skill, index) => (
                              <div key={index} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Description</h3>
                          <div className="prose max-w-none text-gray-700">
                            <p className="mb-4">
                              This 4-week internship simulation provides hands-on experience in {course.title.toLowerCase()}. 
                              You'll work on real-world projects, learn industry-standard tools and methodologies, and 
                              develop a portfolio of work that demonstrates your skills to potential employers.
                            </p>
                            <p className="mb-4">
                              The program is designed to simulate a real work environment, with structured modules, 
                              practical assignments, and project deliverables. You'll receive guidance and resources 
                              throughout the internship to help you succeed.
                            </p>
                            <p>
                              Upon completion, you'll receive a certificate that you can add to your resume and LinkedIn profile, 
                              showcasing your practical experience and skills to potential employers.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'curriculum' && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Course Curriculum</h3>
                        
                        <div className="space-y-6">
                          {course.modules.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                              <div className="bg-gray-50 px-6 py-4">
                                <h4 className="font-semibold text-gray-900">Module {moduleIndex + 1}: {module.title}</h4>
                              </div>
                              <div className="divide-y divide-gray-200">
                                {module.lessons.map((lesson, lessonIndex) => (
                                  <div key={lessonIndex} className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                      {lesson.completed ? (
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                      ) : (
                                        <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-3"></div>
                                      )}
                                      <span className={`${lesson.completed ? 'text-gray-500' : 'text-gray-900'}`}>
                                        {lesson.title}
                                      </span>
                                    </div>
                                    {enrolledCourses.includes(course.id) && !lesson.completed && (
                                      <button
                                        onClick={() => handleCompleteLesson(moduleIndex, lessonIndex)}
                                        className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md hover:bg-indigo-200 transition"
                                      >
                                        Mark Complete
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'projects' && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Internship Projects</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {course.projects.map((project, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-6">
                              <div className="flex items-start mb-4">
                                {project.completed ? (
                                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                ) : (
                                  <div className="h-6 w-6 border-2 border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                                )}
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
                                  <p className="text-gray-600">{project.description}</p>
                                </div>
                              </div>
                              
                              {enrolledCourses.includes(course.id) && !project.completed && (
                                <button
                                  onClick={() => handleCompleteProject(index)}
                                  className="mt-2 text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md hover:bg-indigo-200 transition"
                                >
                                  Mark Complete
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipSimulator;