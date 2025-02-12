import { FaUserCircle } from 'react-icons/fa';   
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Modal component to display student details
const Modal = ({ student, onClose, position }) => {
  if (!student) return null;

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
        <h4><strong>{student.name}</strong></h4>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableLabel}><strong>Student ID:</strong></td>
              <td>{student.studentID}</td>
            </tr>
            <tr>
              <td style={styles.tableLabel}><strong>Class:</strong></td>
              <td>{student.class}</td>
            </tr>
            <tr>
              <td style={styles.tableLabel}><strong>Gender:</strong></td>
              <td>{student.gender}</td>
            </tr>
            <tr>
              <td style={styles.tableLabel}><strong>Guidance Name:</strong></td>
              <td>{student.guidanceName}</td>
            </tr>
            <tr>
              <td style={styles.tableLabel}><strong>Guidance Contact:</strong></td>
              <td>{student.guidanceContact}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
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
};

// Styles for the component
const styles = {
  container: {
    position: 'relative',  // This ensures the arrow button stays relative to the container
    marginTop: '5px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
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
    position: 'absolute', // Positioning it absolutely inside the container
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
    fontSize: '16px',
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
    position: 'absolute', // Position modal using top/left properties
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '10px',
    width: '350px', // Reduced width
    zIndex: 1000, // Ensures the modal is above other content
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '10px',
   
  },
  closeButton: {
    backgroundColor: '#ff6f61',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },

  // Table styles for the modal content
  table: {
    width: '100%',
    marginTop: '10px',
    borderCollapse: 'collapse',
  },
  tableLabel: {
    textAlign: 'right',
    paddingRight: '10px',
    fontWeight: 'bold',
  },
};

export default StudentPhotos;
