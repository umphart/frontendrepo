import React, { useState, useEffect } from 'react';  
import { Button, Form, FormGroup, Label, Input, Alert, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignSubject = () => {
  const navigate = useNavigate();
  const [staffMembers, setStaffMembers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [staffRes, subjectsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/getStaffMembers'),
          axios.get('http://localhost:5000/api/getSubjects')
        ]);
        setStaffMembers(staffRes.data);
        setSubjects(subjectsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedStaff || !selectedSubject) {
      setErrorMessage('Please select both a staff member and a subject.');
      setSuccessMessage('');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const selectedStaffName = staffMembers.find(staff => staff.staffID === selectedStaff)?.name || '';
      const selectedSubjectDetails = subjects.find(subject => subject.subject_code === selectedSubject);

      const data = {
        staffID: selectedStaff,
        staff_name: selectedStaffName,
        subject_code: selectedSubject,
        subject_name: selectedSubjectDetails?.subject_name || '',
        description: selectedSubjectDetails?.description || '',
      };

      const response = await axios.post('http://localhost:5000/api/assignSubject', data);
      
      setSuccessMessage(response.data.message || 'Subject assigned successfully!');
      
      // Trigger notification refresh in parent (dashboard)
      window.parent.postMessage({
        type: 'subject-assigned',
        staffID: selectedStaff,
        subjectName: data.subject_name
      }, '*');
      
      // Optionally reset form
      setTimeout(() => {
        setSelectedStaff('');
        setSelectedSubject('');
        setSuccessMessage('');
      }, 3000);
      
    } catch (error) {
      const message = error.response?.data?.message || 
                     'Error assigning subject. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.arrow} onClick={handleBack}>
        ⬅️ Back
      </div>

      <h3 style={styles.heading}>Assign Subject to Staff</h3>

      {isLoading ? (
        <div style={styles.loadingContainer}>
          <Spinner color="primary" />
          <p>Loading data...</p>
        </div>
      ) : (
        <>
          {successMessage && <Alert color="success">{successMessage}</Alert>}
          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleSubmit} style={styles.form}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="staffMember">Staff Member</Label>
                  <Input
                    type="select"
                    id="staffMember"
                    value={selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select Staff Member</option>
                    {staffMembers.map((staff) => (
                      <option key={staff.staffID} value={staff.staffID}>
                        {staff.name} ({staff.staffID})
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="subject">Subject</Label>
                  <Input
                    type="select"
                    id="subject"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject.subject_code} value={subject.subject_code}>
                        {subject.subject_name} ({subject.subject_code})
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Button 
              color="primary" 
              type="submit" 
              block
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" /> Assigning...
                </>
              ) : (
                'Assign Subject'
              )}
            </Button>
          </Form>
        </>
      )}
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
    position: 'relative',
  },
  arrow: {
    position: 'absolute',
    color: 'green',
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
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
};

export default AssignSubject;