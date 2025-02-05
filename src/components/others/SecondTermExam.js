import React, { useState, useEffect } from 'react';   
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SecondTermExam = () => {
  const [modal, setModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const toggleModal = () => setModal(!modal);
  const [editModal, setEditModal] = useState(false); // For edit modal
  const [recordToEdit, setRecordToEdit] = useState(null); // Record being edited
  const [updatedData, setUpdatedData] = useState({}); // Store updated data 
  const [studentList, setStudentList] = useState([]); // List of students
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const navigate = useNavigate();
  // const [selectedName, setSelectedName] = useState('');
  // const [selectedClass, setSelectedClass] = useState('');
  const [subjects, setSubjects] = useState([]); // State for subjects

  const [student, setStudent] = useState({
    name: '',
    section: '',
    class: '',
    dob: '',
    guidanceContact: '',
  });
  const [examData, setExamData] = useState({
    subject: '',
    ca: '',
    exam: '',
  });
  const [examRecords, setExamRecords] = useState([]); // Store exam records
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // For loading state

 // Fetch subjects from the database
 const fetchSubjects = () => {
  axios
    .get('http://localhost:5000/api/subjects')
    .then((response) => {
      console.log('Fetched Subjects:', response.data); // Debug log
      setSubjects(response.data || []); // Set fetched subjects
    })
    .catch((error) => {
      console.error('Error fetching subjects:', error);
      setMessage('Error fetching subjects.');
    });
};

useEffect(() => {
  fetch('http://localhost:5000/api/getSubjects')
    .then(response => response.json())
    .then(data => setSubjects(data))
    .catch(error => console.error('Error fetching subjects:', error));
}, []);


 
  // Fetch exam records
  const fetchExamRecords = (studentId) => {
    if (!studentId) return;

    setLoading(true);
    axios
      .get(`http://localhost:5000/api/second-term/${encodeURIComponent(studentId)}`)
      .then((response) => {
        setExamRecords(response.data || []); // Store fetched records
        setLoading(false);
      })
      .catch((error) => {
        setMessage('NO Record.');
        // console.error('Error fetching exam records:', error);
        setLoading(false);
      });
  };

  // Fetch students
  const fetchStudents = () => {
    axios
      .get('http://localhost:5000/api/students/all')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setStudentList(response.data); // Set the student list
        } else {
          setMessage('No students found.');
        }
      })
      .catch((error) => {
        setMessage('Error fetching student list.');
        console.error('Error fetching student list:', error);
      });
  }; 
  // Handle student selection
  const handleStudentSelect = (e) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);

    if (studentId) {
      setLoading(true); // Start loading
      axios
        .get(`http://localhost:5000/api/students/${encodeURIComponent(studentId)}`)
        .then((response) => {
          const studentData = response.data;
          setStudent({
            name: studentData.name,
            section: studentData.section,
            class: studentData.class,
            dob: studentData.dob,
            guidanceContact: studentData.guidanceContact,
          });
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          setMessage('Error fetching student details.');
          setLoading(false); // Stop loading
        });

      fetchExamRecords(studentId); // Fetch exam records
    } else {
      setStudent({
        name: '',
        section: '',
        class: '',
        dob: '',
        guidanceContact: '',
      });
      setExamRecords([]); // Clear exam records when no student is selected
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in examData) {
      setExamData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle form submission
 // Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();

  // Input validation
  if (!examData.subject || !examData.ca || !examData.exam) {
    setMessage('Please fill all the exam fields.');
    return;
  }
  if (isNaN(examData.ca) || isNaN(examData.exam)) {
    setMessage('Continuous Assessment and Exam Marks should be numbers.');
    return;
  }
  if (examData.ca < 0 || examData.exam < 0) {
    setMessage('Marks cannot be negative.');
    return;
  }

  setLoading(true); // Show loading indicator

  // Send data to the backend
  axios
    .post('http://localhost:5000/api/add-second-term-result', {
      studentID: selectedStudentId, // The selected student ID
      studentName: student.name, // Include student name
      studentClass: student.class, // Include student class
      subject: examData.subject,
      caExam: examData.ca, // Map correctly to the backend field
      examMark: examData.exam, // Map correctly to the backend field
    })
    .then((response) => {
      setMessage('Exam added successfully!');
      setLoading(false);
      setExamData({ subject: '', ca: '', exam: '' }); // Clear exam data after submission
      fetchExamRecords(selectedStudentId); // Refresh exam records
    })
    .catch((error) => {
      setMessage('Error adding exam and ca .');
      setLoading(false);
      console.error('Error adding exam:', error);
    });
};

  const confirmDelete = (id) => {
    setRecordToDelete(id);
    toggleModal(); // Show the confirmation modal
  };
  const deleteExamRecord = (id) => { 
    if (!id) {
      setMessage("Invalid record ID.");
      return;
    }
    
    setLoading(true);
  
    axios
      .delete(`http://localhost:5000/api/delete-second/${id}`)
      .then((response) => {
        setMessage('Record deleted successfully!');
        setLoading(false);
        fetchExamRecords(selectedStudentId); // Refresh the exam records after deletion
        toggleModal()
      })
      .catch((error) => {
        setMessage('Error deleting record: ' + (error.response?.data?.message || error.message));
        setLoading(false);
        console.error('Error deleting record:', error);
      });
  };
  
  // Automatically dismiss the message after 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [message]);

  useEffect(() => {
    fetchStudents(); // Fetch students on initial render
  }, []);
  const toggleEditModal = () => setEditModal(!editModal);

  // Handle edit button click
  const handleEditClick = (record) => {
    setRecordToEdit(record);
    setUpdatedData(record); // Pre-fill form with current data
    toggleEditModal(); // Open edit modal
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for update
  const handleUpdateSubmit = () => {
    if (!recordToEdit || !updatedData) {
      setMessage('Invalid record or data.');
      return;
    }
    setLoading(true);

    axios
    .put(`http://localhost:5000/api/update-second/${recordToEdit.id}`, updatedData)
    .then((response) => {
      setMessage('Record updated successfully!');
      setLoading(false);
      toggleEditModal(); // Close modal after update
      fetchExamRecords(selectedStudentId); // Refresh records
    })
    .catch((error) => {
      setMessage('Error updating record.');
      setLoading(false);
    });
  
  };
  
  return (
    <div style={styles.container}>
       <button 
        style={styles.backButton} 
        onClick={() => navigate(-1)} // This will go back to the previous page
      >
        ⬅️ Back
      </button>
      <h2 style={styles.heading}>Add Second Term Examination</h2>
      {message && (
        <p
          style={{
            ...styles.message,
            ...(message.includes('success') ? styles.successMessage : styles.errorMessage),
          }}
        >
          {message}
        </p>
      )}

      <div style={styles.flexContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Select Student:</label>
            <select
              value={selectedStudentId}
              onChange={handleStudentSelect}
              style={styles.selectInput}
            >
              <option value="">Select a student</option>
              {studentList.length > 0 ? (
                studentList.map((s) => (
                  <option key={s.studentID} value={s.studentID}>
                    {s.name} (ID: {s.studentID})
                  </option>
                ))
              ) : (
                <option>No students available</option>
              )}
            </select>
          </div>
          

          {selectedStudentId && (
            <>
              <p>Add Exam to {student.name}</p>
              <div style={styles.formGroup}>
  <label style={styles.label}>Subject:</label>
  <select
    name="subject"
    value={examData.subject}
    onChange={handleChange}
    style={styles.input}
  >
    <option value="">Select Subject</option>
    {subjects.map(subject => (
    <option key={subject.subject_id} value={subject.subject_name}>
      {subject.subject_name}
    </option>
  )) 
}

  </select>
</div>

              <div style={styles.formGroup}>
                <label style={styles.label}>C A:</label>
                <input
                  type="number"
                  name="ca"
                  value={examData.ca}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Exam:</label>
                <input
                  type="number"
                  name="exam"
                  value={examData.exam}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? 'Adding...' : 'Add Exam'}
              </button>
            </>
          )}
        </form>

        <div style={styles.examRecordContainer}>
          <p style={styles.centerParagraph}>Exam Record</p>
          {examRecords.length > 0 && (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>SN</th>
                  <th style={styles.th}>Subject</th>
                  <th style={styles.th}>CA</th>
                  <th style={styles.th}>Exam</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {examRecords.map((record, index) => (
                  <tr key={record._id}>
                    <td>{index + 1}</td>
                    <td>{record.subject}</td>
                    <td>{record.caExam}</td>
                    <td>{record.examMark}</td>
                    <td>
                    <button
        style={styles.iconButton}
        onClick={() => handleEditClick(record)} // Pass record to edit
      >
        <FaEdit />
      </button>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Record</ModalHeader>
        <ModalBody>
          {recordToEdit ? (
            <form>
              <div style={styles.formGroup}>
              <label style={styles.label}>Subject:</label>
  <select
    name="subject"
    value={examData.subject}
    onChange={handleChange}
    style={styles.input}
  >
    <option value="">Select Subject</option>
    {subjects.map(subject => (
    <option key={subject.subject_id} value={subject.subject_name}>
      {subject.subject_name}
    </option>
  )) 
}

  </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>C A:</label>
                <input
                  type="number"
                  name="caExam"
                  value={updatedData.caExam || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Exam:</label>
                <input
                  type="number"
                  name="examMark"
                  value={updatedData.examMark || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
            </form>
          ) : (
            <p>No record selected for editing.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateSubmit} disabled={loading}>
            {loading ? 'Updating...' : '✔️'}
          </Button>{' '}
          <Button color="none" onClick={toggleEditModal}>
            ❌
          </Button>
        </ModalFooter>
      </Modal>
                      <button
                        style={styles.iconButton}
                       onClick={() => confirmDelete(record.id)} // Trigger delete action
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
          {/* Modal for confirmation */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this record? This action cannot be undone.
        </ModalBody>
        <ModalFooter>
  <Button color="danger" onClick={() => deleteExamRecord(recordToDelete)} disabled={loading}>
    {loading ? "Deleting..." : "✔️"}
  </Button>
  <Button color="none" onClick={toggleModal}>
    ❌
  </Button>
</ModalFooter>

      </Modal>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '1200px',
    margin: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    padding: '10px'
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  input: {
    padding: '6px', // Reduced padding for compactness
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  selectInput: {
    padding: '6px', // Reduced padding for compactness
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '2px',
    backgroundColor: '#f1f1f1',
  },
  th: {
    border: '1px solid #ccc',
    padding: '6px', // Reduced padding for compactness
    textAlign: 'left',
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  td: {
    border: '1px solid #ccc',
    padding: '3px', // Reduced padding for compactness
  },
  backButton: {
    fontSize: '15px',
    color: '#4CAF50',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
  },
  examRecordContainer: {
    width: '70%',
    marginTop: '20px',
    backgroundColor: '#e7e7e7',
    padding: '15px',
    borderRadius: '8px',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  message: {
    marginTop: '10px',
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
  },
  errorMessage: {
    color: 'red',
  },
  centerParagraph: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  iconButton: {
    background: 'none', 
    border: 'none', 
    cursor: 'pointer',
    padding: '5px', // Reduced padding for compactness
    marginRight: '8px',
    color: '#4CAF50',
  },
};

export default SecondTermExam;
