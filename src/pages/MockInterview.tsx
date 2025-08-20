import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Mic, MicOff, CheckCircle, AlertCircle } from 'lucide-react';

// Mock interview questions for different roles
const interviewQuestions = {
  'software-engineering': [
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
    },
    {
      question: "How do you stay updated with the latest technologies and programming practices?",
      expectedPoints: [
        "Following tech blogs/websites",
        "Participating in online communities",
        "Taking online courses or tutorials",
        "Contributing to open source",
        "Attending meetups or conferences",
        "Building personal projects to experiment with new technologies"
      ]
    },
    {
      question: "Describe a challenging project you worked on and how you overcame obstacles.",
      expectedPoints: [
        "Clear description of the project and its goals",
        "Specific challenges encountered",
        "Problem-solving approach",
        "Actions taken to resolve issues",
        "Results achieved",
        "Lessons learned from the experience"
      ]
    }
  ],
  'data-science': [
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
    },
    {
      question: "Describe a data science project you've worked on and the insights you discovered.",
      expectedPoints: [
        "Clear description of the project goals",
        "Data collection and preparation process",
        "Analysis methods used",
        "Key findings and insights",
        "Business impact or recommendations",
        "Challenges faced and how they were overcome"
      ]
    },
    {
      question: "How do you communicate technical findings to non-technical stakeholders?",
      expectedPoints: [
        "Focus on business impact rather than technical details",
        "Use visualizations to illustrate key points",
        "Avoid jargon and explain concepts in simple terms",
        "Tailor the message to the audience's interests",
        "Provide clear, actionable recommendations",
        "Be prepared to answer questions at different levels of detail"
      ]
    }
  ],
  'marketing': [
    {
      question: "How do you measure the success of a marketing campaign?",
      expectedPoints: [
        "Define clear KPIs aligned with campaign objectives",
        "Track engagement metrics (clicks, views, shares)",
        "Measure conversion rates",
        "Calculate ROI",
        "Analyze customer acquisition cost",
        "Monitor brand awareness metrics",
        "Use A/B testing to compare strategies"
      ]
    },
    {
      question: "Describe your experience with social media marketing.",
      expectedPoints: [
        "Platforms you've worked with",
        "Content creation and curation strategies",
        "Community management approach",
        "Paid social campaigns experience",
        "Analytics and performance tracking",
        "Successful campaigns or growth examples"
      ]
    },
    {
      question: "How do you stay updated with the latest marketing trends?",
      expectedPoints: [
        "Following industry publications and blogs",
        "Participating in marketing communities",
        "Attending webinars and conferences",
        "Taking courses to learn new skills",
        "Experimenting with new platforms and techniques",
        "Networking with other marketing professionals"
      ]
    },
    {
      question: "Explain your approach to content marketing.",
      expectedPoints: [
        "Audience research and persona development",
        "Content strategy aligned with business goals",
        "Content calendar and planning process",
        "Content creation and quality control",
        "Distribution channels and promotion",
        "Performance measurement and optimization"
      ]
    },
    {
      question: "How would you handle a situation where a marketing campaign isn't performing as expected?",
      expectedPoints: [
        "Analyze data to identify underperforming areas",
        "Check if the campaign is reaching the target audience",
        "Review messaging and creative elements",
        "Test alternative approaches",
        "Adjust budget allocation if necessary",
        "Learn from the experience and document insights",
        "Communicate transparently with stakeholders"
      ]
    }
  ],
  'product-management': [
    {
      question: "How do you prioritize features for a product roadmap?",
      expectedPoints: [
        "Align with business goals and strategy",
        "Consider customer needs and feedback",
        "Evaluate technical feasibility and complexity",
        "Assess potential impact and value",
        "Use frameworks like RICE or MoSCoW",
        "Balance short-term wins with long-term vision",
        "Involve key stakeholders in the process"
      ]
    },
    {
      question: "Describe how you would validate a new product idea.",
      expectedPoints: [
        "Conduct market research to identify target audience",
        "Define clear problem statement and value proposition",
        "Create prototypes or MVPs for testing",
        "Gather user feedback through interviews or surveys",
        "Run A/B tests or experiments",
        "Analyze metrics and KPIs",
        "Iterate based on findings"
      ]
    },
    {
      question: "How do you collaborate with engineering teams?",
      expectedPoints: [
        "Clearly communicate product requirements and priorities",
        "Involve engineers early in the planning process",
        "Understand technical constraints and possibilities",
        "Be available to answer questions and provide clarification",
        "Respect engineering estimates and timelines",
        "Facilitate communication between engineering and other teams",
        "Celebrate successes and learn from failures together"
      ]
    },
    {
      question: "Tell me about a time when you had to make a difficult product decision.",
      expectedPoints: [
        "Clearly describe the situation and decision context",
        "Explain the conflicting factors or constraints",
        "Outline the data and information considered",
        "Describe the decision-making process",
        "Explain the final decision and rationale",
        "Share the outcomes and impact",
        "Reflect on lessons learned"
      ]
    },
    {
      question: "How do you measure product success?",
      expectedPoints: [
        "Define clear, measurable objectives and key results (OKRs)",
        "Track user engagement and retention metrics",
        "Monitor business metrics (revenue, growth, etc.)",
        "Analyze customer satisfaction and feedback",
        "Measure feature adoption and usage",
        "Compare performance against competitors",
        "Evaluate long-term strategic impact"
      ]
    }
  ],
  'ux-design': [
    {
      question: "Walk me through your design process.",
      expectedPoints: [
        "Research and discovery phase",
        "Define user personas and journey maps",
        "Ideation and sketching",
        "Wireframing and prototyping",
        "User testing and feedback collection",
        "Iteration based on feedback",
        "Handoff to development and implementation support"
      ]
    },
    {
      question: "How do you advocate for the user when facing business constraints?",
      expectedPoints: [
        "Back arguments with user research and data",
        "Demonstrate how user-centered solutions benefit business goals",
        "Present multiple options with pros and cons",
        "Find compromises that balance user needs and business requirements",
        "Educate stakeholders about UX principles and value",
        "Build relationships with decision-makers",
        "Know when to push back and when to adapt"
      ]
    },
    {
      question: "Describe a challenging UX problem you solved recently.",
      expectedPoints: [
        "Clear description of the problem and its context",
        "Research methods used to understand the issue",
        "Design thinking approach and exploration",
        "Solutions considered and testing process",
        "Final implementation and rationale",
        "Results and impact on users",
        "Lessons learned from the process"
      ]
    },
    {
      question: "How do you ensure your designs are accessible?",
      expectedPoints: [
        "Follow WCAG guidelines and standards",
        "Consider diverse user needs in the design process",
        "Use sufficient color contrast and text size",
        "Provide alternative text for images",
        "Ensure keyboard navigation is possible",
        "Test with assistive technologies",
        "Involve users with disabilities in testing"
      ]
    },
    {
      question: "How do you handle feedback and criticism on your designs?",
      expectedPoints: [
        "Approach feedback with an open mind",
        "Separate personal attachment from professional work",
        "Ask clarifying questions to understand concerns",
        "Evaluate feedback based on user needs and project goals",
        "Prioritize which feedback to incorporate",
        "Communicate decisions and rationale clearly",
        "Use criticism as an opportunity for growth"
      ]
    }
  ]
};

