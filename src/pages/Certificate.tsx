import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import Confetti from 'react-confetti';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Mock data for internship courses
const internshipCourses = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Learn to build responsive websites and web applications using modern frameworks and tools.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Responsive Design'],
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Analyze data, create visualizations, and build predictive models for business insights.',
    skills: ['Python', 'Data Analysis', 'Machine Learning', 'Data Visualization', 'Statistical Analysis'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Create marketing campaigns, optimize SEO, and manage social media strategies.',
    skills: ['SEO', 'Content Marketing', 'Social Media', 'Email Marketing', 'Analytics'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Design user interfaces and experiences that are intuitive, accessible, and visually appealing.',
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
  },
  {
    id: 'product-management',
    title: 'Product Management',
    description: 'Learn to define, develop, and launch successful digital products.',
    skills: ['Product Strategy', 'User Research', 'Roadmapping', 'Agile Methodologies', 'Data Analysis'],
  }
];

const Certificate = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // Find the course based on the courseId
    const foundCourse = internshipCourses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    }

    // Update window dimensions for confetti
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [courseId]);

  const downloadAsPDF = () => {
    const certificateElement = document.getElementById('certificate');
    
    if (certificateElement) {
      html2canvas(certificateElement, {
        scale: 2,
        logging: false,
        useCORS: true
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });
        
        const imgWidth = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${course.title}_Certificate.pdf`);
      });
    }
  };

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-xl text-gray-600">Certificate not found. Please check the course ID.</p>
        <Link to="/internship-simulator" className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Internship Simulator
        </Link>
      </div>
    );
  }

  // Generate a random certificate number
  const certificateNumber = `CB-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Current date formatted
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      <div className="mb-8">
        <Link to="/internship-simulator" className="flex items-center text-indigo-600 hover:text-indigo-800">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Internship Simulator
        </Link>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h1>
        <p className="text-xl text-gray-600">
          You've successfully completed the {course.title} internship program.
        </p>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4">
          <button
            onClick={downloadAsPDF}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Certificate
          </button>
          <button
            onClick={() => {
              // In a real app, this would open a share dialog
              alert('Share functionality would be implemented here');
            }}
            className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </button>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div 
          id="certificate" 
          className="bg-white border-8 border-indigo-100 rounded-lg p-8 w-full max-w-4xl shadow-lg"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-800 mb-1">Certificate of Completion</h2>
            <div className="h-1 w-40 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg">This is to certify that</p>
            <h3 className="text-2xl font-bold text-gray-900 my-2">John Doe</h3>
            <p className="text-gray-600 text-lg">has successfully completed the</p>
            <h3 className="text-2xl font-bold text-indigo-700 my-2">{course.title} Internship Program</h3>
            <p className="text-gray-600 text-lg">demonstrating proficiency in the following skills:</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {course.skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="text-center">
              <div className="h-px w-full bg-gray-300 mb-2"></div>
              <p className="text-gray-800 font-medium">Jane Smith</p>
              <p className="text-gray-600 text-sm">Program Director</p>
            </div>
            <div className="text-center">
              <div className="h-px w-full bg-gray-300 mb-2"></div>
              <p className="text-gray-800 font-medium">{currentDate}</p>
              <p className="text-gray-600 text-sm">Date of Completion</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 text-sm">Certificate ID: {certificateNumber}</p>
            <p className="text-gray-500 text-sm">Verify this certificate at connectbook.com/verify</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;