import React from 'react';     
import { FaChalkboardTeacher, FaPencilAlt, FaGraduationCap, FaUserPlus, FaEye, FaEarlybirds, FaAddressBook } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ViewModal = () => {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      {/* Arrow for navigating back to previous page */}
      <div style={styles.arrow} onClick={() => navigate(-1)}>
        ⬅️ Back
      </div>

      <h2 style={styles.heading}>View Examination</h2>
      <p style={styles.subheading}>Manage Examination and Generate Result effortlessly.</p>

      <div style={styles.section}>
        <div style={styles.iconList}>
          {/*  Sections Icon */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/admin/first-term')}>
            <FaEye  size={50} style={styles.icon} />
            <p style={styles.iconText}>First Term</p>
          </div>
           {/*  Sections Icon */}
           <div style={styles.iconItem} onClick={() => handleRedirect('/admin/second-term')}>
            <FaEye  size={50} style={styles.icon} />
            <p style={styles.iconText}>Second Term</p>
          </div>

          {/*classes Icon */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/admin/third-term')}>
            <FaEye size={50} style={styles.icon} />
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
    position: 'relative', // Needed for positioning the arrow
  },
  arrow: {
    position: 'absolute',
    color:'green',
    top: '20px',
    left: '20px',
    fontSize: '15px',
    cursor: 'pointer',
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

export default ViewModal;
