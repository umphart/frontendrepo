import { FaUserCircle } from 'react-icons/fa';   
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Modal component to display staff details
const Modal = ({ staffMember, onClose, position }) => {
  if (!staffMember) return null;

  return (
    <div 
      style={{
        ...styles.modalOverlay,
        top: position.top,
        left: position.left,
        position: 'absolute', // Absolute positioning relative to the page
      }} 
      onClick={onClose}
    >
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span style={styles.closeButton} onClick={onClose}>❌</span>
        <h4><strong>{staffMember.name}</strong></h4>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableLabel}><strong>Staff ID:</strong></td>
              <td>{staffMember.staffID}</td>
            </tr>
            <tr>
              <td style={styles.tableLabel}><strong>Department:</strong></td>
              <td>{staffMember.department}</td>
            </tr>
            <tr>
              <td style={styles.tableLabel}><strong>Email:</strong></td>
              <td>{staffMember.email}</td>
            </tr>
            <tr>
              <td style={styles.tableLabel}><strong>Gender:</strong></td>
              <td>{staffMember.gender}</td>
            </tr>
            <tr>
              <td style={styles.tableLabel}><strong>Phone:</strong></td>
              <td>{staffMember.phone}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StaffPhotos = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState(null); // State to track selected staff for modal visibility
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // Position of the modal

  useEffect(() => {
    // Fetch staff data from the API
    fetch('http://localhost:5000/api/getStaffMembers')
      .then(response => response.json())
      .then(data => {
        setStaff(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching staff data:', error);
        setLoading(false);
      });
  }, []);

  const handleImageError = (e) => {
    e.target.src = '/uploads/default-avatar.png'; // Default image if the profile photo is missing
  };

  const openModal = (staffMember, event) => {
    const rect = event.target.getBoundingClientRect(); // Get position of clicked card
    setModalPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX }); // Set modal position relative to the page
    setSelectedStaff(staffMember);
  };

  const closeModal = () => {
    setSelectedStaff(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <button 
        onClick={() => navigate(-1)} // Navigate to the previous page
        style={styles.arrowButton}
      >
        ⬅️ Back
      </button>

      <h1 style={styles.heading}>Staff Photos</h1>
      <div style={styles.gridContainer}>
        {staff.map(staffMember => ( 
          <div key={staffMember.staffID} style={styles.staffCard} onClick={(event) => openModal(staffMember, event)}>
            <div style={styles.staffID}>{staffMember.staffID}</div>  
            <div style={styles.staffName}>{staffMember.name}</div>
            <div style={styles.staffPhotoContainer}>
              {staffMember.profilePhoto ? (  
               <img
               src={`http://localhost:5000/uploads/${staffMember.profilePhoto}`}
               alt={`${staffMember.name}'s Profile`}
               style={styles.staffPhoto}
               onError={(e) => handleImageError(e)}
             />
              ) : (
                <FaUserCircle size={50} color="#ccc" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal to display details of selected staff */}
      <Modal staffMember={selectedStaff} onClose={closeModal} position={modalPosition} />
    </div>
  );
};

const styles = {
  container: {
    marginTop: '5px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    position: 'relative',  // Add this line to position elements inside relative to this container
  },
  heading: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '15px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '15px',
    padding: '5px',
  },
  staffCard: { 
    backgroundColor: '#f9f9f9',
    padding: '5px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
  },
  staffID: {  
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '-7px',
  },
  staffName: {  
    fontSize: '12px',
    color: '#555',
    marginBottom: '0px',
  },
  staffPhotoContainer: {  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  staffPhoto: {  
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '8px',
  },

  // Modal styles
  modalOverlay: {
    position: 'absolute', // Position modal using top/left properties
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '10px',
    borderRadius: '10px',
    width: '300px', // Reduced width
    zIndex: 1000, // Ensures the modal is above other content
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    textAlign: 'left',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '15px',
    cursor: 'pointer',
    color: '#888',
  },

  // Table styles for the modal content
  table: {
    width: '100%',
    marginTop: '10px',
    borderCollapse: 'collapse',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableLabel: {
    textAlign: 'right',
    paddingRight: '10px',
    fontWeight: 'bold',
    fontSize: '12px',  // Reduced font size for labels
  },
  tableData: {
    fontSize: '12px',
  },
  
  arrowButton: {
    position: 'absolute', 
    top: '15px',
    left: '15px',
    fontSize: '15px',
    padding: '5px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#007bff', 
  },
};

export default StaffPhotos;
