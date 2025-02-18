import React, { useState } from 'react'; 
import axios from 'axios'; 
import { 
  Form, FormGroup, Label, Input, Button, Container, Alert, Row, Col, 
  Modal, ModalHeader, ModalBody, ModalFooter 
} from 'reactstrap'; 
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const AddStudent = ({ onStudentAdded }) => {
  const navigate = useNavigate(); // Initialize the navigate hook

  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [gender, setGender] = useState('');
  const [className, setClassName] = useState('');
  const [guidanceName, setGuidanceName] = useState('');
  const [guidanceContact, setGuidanceContact] = useState('');
  const [dob, setDob] = useState('');
  const [photo, setPhoto] = useState(null); // New state for photo
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [generatedStudentID, setGeneratedStudentID] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderClassOptions = () => {
    switch (section) {
      case 'Primary':
        return (
          <>
            <option value="">Select Class</option>
            <option value="Primary 1">Primary 1</option>
            <option value="Primary 2">Primary 2</option>
            <option value="Primary 3">Primary 3</option>
            <option value="Primary 4">Primary 4</option>
            <option value="Primary 5">Primary 5</option>
          </>
        );
      case 'Junior':
        return (
          <>
            <option value="">Select Class</option>
            <option value="JSS 1">JSS 1</option>
            <option value="JSS 2">JSS 2</option>
            <option value="JSS 3">JSS 3</option>
          </>
        );
      case 'Senior':
        return (
          <>
            <option value="">Select Class</option>
            <option value="SS 1">SS 1</option>
            <option value="SS 2">SS 2</option>
            <option value="SS 3">SS 3</option>
          </>
        );
      default:
        return <option value="">Select Section First</option>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!name || !section || !className || !dob || !gender || !guidanceName || !guidanceContact) {
      setMessageType('error');
      setMessage('All fields are required.');
      setTimeout(() => setMessage(''), 2000); // Dismiss alert after 2 seconds
      return;
    }
  
    // Create a FormData object to send the data as multipart/form-data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('section', section);
    formData.append('class', className);
    formData.append('dob', dob);
    formData.append('guidanceName', guidanceName);
    formData.append('guidanceContact', guidanceContact);
    formData.append('gender', gender);
  
    // Append the photo to the formData if it exists
    if (photo) {
      formData.append('photo', photo); // 'photo' should match the backend field name
    }
  
    // Send the FormData to the server
    axios.post('http://localhost:5000/api/add-student', formData)
      .then((response) => {
        setMessageType('success');
        setMessage(response.data.message);
        setGeneratedStudentID(response.data.studentID);
        setIsModalOpen(true); // Open the modal on success
  
        // Clear message after 2 seconds
        setTimeout(() => setMessage(''), 2000);
      })
      .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error);
        setMessageType('error');
        setMessage('Error saving student record.');
  
        // Clear message after 2 seconds
        setTimeout(() => setMessage(''), 2000);
      });
  };
  
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setName('');
    setSection('');
    setClassName('');
    setDob('');
    setGuidanceName('');
    setGuidanceContact('');
    setGender('');
    setPhoto(null); // Clear the photo state
  };
  const handlePrint = () => {
    const printContent = document.getElementById('printableContent').innerHTML;
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Print Student Details</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };
  return (
    <Container className="mt-3" style={{ maxWidth: '700px', position: 'relative' }}>
      {/* Back Button */}
      <Button 
        color="link" 
        onClick={() => navigate(-1)} // Navigate to the previous page
        style={{
          position: 'absolute', 
          top: '15px', 
          left: '15px', 
          fontSize: '15px', 
          padding: '0', 
          color: '#007bff',
          textDecoration: 'none',
        }}
      >
        ⬅️ back
      </Button>

      {message && (
        <Alert
          color={messageType === 'success' ? 'success' : 'danger'}
          style={messageType === 'success' ? styles.successAlert : styles.dangerAlert}
        >
          {messageType === 'success' ? '✔️ ' : '❌ '}
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm" style={{ backgroundColor: '#f5f5f5' }}>
        <h2 style={styles.heading}>Add New Student</h2>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name" className="small">Name:</Label>
              <Input
                type="text"
                id="name"
                placeholder="student's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="section" className="small">Section:</Label>
              <Input
                type="select"
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="">Select Section</option>
                <option value="Primary">Primary</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="class" className="small">Class:</Label>
              <Input
                type="select"
                id="class"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              >
                {renderClassOptions()}
              </Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="dob" className="small">Age:</Label>
              <Input
                type="text"
                id="dob"
                placeholder="Enter Age"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="gender" className="small">Gender:</Label>
              <Input
                type="select"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={5}>
            <FormGroup>
              <Label for="guidanceName" className="small">Guidance Name:</Label>
              <Input
                type="text"
                id="guidanceName"
                placeholder="Enter guidance name"
                value={guidanceName}
                onChange={(e) => setGuidanceName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="guidanceContact" className="small">Guidance Contact:</Label>
              <Input
                type="text"
                id="guidanceContact"
                placeholder="Enter guidance contact"
                value={guidanceContact}
                onChange={(e) => setGuidanceContact(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="photo" className="small">Student Photo:</Label>
              <Input
                type="file"
                id="photo"
                onChange={(e) => setPhoto(e.target.files[0])} // Assuming setPhoto will handle the file in the state
              />
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit" color="primary" className="w-100">
          Add Student
        </Button>
       

      </Form>

      <Modal isOpen={isModalOpen} toggle={handleModalClose}>
      <ModalHeader toggle={handleModalClose}>Student Added Successfully</ModalHeader>
      <ModalBody>
        {/* The content that will be printed */}
        <div id="printableContent">
          <p><strong>Student Name:</strong> {name}</p>
          <p><strong>Student ID:</strong> {generatedStudentID}</p>
          <p><strong>Your Default Password is 1234</strong></p>
          <p>Login with your student ID to Change your password</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleModalClose}>Close</Button>
        <Button color="secondary" onClick={handlePrint}>Print</Button>
      </ModalFooter>
    </Modal>

    </Container>
  );
};

const styles = {
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#4e73df',
    fontSize: '24px',
    fontWeight: 'bold',
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
};

export default AddStudent;
