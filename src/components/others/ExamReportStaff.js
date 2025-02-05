import React from 'react';    
import { FaChalkboardTeacher, FaPencilAlt, FaGraduationCap, FaUserPlus, FaEye, FaEgg, FaEdit } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';  // Import Slider component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ExamReportStaff = () => {
  const navigate = useNavigate();

 

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Examination</h2>
      <p style={styles.subheading}>Manage Examination and Generate Result effortlessly.</p>

      <div style={styles.section}>
        <div style={styles.iconList}>
          {/*  Sections Icon */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/staff/exam-modal')}>
            <FaEdit  size={50} style={styles.icon} />
            <p style={styles.iconText}>Add Exam</p>
          </div>

          {/*classes Icon */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/staff/view-modal')}>
            <FaEye size={50} style={styles.icon} />
            <p style={styles.iconText}>View Result</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#3347B0',
    textAlign: 'center',
    marginBottom: '15px',
  },
  subheading: {
    fontSize: '18px',
    color: '#555',
    textAlign: 'center',
    marginBottom: '30px',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#444',
    marginBottom: '20px',
    textAlign: 'center',
  },
  iconList: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: '20px',
  },
  iconItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18%',
    padding: '15px',
    cursor: 'pointer',
    borderRadius: '10px',
    transition: 'transform 0.3s, background-color 0.3s',
    backgroundColor: '#f4f7fa',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  iconItemHover: {
    backgroundColor: '#e0e7ff',
    transform: 'scale(1.05)',
  },
  icon: {
    color: '#3347B0',
    transition: 'color 0.3s',
  },
  iconText: {
    marginTop: '10px',
    color: '#555',
    fontSize: '16px',
    fontWeight: '500',
    textAlign: 'center',
  },
  
};

export default ExamReportStaff;
