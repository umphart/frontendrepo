import React, { useEffect, useState } from 'react'; 
import { FaUserCircle } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Alert, Form } from 'reactstrap';

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [message, setMessage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [newPassword, setNewPassword] = useState(''); // State for the new password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming the password
  const [currentPassword, setCurrentPassword] = useState(''); // State for the current password
  const [passwordMismatchAlert, setPasswordMismatchAlert] = useState(false); // State to handle mismatch alert
  const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility

  useEffect(() => {
    const storedStudentData = {
      name: localStorage.getItem('name'),
      role: localStorage.getItem('role'),  // Make sure this fetches correctly
      studentID: localStorage.getItem('studentID'),
      section: localStorage.getItem('section'),
      class: localStorage.getItem('class'),
      dob: localStorage.getItem('dob'),
      guidanceName: localStorage.getItem('guidanceName'),
      guidanceContact: localStorage.getItem('guidanceContact'),
      profilePhoto: localStorage.getItem('profilePhoto'),
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    };
    
    if (storedStudentData.isAuthenticated && storedStudentData.role === 'Student') {
      setStudentData(storedStudentData);
    } else {
      setMessage('User is not authenticated or not a student.');
    }
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setPasswordMismatchAlert(false); // Reset the password mismatch alert when closing the modal
    clearInputs(); // Clear the input fields when the modal is closed
  };

  
  const handlePasswordChange = async () => {
    if (!currentPassword) {
      setMessage("Please enter your current password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMismatchAlert(true); // Show the alert if passwords do not match
      return;
    }

    // Update the API URL to point to the backend running on localhost:5000
    try {
      const response = await fetch('http://localhost:5000/api/updateStudentPassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentID: studentData.studentID,  // Assuming you have the staffID stored in state
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password successfully changed.");
        setTimeout(() => {
          setMessage('');
        }, 2000); // Clear the message after 2 seconds
        clearInputs(); // Clear the inputs after successful password change
        toggleModal(); // Close the modal
      } else {
        setMessage(data.message || "An error occurred.");
        setTimeout(() => {
          setMessage('');
        }, 2000); // Clear the message after 2 seconds
      }
    } catch (error) {
      setMessage("An error occurred while changing the password.");
      setTimeout(() => {
        setMessage('');
      }, 2000); // Clear the message after 2 seconds
      console.error(error);
    }
  };

  const clearInputs = () => {
    // Clear all password-related input fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Student Profile</h2>

      {message && (
        <Alert color={message.includes("successfully") ? "success" : "danger"}>
          {message}
        </Alert>
      )}

      {studentData ? (
        <div style={styles.profileContainer}>
          {studentData.profilePhoto && !imageError ? (
            <img
              src={`http://localhost:5000/uploads/${studentData.profilePhoto}`}
              alt="Profile"
              style={styles.profileImage}
              onError={handleImageError}
            />
          ) : (
            <FaUserCircle size={70} color="#bbb" />
          )}

          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.tableLabel}><strong>Student ID:</strong></td>
                <td>{studentData.studentID || 'N/A'}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Name:</strong></td>
                <td>{studentData.name || 'N/A'}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Section:</strong></td>
                <td>{studentData.section || 'N/A'}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Class:</strong></td>
                <td>{studentData.class || 'N/A'}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Age:</strong></td>
                <td>{studentData.dob || 'N/A'} Years</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Guidance Name:</strong></td>
                <td>{studentData.guidanceName || 'N/A'}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Guidance Contact:</strong></td>
                <td>{studentData.guidanceContact || 'N/A'}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Role:</strong></td>
                <td>{studentData.role || 'N/A'}</td>
              </tr>
            </tbody>
          </table>

          <Button color="primary" onClick={toggleModal} style={styles.button}>
            Change Password
          </Button>

          {/* Modal for Changing Password */}
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Change Password</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input
                  type={passwordVisible ? 'text' : 'password'} // Toggle visibility
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={styles.input}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type={passwordVisible ? 'text' : 'password'} // Toggle visibility
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={styles.input}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type={passwordVisible ? 'text' : 'password'} // Toggle visibility
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                />
              </FormGroup>

              {/* Checkbox to toggle password visibility */}
              <FormGroup check>
                <Input
                  type="checkbox"
                  checked={passwordVisible}
                  onChange={() => setPasswordVisible(!passwordVisible)} // Toggle visibility state
                />
                <label>Show Password</label>
              </FormGroup>

              {/* Show mismatch alert inside the modal */}
              {passwordMismatchAlert && (
                <Alert color="danger">
                  Passwords do not match.
                </Alert>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handlePasswordChange}>Submit</Button>
              <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      ) : (
        <p style={styles.message}>No student data available.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    width: '100%',
    margin: '50px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    boxSizing: 'border-box', // ensures padding is included in width
    fontSize:'15px'
  },
  heading: {
    marginBottom: '20px',
    color: '#4e73df',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  profileContainer: {
    textAlign: 'center',
    overflow: 'hidden', // Prevents horizontal scrolling if content is wider than container
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
  },
  message: {
    fontSize: '14px',
    color: '#555',
    marginTop: '20px',
  },
  table: {
    width: '100%',
    marginTop: '10px',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  tableLabel: {
    fontWeight: 'bold',
    padding: '8px 10px',
    borderBottom: '1px solid #ddd',
    fontSize:'15px'
  },
  button: {
    marginTop: '10px',
  },
  input: {
    marginBottom: '10px',
  },

  // Media Queries for responsiveness
  '@media (max-width: 768px)': {
    container: {
      padding: '15px',
      margin: '20px auto',
    },
    heading: {
      fontSize: '15px',
    },
    profileImage: {
      width: '120px',
      height: '120px',
    },
    tableLabel: {
      fontSize: '14px',
    },
    button: {
      fontSize: '14px',
    },
  },

  '@media (max-width: 480px)': {
    container: {
      padding: '10px',
      margin: '10px auto',
    },
    heading: {
      fontSize: '18px',
    },
    profileImage: {
      width: '50px',
      height: '50px',
    },
    tableLabel: {
      fontSize: '12px',
    },
    button: {
      fontSize: '12px',
    },
  },
};


export default StudentProfile;
