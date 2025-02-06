import React, { useState, useEffect } from 'react';   
import { Button, Form, FormGroup, Label, Input, Alert, Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddSubject = () => {
  const navigate = useNavigate(); // Use navigate hook

  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectDescription, setSubjectDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [modal, setModal] = useState(false); // Modal visibility state
  const [subjectToDelete, setSubjectToDelete] = useState(null); // Subject to delete

  useEffect(() => {
    // Fetch subjects list when the component mounts
    axios
      .get('http://localhost:5000/api/getSubjects')
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  }, []);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');  // Clear success message
        setErrorMessage('');    // Clear error message
      }, 2000);

      return () => clearTimeout(timer); // Cleanup the timeout on component unmount
    }
  }, [successMessage, errorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Form validation
    if (!subjectName || !subjectCode) {
      setErrorMessage('Subject name and code are required.');
      setSuccessMessage('');
      return;
    }
  
    // Prepare the subject data to be sent to the backend
    const subjectData = {
      subject_name: subjectName,
      subject_code: subjectCode,
      description: subjectDescription, // Optional field
    };

    if (isEditMode) {
      // If in edit mode, update the subject
      axios.put(`http://localhost:5000/api/updateSubject/${editingSubject.subject_code}`, {
        subjectName: subjectName,
        subjectDescription: subjectDescription,  // Optional field
      })
      .then((response) => {
        setSubjectName('');
        setSubjectCode('');
        setSubjectDescription('');
        setErrorMessage('');
        setSuccessMessage('Subject updated successfully!');
        setIsEditMode(false);
        setEditingSubject(null);
        fetchSubjects();
      })
      .catch((error) => {
        console.error('Error updating subject:', error);
        setErrorMessage('Error updating subject. Please try again.');
        setSuccessMessage('');
      });
    } else {
      // If not in edit mode, add a new subject
      axios
        .post('http://localhost:5000/api/addSubject', subjectData)
        .then((response) => {
          setSubjectName('');
          setSubjectCode('');
          setSubjectDescription('');
          setErrorMessage('');
          setSuccessMessage('Subject added successfully!');
          fetchSubjects();
        })
        .catch((error) => {
          console.error('Error adding subject:', error);
          setErrorMessage('Error adding subject. Please try again.');
          setSuccessMessage('');
        });
    }
  };

  // Fetch the list of subjects after adding, updating, or deleting a subject
  const fetchSubjects = () => {
    axios
      .get('http://localhost:5000/api/getSubjects')
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching updated subjects:', error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/deleteSubject/${subjectToDelete.subject_code}`)
      .then((response) => {
        setSuccessMessage('Subject deleted successfully!');
        setErrorMessage('');
        setModal(false); // Close the modal
        fetchSubjects();
      })
      .catch((error) => {
        console.error('Error deleting subject:', error);
        setErrorMessage('Error deleting subject. Please try again.');
        setSuccessMessage('');
        setModal(false); // Close the modal
      });
  };

  const toggleModal = (subject = null) => {
    setModal(!modal);
    setSubjectToDelete(subject);
  };

  const handleEdit = (subject) => {
    setSubjectName(subject.subject_name);
    setSubjectCode(subject.subject_code);
    setSubjectDescription(subject.description);
    setIsEditMode(true);
    setEditingSubject(subject);
  };

  // Function to navigate to the previous page
  const handleBack = () => {
    navigate(-1); // This will take the user to the previous page
  };

  return (
    <div style={styles.container}>
      {/* Back Arrow for navigating to previous page */}
      <div style={styles.arrow} onClick={handleBack}>
        ⬅️ Back
      </div>

      <h3 style={styles.heading}>{isEditMode ? 'Edit Subject' : 'Add New Subject'}</h3>

      {successMessage && <Alert color="success">{successMessage}</Alert>}
      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit} style={styles.form}>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="subjectName">Subject Name</Label>
              <Input
                type="text"
                id="subjectName"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Enter subject"
                required
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="subjectCode">Subject Code</Label>
              <Input
                type="text"
                id="subjectCode"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                placeholder="subject code"
                required
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="subjectDescription">Subject Description</Label>
              <Input
                type="text"
                id="subjectDescription"
                value={subjectDescription}
                onChange={(e) => setSubjectDescription(e.target.value)}
                placeholder="subject description"
              />
            </FormGroup>
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <FormGroup>
              <Button color="primary" type="submit" block>
                {isEditMode ? 'Update Subject' : 'Add Subject'}
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>

      <div style={styles.subjectList}>
        <h4>All Subjects</h4>
        {subjects.length > 0 ? (
          <Table striped>
            <thead>
              <tr style={styles.tableHeader}>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Subject Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.subject_code}>
                  <td>{subject.subject_name}</td>
                  <td>{subject.subject_code}</td>
                  <td>{subject.description}</td>
                  <td>
                    <Button
                      color="warning"
                      onClick={() => handleEdit(subject)}
                      className="mr-2"
                      style={{ ...styles.iconButton, marginRight: '10px' }}
                    >
                      <FaEdit style={{ color: 'blue' }} />
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => toggleModal(subject)}
                      style={styles.iconButton}
                    >
                      <FaTrash style={{ color: 'red' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No subjects available.</p>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this subject?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          <Button color="danger" onClick={handleDelete}>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
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
  subjectList: {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    fontSize: '15px',
    fontWeight: 'bold',
  },
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0',
    marginRight: '10px',
  },
};

export default AddSubject;