const MockInterview = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [currentStep, setCurrentStep] = useState('select-role'); // 'select-role', 'instructions', 'interview', 'feedback'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [textAnswer, setTextAnswer] = useState('');

  const roles = [
    { id: 'software-engineering', name: 'Software Engineering', icon: '💻' },
    { id: 'data-science', name: 'Data Science', icon: '📊' },
    { id: 'marketing', name: 'Marketing', icon: '📱' },
    { id: 'product-management', name: 'Product Management', icon: '🚀' },
    { id: 'ux-design', name: 'UX Design', icon: '🎨' },
  ];

  const startInterview = () => {
    setCurrentStep('instructions');
  };

  const startRecording = () => {
    setIsRecording(true);
    setTextAnswer(answers[currentQuestionIndex] || '');
    // In a real app, this would activate the microphone
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real app, this would stop recording and process the audio
    
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = textAnswer;
    setAnswers(newAnswers);
    setTextAnswer('');
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < interviewQuestions[selectedRole as keyof typeof interviewQuestions].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Generate feedback for all questions
      generateFeedback();
      setCurrentStep('feedback');
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const generateFeedback = () => {
    // In a real app, this would analyze the answers and provide actual feedback
    // Here we're simulating feedback generation
    const simulatedFeedback = interviewQuestions[selectedRole as keyof typeof interviewQuestions].map((q, index) => {
      const coveredPoints = Math.floor(Math.random() * (q.expectedPoints.length + 1));
      const score = Math.floor((coveredPoints / q.expectedPoints.length) * 100);
      
      return {
        question: q.question,
        answer: answers[index] || "No answer provided",
        score: score,
        coveredPoints: q.expectedPoints.slice(0, coveredPoints),
        missedPoints: q.expectedPoints.slice(coveredPoints),
        improvement: "Focus on providing more specific examples and structuring your answer with a clear beginning, middle, and end."
      };
    });
    
    setFeedback(simulatedFeedback);
    
    // Calculate overall score
    const totalScore = simulatedFeedback.reduce((sum, item) => sum + item.score, 0);
    setOverallScore(Math.floor(totalScore / simulatedFeedback.length));
  };

  const restartInterview = () => {
    setCurrentStep('select-role');
    setSelectedRole('');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFeedback([]);
    setOverallScore(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {currentStep === 'select-role' && (
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mock Interview Simulator</h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Practice your interview skills in a realistic setting. Select a role to begin your mock interview.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-6 rounded-lg border-2 text-left hover:shadow-md transition ${
                  selectedRole === role.id 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="text-4xl mb-3">{role.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{role.name}</h3>
                <p className="text-gray-600 mt-2">
                  Practice {role.name} interview questions and receive feedback.
                </p>
              </button>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button
              onClick={startInterview}
              disabled={!selectedRole}
              className={`px-8 py-3 rounded-md font-medium ${
                selectedRole 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Start Mock Interview
            </button>
          </div>
        </div>
      )}

      {currentStep === 'instructions' && (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Interview Instructions</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How the Mock Interview Works:</h2>
            
            <ol className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                <div>
                  <strong>Answer the Questions:</strong> You'll be presented with 5 common interview questions for your selected role.
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                <div>
                  <strong>Record Your Responses:</strong> Click the microphone button to start recording your answer. In this simulation, we'll provide a text area for you to type your response.
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                <div>
                  <strong>Navigate Questions:</strong> Use the navigation buttons to move between questions. You can revisit questions if needed.
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                <div>
                  <strong>Receive Feedback:</strong> After completing all questions, you'll receive detailed feedback on your performance, including strengths, areas for improvement, and an overall score.
                </div>
              </li>
            </ol>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-800">
                <strong>Tip:</strong> Speak clearly and concisely. Structure your answers using the STAR method (Situation, Task, Action, Result) when appropriate.
              </p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep('select-role')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep('interview')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Begin Interview
            </button>
          </div>
        </div>
      )}

      {currentStep === 'interview' && selectedRole && (
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Mock Interview: {roles.find(r => r.id === selectedRole)?.name}</h1>
            <div className="text-gray-600">
              Question {currentQuestionIndex + 1} of {interviewQuestions[selectedRole as keyof typeof interviewQuestions].length}
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {interviewQuestions[selectedRole as keyof typeof interviewQuestions][currentQuestionIndex].question}
            </h2>
            
            {!isRecording ? (
              <div className="mb-6">
                {answers[currentQuestionIndex] ? (
                  <div>
                    <p className="text-gray-700 mb-4">{answers[currentQuestionIndex]}</p>
                    <button
                      onClick={startRecording}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                    >
                      <Mic className="h-5 w-5 mr-2" />
                      Re-record Answer
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <button
                      onClick={startRecording}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center mx-auto"
                    >
                      <Mic className="h-5 w-5 mr-2" />
                      Start Recording
                    </button>
                    <p className="text-gray-500 mt-4">Click to begin recording your answer</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-red-700">Recording in progress...</span>
                  </div>
                  <button
                    onClick={stopRecording}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                  >
                    <MicOff className="h-4 w-4 mr-1" />
                    Stop
                  </button>
                </div>
                
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-md h-40"
                  placeholder="Type your answer here (in a real implementation, this would be voice recording)"
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                ></textarea>
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-md flex items-center ${
                currentQuestionIndex === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Previous
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={!answers[currentQuestionIndex]}
              className={`px-4 py-2 rounded-md flex items-center ${
                !answers[currentQuestionIndex]
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {currentQuestionIndex === interviewQuestions[selectedRole as keyof typeof interviewQuestions].length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 'feedback' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Interview Feedback</h1>
              <div className="flex items-center">
                <span className="text-lg font-semibold mr-2">Overall Score:</span>
                <span className={`text-lg font-bold px-3 py-1 rounded-full ${
                  overallScore >= 80 ? 'bg-green-100 text-green-800' :
                  overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {overallScore}%
                </span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
              <p className="text-gray-700 mb-4">
                {overallScore >= 80 
                  ? "Excellent job! You demonstrated strong interview skills and provided comprehensive answers to most questions."
                  : overallScore >= 60
                  ? "Good effort! You covered many key points but there's room for improvement in some areas."
                  : "You've made a start, but there's significant room for improvement in your interview responses."
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-green-50 p-4 rounded-md border border-green-200">
                  <h3 className="font-semibold text-green-800 flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Strengths
                  </h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Provided structured responses</li>
                    <li>• Used relevant examples</li>
                    <li>• Demonstrated technical knowledge</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 flex items-center mb-2">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Areas to Improve
                  </h3>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Be more concise in responses</li>
                    <li>• Provide more quantifiable results</li>
                    <li>• Address all parts of multi-part questions</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                  <h3 className="font-semibold text-blue-800 flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Next Steps
                  </h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Practice the STAR method</li>
                    <li>• Record yourself and review</li>
                    <li>• Try different interview scenarios</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Detailed Feedback</h2>
              
              <div className="space-y-8">
                {feedback.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-gray-900">{index + 1}. {item.question}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.score >= 80 ? 'bg-green-100 text-green-800' :
                        item.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.score}%
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Your Answer:</h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{item.answer}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-600 mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Points Covered:
                        </h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {item.coveredPoints.map((point, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                          {item.coveredPoints.length === 0 && (
                            <li className="text-gray-500 italic">No key points covered</li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Points Missed:
                        </h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {item.missedPoints.map((point, i) => (
                            <li key={i} className="flex items-start">
                              <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                          {item.missedPoints.length === 0 && (
                            <li className="text-green-600 italic">You covered all key points!</li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">How to Improve:</h4>
                      <p className="text-gray-700">{item.improvement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={restartInterview}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Try Another Interview
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterview;