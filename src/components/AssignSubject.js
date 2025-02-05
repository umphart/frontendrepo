import React, { useState, useEffect } from 'react';  
import { Button, Form, FormGroup, Label, Input, Alert, Row, Col } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const AssignSubject = () => {
  const navigate = useNavigate();  // Use navigate hook

  const [staffMembers, setStaffMembers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch staff members
    axios.get('http://localhost:5000/api/getStaffMembers')
      .then(response => {
        setStaffMembers(response.data);
      })
      .catch(error => {
        console.error('Error fetching staff members:', error);
      });

    // Fetch available subjects
    axios.get('http://localhost:5000/api/getSubjects')
      .then(response => {
        setSubjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching subjects:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedStaff || !selectedSubject) {
      setErrorMessage('Please select both a staff member and a subject.');
      setSuccessMessage('');
      return;
    }

    // Find the selected staff member name
    const selectedStaffName = staffMembers.find(staff => staff.staffID === selectedStaff)?.name || '';
    
    // Find the selected subject name
    const selectedSubjectName = subjects.find(subject => subject.subject_code === selectedSubject)?.subject_name || '';

    const data = {
      staffID: selectedStaff,
      staff_name: selectedStaffName,  // Include staff name
      subject_code: selectedSubject,
      subject_name: selectedSubjectName,  // Include subject name
    };

    axios.post('http://localhost:5000/api/assignSubject', data)
      .then(response => {
        setSuccessMessage('Subject assigned successfully!');
        setErrorMessage('');
        // Dismiss success alert after 2 seconds
        setTimeout(() => setSuccessMessage(''), 2000);
      })
      .catch(error => {
        const message = error.response
          ? error.response.data.message
          : 'Error assigning subject. Please try again.';
        setErrorMessage(message);
        setSuccessMessage('');
        // Dismiss error alert after 2 seconds
        setTimeout(() => setErrorMessage(''), 2000);
      });
  };

  // Function to navigate to the previous page
  const handleBack = () => {
    navigate(-1);  // This will take the user to the previous page
  };

  return (
    <div style={styles.container}>
      {/* Back Arrow for navigating to previous page */}
      <div style={styles.arrow} onClick={handleBack}>
        ⬅️
      </div>

      <h3 style={styles.heading}>Assign Subject to Staff</h3>

      {successMessage && <Alert color="success">{successMessage}</Alert>}
      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit} style={styles.form}>
        <Row form>
          {/* Staff Member Input - First Column */}
          <Col md={6}>
            <FormGroup>
              <Label for="staffMember">Staff Member</Label>
              <Input
                type="select"
                id="staffMember"
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                required
              >
                <option value="">Select Staff Member</option>
                {staffMembers.map((staff) => (
                  <option key={staff.staffID} value={staff.staffID}>
                    {staff.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>

          {/* Subject Input - Second Column */}
          <Col md={6}>
            <FormGroup>
              <Label for="subject">Subject</Label>
              <Input
                type="select"
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.subject_code} value={subject.subject_code}>
                    {subject.subject_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit" block>
          Assign Subject
        </Button>
      </Form>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative', // Needed for positioning the arrow
  },
  arrow: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    fontSize: '15px',
    cursor: 'pointer',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#3347B0',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default AssignSubject;
