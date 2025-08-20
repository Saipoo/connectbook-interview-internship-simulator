import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, CheckCircle, ArrowRight, Briefcase, BarChart } from 'lucide-react';

// Mock data for user's progress
const userProgress = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  enrolledCourses: [
    {
      id: 'web-dev',
      title: 'Web Development',
      progress: 75,
      lastAccessed: '2025-03-15T14:30:00Z',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80',
    },
    {
      id: 'data-science',
      title: 'Data Science',
      progress: 40,
      lastAccessed: '2025-03-14T10:15:00Z',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    }
  ],
  completedCourses: [
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      completedDate: '2025-02-28T09:00:00Z',
      certificateId: 'CB-123456',
      image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    }
  ],
  interviewHistory: [
    {
      id: 'int-001',
      role: 'Software Engineering',
      date: '2025-03-10T15:00:00Z',
      score: 85,
      feedback: 'Excellent technical knowledge. Could improve on communication clarity.'
    },
    {
      id: 'int-002',
      role: 'Data Science',
      date: '2025-03-05T11:30:00Z',
      score: 72,
      feedback: 'Good understanding of concepts. Need to work on providing more specific examples.'
    },
    {
      id: 'int-003',
      role: 'Product Management',
      date: '2025-02-20T14:00:00Z',
      score: 68,
      feedback: 'Demonstrated good product thinking. Could improve on prioritization frameworks.'
    }
  ],
  skills: [
    { name: 'HTML/CSS', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 75 },
    { name: 'Python', level: 60 },
    { name: 'Data Analysis', level: 50 },
    { name: 'Content Marketing', level: 95 }
  ]
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Format date to readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate time since last access
  const getTimeSince = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center">
          <img 
            src={userProgress.profileImage} 
            alt={userProgress.name} 
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userProgress.name}'s Dashboard</h1>
            <p className="text-gray-600">{userProgress.email}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/mock-interview" 
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
          >
            Start New Interview
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'overview' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('internships')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'internships' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Internships
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'interviews' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Interview History
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'certificates' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Certificates
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'skills' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Skills
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-8 w-8 text-indigo-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Internships</h3>
                      <p className="text-2xl font-bold text-indigo-600">{userProgress.enrolledCourses.length + userProgress.completedCourses.length}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{userProgress.enrolledCourses.length} In Progress</span>
                    <span className="text-gray-600">{userProgress.completedCourses.length} Completed</span>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Award className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Certificates</h3>
                      <p className="text-2xl font-bold text-green-600">{userProgress.completedCourses.length}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {userProgress.completedCourses.length > 0 
                      ? `Last earned: ${formatDate(userProgress.completedCourses[0].completedDate)}`
                      : 'No certificates earned yet'}
                  </div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <BarChart className="h-8 w-8 text-purple-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Interviews</h3>
                      <p className="text-2xl font-bold text-purple-600">{userProgress.interviewHistory.length}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {userProgress.interviewHistory.length > 0 
                      ? `Average Score: ${Math.round(userProgress.interviewHistory.reduce((sum, interview) => sum + interview.score, 0) / userProgress.interviewHistory.length)}%`
                      : 'No interviews completed yet'}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h3>
              
              {userProgress.enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {userProgress.enrolledCourses.map(course => (
                    <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden flex">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-24 h-24 object-cover"
                      />
                      <div className="p-4 flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress: {course.progress}%</span>
                          <span className="text-gray-500">{getTimeSince(course.lastAccessed)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <Link 
                          to={`/internship-simulator`} 
                          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                        >
                          Continue
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center mb-8">
                  <p className="text-gray-600 mb-4">You haven't enrolled in any internships yet.</p>
                  <Link 
                    to="/internship-simulator" 
                    className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                  >
                    Explore Internships
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Interviews</h3>
              
              {userProgress.interviewHistory.length > 0 ? (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userProgress.interviewHistory.slice(0, 3).map(interview => (
                        <tr key={interview.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{interview.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(interview.date)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              interview.score >= 80 ? 'bg-green-100 text-green-800' :
                              interview.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {interview.score}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{interview.feedback}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-gray-600 mb-4">You haven't completed any mock interviews yet.</p>
                  <Link 
                    to="/mock-interview" 
                    className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                  >
                    Try a Mock Interview
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'internships' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">My Internships</h3>
              
              {userProgress.enrolledCourses.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-4">In Progress</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {userProgress.enrolledCourses.map(course => (
                      <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="relative">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <h4 className="font-semibold text-white">{course.title}</h4>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress: {course.progress}%</span>
                            <span className="text-gray-500">Last accessed: {getTimeSince(course.lastAccessed)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <Link 
                            to={`/internship-simulator`} 
                            className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition"
                          >
                            Continue Internship
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {userProgress.completedCourses.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-4">Completed</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userProgress.completedCourses.map(course => (
                      <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="relative">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <h4 className="font-semibold text-white">{course.title}</h4>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-600 mb-4">
                            Completed on: {formatDate(course.completedDate)}
                          </p>
                          <div className="flex space-x-3">
                            <Link 
                              to={`/certificate/${course.id}`} 
                              className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition flex items-center justify-center"
                            >
                              <Award className="h-4 w-4 mr-2" />
                              View Certificate
                            </Link>
                            <Link 
                              to={`/internship-simulator`} 
                              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition"
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {userProgress.enrolledCourses.length === 0 && userProgress.completedCourses.length === 0 && (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Internships Yet</h4>
                  <p className="text-gray-600 mb-6">
                    You haven't enrolled in any internship programs yet. Explore our available internships to get started.
                  </p>
                  <Link 
                    to="/internship-simulator" 
                    className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition"
                  >
                    Explore Internships
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'interviews' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Interview History</h3>
              
              {userProgress.interviewHistory.length > 0 ? (
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Interview Performance</h4>
                      <p className="text-sm text-gray-600">
                        Average Score: {Math.round(userProgress.interviewHistory.reduce((sum, interview) => sum + interview.score, 0) / userProgress.interviewHistory.length)}%
                      </p>
                    </div>
                    <Link 
                      to="/mock-interview" 
                      className="mt-4 md:mt-0 inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                    >
                      Start New Interview
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                  
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userProgress.interviewHistory.map(interview => (
                          <tr key={interview.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{interview.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(interview.date)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                interview.score >= 80 ? 'bg-green-100 text-green-800' :
                                interview.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {interview.score}%
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{interview.feedback}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Interview History</h4>
                  <p className="text-gray-600 mb-6">
                    You haven't completed any mock interviews yet. Try a mock interview to practice your skills.
                  </p>
                  <Link 
                    to="/mock-interview" 
                    className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition"
                  >
                    Try a Mock Interview
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">My Certificates</h3>
              
              {userProgress.completedCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userProgress.completedCourses.map(course => (
                    <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center mb-4">
                          <Award className="h-8 w-8 text-yellow-500 mr-3" />
                          <h4 className="font-semibold text-gray-900">{course.title} Certificate</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          Certificate ID: {course.certificateId}
                        </p>
                        <p className="text-sm text-gray-600">
                          Issued on: {formatDate(course.completedDate)}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 flex justify-between">
                        <Link 
                          to={`/certificate/${course.id}`} 
                          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                        >
                          View Certificate
                        </Link>
                        <button 
                          className="text-gray-600 hover:text-gray-800 font-medium text-sm"
                          onClick={() => {
                            // In a real app, this would download the certificate
                            alert('Download functionality would be implemented here');
                          }}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Certificates Yet</h4>
                  <p className="text-gray-600 mb-6">
                    Complete an internship program to earn your first certificate.
                  </p>
                  <Link 
                    to="/internship-simulator" 
                    className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition"
                  >
                    Explore Internships
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">My Skills</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userProgress.skills.map((skill, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            skill.level >= 80 ? 'bg-green-500' :
                            skill.level >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Improve Your Skills</h4>
                <p className="text-gray-700 mb-4">
                  Continue learning and practicing to enhance your skills. Complete internships and mock interviews to develop new abilities and strengthen existing ones.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/internship-simulator" 
                    className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition"
                  >
                    Explore Internships
                  </Link>
                  <Link 
                    to="/mock-interview" 
                    className="flex-1 text-center bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 px-4 rounded-md transition"
                  >
                    Practice Interviews
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;