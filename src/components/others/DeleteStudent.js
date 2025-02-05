import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const DeleteStudent = () => {
  const [tableName, setTableName] = useState("primary_students"); // Default table
  const [studentId, setStudentId] = useState(""); // Input for studentId
  const [message, setMessage] = useState(""); // Feedback message
  const [isError, setIsError] = useState(false); // Tracks error state for styling messages
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [studentName, setStudentName] = useState(""); // Stores the student's name
  const navigate = useNavigate();

  // Function to check if student exists before showing the modal
  const handleDeleteRequest = async () => {
    try {

      // Make GET request to check student and their exam records
      const response = await axios.get("http://localhost:5000/api/check-student", {
        params: { studentId, tableName },
      });

      if (response.data.exists) {
        // Student exists, show student data and allow deletion
        const studentData = response.data.student;

        setStudentName(studentData.name);
        setMessage("Student found: " + studentData.name);
        setIsError(false);

        // Show the confirmation modal
        setShowConfirmModal(true);
      } else {
        setMessage("Student not found.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error checking student:", error);
      setMessage("Error checking student. Please try again.");
      setIsError(true);
    }
  };

  const handleDelete = async () => {
    // Determine section based on table name
    let section = '';
    if (tableName === 'primary_students') {
      section = 'primary';
    } else if (tableName === 'junior_students') {
      section = 'junior';
    } else if (tableName === 'senior_students') {
      section = 'senior';
    }
  
    // URL encode the studentId to handle special characters
    const encodedStudentId = encodeURIComponent(studentId);
  
    try {
      // Send DELETE request to the backend with the encoded studentId
      const response = await axios.delete(
        `http://localhost:5000/api/students/${section}/${encodedStudentId}`
      );
  
      setMessage('Student and their exam records deleted successfully!');
      setIsError(false);
  
      // Close confirmation modal after deletion
      setShowConfirmModal(false);
  
      // Clear the input fields
      setStudentId('');
    } catch (error) {
      console.error('Error deleting student and exam records:', error);
      setMessage('Error deleting student and exam records. Please try again.');
      setIsError(true);
    }
  };
  
  // Auto-dismiss the alert message after 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Clear the message after 2 seconds
      }, 2000);

      return () => clearTimeout(timer); // Cleanup the timeout on component unmount
    }
  }, [message]);
   // Navigate back to previous page
   const handleBack = () => {
    navigate(-1);  // Go to the previous page
  };

  return (
    <div style={styles.container}>
       {/* Back Arrow Button */}
       <button 
        style={styles.backButton} 
        onClick={() => navigate(-1)} // This will go back to the previous page
      >
        ⬅️ Back
      </button>
      <h2 style={styles.heading}>Delete Student</h2>

      {message && (
        <p
          style={{
            ...styles.message,
            color: isError ? "red" : "green",
          }}
        >
          {message}
        </p>
      )}

      <div style={styles.formGroup}>
        <label style={styles.label}>Select Table:</label>
        <select
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          style={styles.input}
        >
          <option value="primary_students">Primary Students</option>
          <option value="junior_students">Junior Students</option>
          <option value="senior_students">Senior Students</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Student ID:</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID"
          style={styles.input}
        />
      </div>

      <div style={styles.buttonContainer}>
        <Button
          color="danger"
          onClick={handleDeleteRequest}
          style={styles.button}
        >
          Check and Delete Student
        </Button>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirmModal} toggle={() => setShowConfirmModal(false)}>
        <ModalHeader toggle={() => setShowConfirmModal(false)}>
          Confirm Deletion
        </ModalHeader>
        <ModalBody>
  <p>
    <strong>Student Name:</strong> {studentName || "Unknown"}
  </p>
  <p>Are you sure you want to delete this student and their records?</p>
</ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            ✔️
          </Button>
          <Button color="secondary" onClick={() => setShowConfirmModal(false)}>
            ❌
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "50px auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#4e73df",
    fontSize: "24px",
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "15px",
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

export default DeleteStudent;
