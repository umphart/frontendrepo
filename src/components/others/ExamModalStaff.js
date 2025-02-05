import React from 'react';    
import { FaChalkboardTeacher, FaPencilAlt, FaGraduationCap, FaUserPlus, FaEye, FaEdit, FaAddressCard, FaTable, FaTimes, FaTablets, FaTerminal, FaTableTennis, FaCalendarTimes, FaCalendarPlus, FaSortNumericDown, FaBusinessTime, FaPlusSquare } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';  // Import Slider component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ExamModalStaff = () => {
  const navigate = useNavigate();

 

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
       <button 
        style={styles.backButton} 
        onClick={() => navigate(-1)} // This will go back to the previous page
      >
        ⬅️ Back
      </button>
      <h2 style={styles.heading}>Manage Examination</h2>
      <p style={styles.subheading}>Manage Examination first, Second and Third term.</p>

      <div style={styles.section}>
        <div style={styles.iconList}>
          {/*  Sections Icon */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/staff/add-first-exam')}>
            <FaBusinessTime  size={50} style={styles.icon} />
            <p style={styles.iconText}>First Term</p>
          </div>
           {/*  Sections Icon */}
           <div style={styles.iconItem} onClick={() => handleRedirect('/staff/add-second-exam')}>
            <FaTable  size={50} style={styles.icon} />
            <p style={styles.iconText}>Second Term</p>
          </div>

          {/*classes Icon */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/staff/add-third-exam')}>
            <FaPlusSquare size={50} style={styles.icon} />
            <p style={styles.iconText}>Third Term</p>
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
  backButton: {
    fontSize: '15px',
    color: '#4CAF50',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
  },
  
};

export default ExamModalStaff;
