import React, { useState, useRef } from 'react';   
import axios from 'axios';
import { Alert, Button, Form, FormGroup, Label, Input, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
const AddStaff = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success or error
  const [generatedStaffID, setGeneratedStaffID] = useState('');
  const [displayName, setDisplayName] = useState(''); // Added new state to keep name after submission
  const [photo, setPhoto] = useState(null); // New state to handle photo
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const  navigate = useNavigate();

  // Ref for file input
  const photoInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !department || !phone || !email || !gender) {
      setMessageType('error');
      setMessage('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('department', department);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('gender', gender);

    // Append photo if it exists
    if (photo) {
      formData.append('photo', photo); // 'photo' matches the field name in backend
    }

    axios.post('https://schoolbackendcode.onrender.com/addStaff', formData)
      .then((response) => {
        setMessageType('success');
        setMessage(response.data.message);
        setGeneratedStaffID(response.data.staffID);  // Set generated Staff ID
        setDisplayName(name);  // Save the name in the new state for display

        // Clear form inputs
        setName('');
        setDepartment('');
        setPhone('');
        setEmail('');
        setGender('');
        setPhoto(null);  // Clear photo state

        // Clear file input field
        if (photoInputRef.current) {
          photoInputRef.current.value = '';  // Reset file input
        }

        setIsModalOpen(true);  // Open modal on success
      })
      .catch(() => {
        setMessageType('error');
        setMessage('Error saving staff record.');
      });

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setName('');
    setPhone('');
    setEmail('');
    setGender('');
    setPhoto(null); // Clear photo state
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <Container className="mt-3" style={styles.container}>
      
      {message && (
        <Alert color={messageType === 'success' ? 'success' : 'danger'} style={messageType === 'success' ? styles.successAlert : styles.dangerAlert}>
          {messageType === 'success' ? '✔️ ' : '❌ '}
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm" style={styles.form}>
         <button 
        style={styles.backButton} 
        onClick={() => navigate(-1)} // This will go back to the previous page
      >
        ⬅️ Back
      </button>
        <h2 style={styles.heading}>Add New Staff</h2>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name" className="small">Name:</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter staff's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="department" className="small">Department:</Label>
              <Input
                type="text"
                id="department"
                placeholder="Enter department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={styles.input}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="phone" className="small">Phone Number:</Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="email" className="small">Email:</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="gender" className="small">Gender:</Label>
              <Input
                type="select"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={styles.input}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="photo" className="small">Staff Photo:</Label>
              <Input
                type="file"
                id="photo"
                ref={photoInputRef} // Reference to file input
                onChange={handlePhotoChange}
                style={styles.input}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit" color="primary" className="w-100" style={styles.button}>Add Staff</Button>
      </Form>

      <Modal isOpen={isModalOpen} toggle={handleModalClose}>
        <ModalHeader toggle={handleModalClose}>Staff Added Successfully</ModalHeader>
        <ModalBody>
          <p><strong>Staff Name:</strong> {displayName}</p>
          <p><strong>Staff ID:</strong> {generatedStaffID}</p>
          <p><strong>Your Default Password is 1234</strong> Login with your staff ID to change your password.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleModalClose}>Close</Button>
        </ModalFooter>
      </Modal>

      {generatedStaffID && displayName && (
        <div className="mt-3 alert alert-info" style={styles.generatedInfo}>
          <strong>Generated Staff ID: </strong> {generatedStaffID}
          <br />
          <strong>Staff Name: </strong> {displayName}
        </div>
      )}
    </Container>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#4e73df',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  backButton: {
    fontSize: '15px',
    color: '#4CAF50',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
  },
  form: {
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  },
  input: {
    borderRadius: '5px',
    marginBottom: '15px',
    padding: '10px',
  },
  button: {
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    padding: '10px',
    marginTop: '15px',
  },
  successAlert: {
    backgroundColor: '#d4edda',
    color: '#155724',
    borderColor: '#c3e6cb',
    fontWeight: 'bold',
  },
  dangerAlert: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderColor: '#f5c6cb',
    fontWeight: 'bold',
  },
  generatedInfo: {
    backgroundColor: '#e3f2fd',
    padding: '15px',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
  }
};

export default AddStaff;
