import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, BookOpen, Briefcase, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Prepare for Your Dream Career</h1>
              <p className="text-xl mb-8">
                Master interview skills and gain practical experience with our mock interviews and internship simulations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/mock-interview" className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium flex items-center justify-center">
                  Try Mock Interview
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/internship-simulator" className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-700 px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors">
                  Explore Internships
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Student preparing for interview" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose ConnectBook?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the tools and resources you need to succeed in your career journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-indigo-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Realistic Mock Interviews</h3>
              <p className="text-gray-600">
                Practice with industry-specific questions and receive detailed feedback to improve your interview skills.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-indigo-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Internship Simulations</h3>
              <p className="text-gray-600">
                Gain practical experience through our 5 industry-focused internship simulations with real-world projects.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-indigo-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Certificates</h3>
              <p className="text-gray-600">
                Earn certificates upon completion of internships to showcase your skills to potential employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internship Courses Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Internship Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from 5 different internship simulations designed to build your skills and confidence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80" 
                alt="Web Development" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Web Development</h3>
                <p className="text-gray-600 mb-4">
                  Build responsive websites and web applications using modern frameworks and tools.
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>4 Weeks</span>
                  <span className="mx-2">•</span>
                  <span>5 Projects</span>
                </div>
                <Link to="/internship-simulator" className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition">
                  Start Internship
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Data Science" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Data Science</h3>
                <p className="text-gray-600 mb-4">
                  Analyze data, create visualizations, and build predictive models for business insights.
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>4 Weeks</span>
                  <span className="mx-2">•</span>
                  <span>4 Projects</span>
                </div>
                <Link to="/internship-simulator" className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition">
                  Start Internship
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img 
                src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Digital Marketing" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Marketing</h3>
                <p className="text-gray-600 mb-4">
                  Create marketing campaigns, optimize SEO, and manage social media strategies.
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>4 Weeks</span>
                  <span className="mx-2">•</span>
                  <span>6 Projects</span>
                </div>
                <Link to="/internship-simulator" className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition">
                  Start Internship
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/internship-simulator" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
              View All Internship Programs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who transformed their careers with ConnectBook.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Software Engineer at TechCorp</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The mock interviews helped me identify my weaknesses and improve my communication skills. I landed my dream job after just 2 months of practice!"
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
                  alt="Michael Chen" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">Data Analyst at FinanceHub</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The Data Science internship simulation gave me practical experience that I could showcase in my portfolio. This was crucial in landing my first job."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
                  alt="Priya Patel" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Priya Patel</h4>
                  <p className="text-gray-600 text-sm">Marketing Specialist at BrandGrow</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The detailed feedback from mock interviews helped me understand exactly what employers are looking for. I'm now confidently leading marketing campaigns!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Kickstart Your Career?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of students who have transformed their career prospects with ConnectBook.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium">
                Sign Up for Free
              </Link>
              <Link to="/mock-interview" className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-700 px-8 py-3 rounded-md font-medium transition-colors">
                Try a Mock Interview
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;