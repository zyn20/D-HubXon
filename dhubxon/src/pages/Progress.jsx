import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faCode, faComments, faBug, faBook, faCheckCircle, faChartLine } from '@fortawesome/free-solid-svg-icons';
import Navbar_Client from '../components/client/Navbar';

const Progress = () => {
  const progressData = [
    { id: 1, date: '2023-12-15', description: 'Completed initial design sketches.', icon: <FontAwesomeIcon icon={faPalette} style={{ color: '#1976D2' }} /> },
    { id: 2, date: '2023-12-18', description: 'Implemented backend functionality.', icon: <FontAwesomeIcon icon={faCode} style={{ color: '#4CAF50' }} /> },
    { id: 3, date: '2023-12-22', description: 'Integrated third-party API.', icon: <FontAwesomeIcon icon={faComments} style={{ color: '#FFC107' }} /> },
    { id: 4, date: '2023-12-25', description: 'Refined user interface based on client feedback.', icon: <FontAwesomeIcon icon={faPalette} style={{ color: '#1976D2' }} /> },
    { id: 5, date: '2023-12-28', description: 'Optimized database queries for improved performance.', icon: <FontAwesomeIcon icon={faBug} style={{ color: '#F44336' }} /> },
    { id: 6, date: '2024-01-02', description: 'Conducted user testing sessions and gathered feedback.', icon: <FontAwesomeIcon icon={faComments} style={{ color: '#FFC107' }} /> },
    { id: 7, date: '2024-01-05', description: 'Implemented responsive design for mobile devices.', icon: <FontAwesomeIcon icon={faCode} style={{ color: '#4CAF50' }} /> },
    { id: 8, date: '2024-01-08', description: 'Resolved bugs reported during testing phase.', icon: <FontAwesomeIcon icon={faBug} style={{ color: '#F44336' }} /> },
    { id: 9, date: '2024-01-12', description: 'Prepared documentation for deployment.', icon: <FontAwesomeIcon icon={faBook} style={{ color: '#9C27B0' }} /> },
    { id: 10, date: '2024-01-15', description: 'Deployed the application to production environment.', icon: <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#4CAF50' }} /> },
    { id: 11, date: '2024-01-18', description: 'Monitored system performance and applied optimizations.', icon: <FontAwesomeIcon icon={faChartLine} style={{ color: '#FFC107' }} /> },
    { id: 12, date: '2024-01-22', description: 'Conducted a post-launch review and discussed future enhancements.', icon: <FontAwesomeIcon icon={faComments} style={{ color: '#FFC107' }} /> },
    // Add more dummy progress data as needed
  ];

  return (
    <>
      <Navbar_Client />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold mb-6">Progress Updates</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {progressData.map((update) => (
            <div key={update.id} className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{update.icon}</span>
                <h3 className="text-lg font-semibold text-gray-800">{update.date}</h3>
              </div>
              <p className="text-gray-700">{update.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Progress;
