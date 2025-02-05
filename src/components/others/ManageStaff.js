import React from 'react';      
import { FaUserPlus, FaUserEdit, FaExchangeAlt, FaUserTimes, FaTrashAlt, FaUsers } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const ManageStaff = () => {
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
        ⬅️
      </button>

      <h2 style={styles.heading}>Manage Staff Records</h2>
      <p style={styles.subheading}>Add, update, Assign Subject, Unassign Subject, or delete staff records seamlessly.</p>
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Actions:</h3>
        <div style={styles.iconList}>
          {/* Staff List */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/admin/staff-list')}>
            <FaUsers size={50} style={styles.icon} />
            <p style={styles.iconText}>Staff List</p>
          </div>

          {/* Add Staff */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/admin/add-staff')}>
            <FaUserPlus size={50} style={styles.icon} />
            <p style={styles.iconText}>Add Staff</p>
          </div>

          {/* Assign Subject */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/admin/assign-subject')}>
            <FaExchangeAlt size={50} style={styles.icon} />
            <p style={styles.iconText}>Assign Subject</p>
          </div>

          {/* Unassign Subject */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/admin/unassign-subject')}>
            <FaUserTimes size={50} style={styles.icon} />
            <p style={styles.iconText}>Unassign Subject</p>
          </div>

          {/* Update Staff */}
          <div style={styles.iconItem} onClick={() => handleRedirect('/admin/update-staff')}>
            <FaUserEdit size={50} style={styles.icon} />
            <p style={styles.iconText}>Update Staff</p>
          </div>

        </div>
      </div>
    </div>
  );
};

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
    textDecoration: 'none',
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
    width: '14%',
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
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
  },
};

export default ManageStaff;
