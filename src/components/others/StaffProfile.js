import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Alert } from 'reactstrap';

const StaffProfile = () => {
  const [staffData, setStaffData] = useState(null);
  const [message, setMessage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [newPassword, setNewPassword] = useState(''); // State for the new password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming the password
  const [currentPassword, setCurrentPassword] = useState(''); // State for the current password
  const [passwordMismatchAlert, setPasswordMismatchAlert] = useState(false); // State to handle mismatch alert
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility

  useEffect(() => {
    const storedStaffData = {
      name: localStorage.getItem('name'),
      role: localStorage.getItem('role'),
      staffID: localStorage.getItem('staffID'),
      department: localStorage.getItem('department'),
      email: localStorage.getItem('email'),
      gender: localStorage.getItem('gender'),
      phone: localStorage.getItem('phone'),
      profilePhoto: localStorage.getItem('profilePhoto'),
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    };

    if (storedStaffData.isAuthenticated && storedStaffData.role === 'Staff') {
      setStaffData(storedStaffData);
    } else {
      setMessage('User is not authenticated or not a staff member.');
      setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
    }
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setPasswordMismatchAlert(false); // Reset the password mismatch alert when closing the modal
    clearInputs(); // Clear the inputs when the modal is closed (either canceled or submitted)
  };

  const handlePasswordChange = async () => {
    if (!currentPassword) {
      setMessage("Please enter your current password.");
      setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMismatchAlert(true); // Show the alert if passwords do not match
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/updatePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          staffID: staffData.staffID,  // Assuming you have the staffID stored in state
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password successfully changed.");
        setTimeout(() => setMessage(''), 2000); // Clear the message after 2 seconds
        clearInputs(); // Clear the inputs after successful password change
        toggleModal(); // Close the modal
      } else {
        setMessage(data.message || "An error occurred.");
        setTimeout(() => setMessage(''), 2000); // Clear the message after 2 seconds
      }
    } catch (error) {
      setMessage("An error occurred while changing the password.");
      setTimeout(() => setMessage(''), 2000); // Clear the message after 2 seconds
      console.error(error);
    }
  };

  const clearInputs = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Staff Profile</h2>

      {message && (
        <Alert color={message.includes("successfully") ? "success" : "danger"}>
          {message}
        </Alert>
      )}

      {staffData ? (
        <div style={styles.profileContainer}>
          {imageError || !staffData.profilePhoto ? (
            <FaUserCircle size={150} color="#bbb" />
          ) : (
            <img
              src={`http://localhost:5000/uploads/${staffData.profilePhoto}`}
              alt="Staff Profile"
              style={styles.profilePhoto}
              onError={handleImageError}
            />
          )}

          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.tableLabel}><strong>Staff ID:</strong></td>
                <td>{staffData.staffID || 'N/A'}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Name:</strong></td>
                <td>{staffData.name || 'N/A'}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Role:</strong></td>
                <td>{staffData.role || 'N/A'}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Department:</strong></td>
                <td>{staffData.department || 'N/A'}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Email:</strong></td>
                <td>{staffData.email || 'N/A'}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Gender:</strong></td>
                <td>{staffData.gender || 'N/A'}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}><strong>Phone:</strong></td>
                <td>{staffData.phone || 'N/A'}</td>
              </tr>
            </tbody>
          </table>

          <Button color="primary" onClick={toggleModal} style={styles.button}>
            Change Password
          </Button>

          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Change Password</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={styles.input}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={styles.input}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                />
              </FormGroup>

              {passwordMismatchAlert && (
                <Alert color="danger">
                  Passwords do not match.
                </Alert>
              )}

              <FormGroup check>
                <Input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />{' '}
                <label>Show Password</label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handlePasswordChange}>Submit</Button>
              <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      ) : (
        <p style={styles.message}>No staff data available.</p>
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
    boxSizing: 'border-box', 
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
    overflow: 'hidden',
  },
  profilePhoto: {
    width: '100px',
    height: '100px',
    borderRadius: '20%',
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
};

export default StaffProfile;
