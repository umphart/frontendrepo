import { FaUserCircle } from 'react-icons/fa';   
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ student, onClose, position }) => {
  if (!student) return null;

  return (
    <div 
      style={{
        ...styles.modalOverlay,
        top: position.top,
        left: position.left,
        position: 'absolute',
      }} 
      onClick={onClose}
    >
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span style={styles.closeButton} onClick={onClose}>❌</span> {/* Close Button "X" */}
        <h5><strong>{student.name}</strong></h5>
        <table style={styles.table}>
          <tbody>
            <tr style={styles.tableRow}>
              <td style={styles.tableLabel}><strong>Student ID:</strong></td>
              <td style={styles.tableData}>{student.studentID}</td>
            </tr>
            <tr style={styles.tableRow}>
              <td style={styles.tableLabel}><strong>Class:</strong></td>
              <td style={styles.tableData}>{student.class}</td>
            </tr>
            <tr style={styles.tableRow}>
              <td style={styles.tableLabel}><strong>Gender:</strong></td>
              <td style={styles.tableData}>{student.gender}</td>
            </tr>
            <tr style={styles.tableRow}>
              <td style={styles.tableLabel}><strong>Guidance Name:</strong></td>
              <td style={styles.tableData}>{student.guidanceName}</td>
            </tr>
            <tr style={styles.tableRow}>
              <td style={styles.tableLabel}><strong>Guidance Contact:</strong></td>
              <td style={styles.tableData}>{student.guidanceContact}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StudentPhotos = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null); // State to track selected student for modal visibility
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // Position of the modal

  useEffect(() => {
    fetch('http://localhost:5000/api/students/all')
      .then(response => response.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
        setLoading(false);
      });
  }, []);

  const handleImageError = (e) => {
    e.target.src = '/uploads/default-avatar.png';
  };

  const openModal = (student, event) => {
    const rect = event.target.getBoundingClientRect(); // Get position of clicked card
    setModalPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX }); // Set modal position relative to the page
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
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

      <h1 style={styles.heading}>Student Photos</h1>
      <div style={styles.gridContainer}>
        {students.map(student => (
          <div key={student.studentID} style={styles.studentCard} onClick={(event) => openModal(student, event)}>
            <div style={styles.studentID}>{student.studentID}</div>
            <div style={styles.studentName}>{student.name}</div>
            <div style={styles.studentPhotoContainer}>
              {student.profilePhoto ? (
                <img
                  src={`http://localhost:5000/uploads/${student.profilePhoto}`}
                  alt={`${student.name}'s Profile`}
                  style={styles.studentPhoto}
                  onError={handleImageError}
                />
              ) : (
                <FaUserCircle size={50} color="#ccc" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal to display details of selected student */}
      <Modal student={selectedStudent} onClose={closeModal} position={modalPosition} />
    </div>
  );
};// Styles for the component
// Modal styles for responsiveness
const styles = {
  container: {
    position: 'relative',
    marginTop: '5px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
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
  studentCard: {
    backgroundColor: '#f9f9f9',
    padding: '5px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
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
  studentID: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  },
  studentName: {
    fontSize: '12px',
    color: '#555',
    marginBottom: '5px',
  },
  studentPhotoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentPhoto: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '8px',
  },

  // Modal styles
  modalOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '10px',
    borderRadius: '10px',
    width: '300px', // Modal width for larger screens
    maxWidth: '95%', // Ensure the modal doesn’t overflow on small screens
    zIndex: 1000,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the modal
    boxSizing: 'border-box', // Include padding in the element's width
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    position: 'relative',
    textAlign: 'left',
    maxHeight: '80vh', // Limit modal height on small screens
    overflowY: 'auto', // Allow scrolling if content overflows
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
    fontSize: '12px',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  tableData: {
    fontSize: '12px',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  tableRowAlternate: {
    backgroundColor: '#f7f7f7',
  },

  // Media Queries for responsiveness
  '@media (max-width: 768px)': {
    modalOverlay: {
      width: '80%', // Take up more width on medium screens, but keep the aspect ratio
      maxWidth: '90%',
    },
    modalContent: {
      padding: '10px',
      fontSize: '14px',
    },
    closeButton: {
      fontSize: '16px', // Adjust close button size for smaller screens
    },
  },

  '@media (max-width: 480px)': {
    modalOverlay: {
      width: '90%', // Modal will take up 90% of the screen width on small devices
    },
    modalContent: {
      padding: '5px',
      fontSize: '12px', // Adjust font size for very small screens
    },
    closeButton: {
      fontSize: '14px', // Smaller close button
    },
  },
};

export default StudentPhotos;
