import React from 'react';    
import { Button } from 'reactstrap';
import { FaUserPlus, FaUserEdit, FaExchangeAlt, FaUserTimes, FaTrashAlt } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const ManageStudent = () => {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      {/* Arrow button for navigation */}
      <button 
        onClick={() => navigate(-1)} // Navigate to the previous page
        style={styles.arrowButton}
      >
        ⬅️ Back
      </button>

      <h2 style={styles.heading}>Manage Student Records</h2>
      <p style={styles.subheading}>Add, update, transfer, withdraw, or delete student records seamlessly.</p>
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Actions:</h3>
        <div style={styles.iconList}>
          {/* Add Student */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/admin/add-student')}>
            <FaUserPlus size={50} style={styles.icon} />
            <p style={styles.iconText}>Add Student</p>
          </div>

          {/* Update Student */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/admin/update-student')}>
            <FaUserEdit size={50} style={styles.icon} />
            <p style={styles.iconText}>Update Student</p>
          </div>

          {/* Transfer Student */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/admin/transfer-student')}>
            <FaExchangeAlt size={50} style={styles.icon} />
            <p style={styles.iconText}>Transfer Student</p>
          </div>

          {/* Withdraw Student */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/admin/withdraw-student')}>
            <FaUserTimes size={50} style={styles.icon} />
            <p style={styles.iconText}>Withdraw Student</p>
          </div>

          {/* Delete Student */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/admin/delete-student')}>
            <FaTrashAlt size={50} style={styles.icon} />
            <p style={styles.iconText}>Delete Student</p>
          </div>
        </div>
      </div>

    </div>
  );
};

// Updated styles
const styles = {
  container: {
    padding: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative', // Ensure positioning for arrow button
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
    marginBottom: '30px',
  },
  sliderImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  }
};

export default ManageStudent;
