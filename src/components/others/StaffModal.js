import React from 'react';     
import { FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StaffModal = () => {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      {/* Back Arrow Button */}
      <button 
        onClick={() => navigate(-1)} // Navigate to the previous page
        style={styles.arrowButton}
      >
        ⬅️ Back
      </button>

      <h2 style={styles.heading}>Manage Section</h2>
      <p style={styles.subheading}>Manage Section and Class effortlessly.</p>

      <div style={styles.section}>
        <div style={styles.iconList}>
          {/* Sections Icon */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/staff/staff-section')}>
            <FaChalkboardTeacher size={50} style={styles.icon} />
            <p style={styles.iconText}>Sections</p>
          </div>

          {/* Classes Icon */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/staff/class-staff')}>
            <FaGraduationCap size={50} style={styles.icon} />
            <p style={styles.iconText}>Classes</p>
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
    position: 'relative', // Ensure positioning for the arrow button
  },
  arrowButton: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    fontSize: '15px',
    padding: '0',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#007bff',
    textDecoration: 'none', // Remove underline from button text
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
  sliderContainer: {
    marginBottom: '0px',
    backgroundColor: 'blue',
    borderRadius: '6px',
  },
  sliderImage: {
    width: '20%',
    height: 'auto',
    borderRadius: '8px',
    textAlign: 'center',
    padding: '20px',
  }
};

export default StaffModal;
