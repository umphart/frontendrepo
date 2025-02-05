import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaList, FaSignOutAlt, FaTachometerAlt , FaBars, FaUserCircle, FaClipboardList, FaChargingStation, FaChild, FaBookReader, FaGraduationCap } from 'react-icons/fa'; // Importing icons
import { FaUserPlus, FaUserEdit, FaExchangeAlt, FaUserTimes, FaTrashAlt } from 'react-icons/fa'; 

const ClassStaff = () => {
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
    <h2 style={styles.heading}>Classes Section</h2>
    <div style={styles.section}>
      <div style={styles.iconList}>
        {/* Add Student */}
        <div style={styles.iconItem} onClick={() => handleRedirect('/staff/primary1')}>
        <FaChild size={40} style={styles.icon} />
          <p style={styles.iconText}>Primary 1</p>
        </div>
 {/* Add Student */}
     <div style={styles.iconItem} onClick={() => handleRedirect('/staff/primary2')}>
     <FaChild size={40} style={styles.icon} />
          <p style={styles.iconText}>Primary 2</p>
        </div>

        {/* Update Student */}
        <div style={styles.iconItem} onClick={() => handleRedirect('/staff/primary3')}>
        <FaChild size={40} style={styles.icon} />
          <p style={styles.iconText}>Primary 3</p>
        </div>

        {/* Transfer Student */}
        <div style={styles.iconItem} onClick={() => handleRedirect('/staff/primary4')}>
        <FaChild size={40} style={styles.icon} />
          <p style={styles.iconText}>Primary 4</p>
        </div>

        {/* Withdraw Student */}
        <div style={styles.iconItem} onClick={() => handleRedirect('/staff/primary5')}>
        <FaChild size={40} style={styles.icon} />
          <p style={styles.iconText}>Primary 5</p>
        </div>

        {/* Delete Student */}
        <div style={styles.iconItem} onClick={() => handleRedirect('/staff/junior1')}>
        <FaBookReader size={40} style={styles.icon} />
          <p style={styles.iconText}>JSS 1</p>
        </div>
        <div style={styles.iconItem} onClick={() => handleRedirect('/staff/junior2')}>
        <FaBookReader size={40} style={styles.icon} />
          <p style={styles.iconText}>JSS 2</p>
        </div>
        <div style={styles.iconItem} onClick={() => handleRedirect('/staff/junior3')}>
        <FaBookReader size={40} style={styles.icon} />
          <p style={styles.iconText}>JSS 3</p>
        </div>
        <div style={styles.iconItem} onClick={() => handleRedirect('/staff/senior1')}>
        <FaGraduationCap size={40} style={styles.icon} />
          <p style={styles.iconText}>SS 1</p>
        </div>
        <div style={styles.iconItem} onClick={() => handleRedirect('/staff/senior2')}>
        <FaGraduationCap size={40} style={styles.icon} />
          <p style={styles.iconText}>SS 2</p>
        </div>
        <div style={styles.iconItem} onClick={() => handleRedirect('/staff/senior3')}>
        <FaGraduationCap size={40} style={styles.icon} />
          <p style={styles.iconText}>SS 3</p>
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
backButton: {
  fontSize: '15px',
  color: '#4CAF50',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  textAlign: 'left',
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

export default ClassStaff;
