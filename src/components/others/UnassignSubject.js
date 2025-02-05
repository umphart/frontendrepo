import React, { useState, useEffect } from 'react';  
import { Button, Form, FormGroup, Label, Input, Alert, Row, Col } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UnassignSubject = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch staff members
    axios.get('http://localhost:5000/api/getStaffMembers')
      .then(response => {
        setStaffMembers(response.data);
      })
      .catch(error => {
        console.error('Error fetching staff members:', error);
      });

    // Fetch subjects assigned to staff
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

    axios.post('http://localhost:5000/api/unassignSubject', data)
      .then(response => {
        setSuccessMessage('Subject unassigned successfully!');
        setErrorMessage('');
        // Dismiss success alert after 2 seconds
        setTimeout(() => setSuccessMessage(''), 2000);
      })
      .catch(error => {
        const message = error.response
          ? error.response.data.message
          : 'Error unassigning subject. Please try again.';
        setErrorMessage(message);
        setSuccessMessage('');
        // Dismiss error alert after 2 seconds
        setTimeout(() => setErrorMessage(''), 2000);
      });
  };

  return (
    <div style={styles.container}>
      {/* Arrow for navigating back to previous page */}
      <div style={styles.arrow} onClick={() => navigate(-1)}>
        ⬅️
      </div>

      <h3 style={styles.heading}>Unassign Subject from Staff</h3>

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
        <Button color="danger" type="submit" block>
          Unassign Subject
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
    color: '#B23C2A',
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

export default UnassignSubject;
