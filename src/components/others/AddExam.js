import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const AddExam = () => {
  const [studentList, setStudentList] = useState([]); // List of students
  const [selectedStudentId, setSelectedStudentId] = useState('');
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
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // For loading state

  // Fetch the combined student list from all tables
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

  // Fetch the student details when a student is selected
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
    } else {
      setStudent({
        name: '',
        section: '',
        class: '',
        dob: '',
        guidanceContact: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in examData) {
      setExamData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input Validation
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
      .post('http://localhost:5000/api/add-first-term-result', {
        studentID: selectedStudentId, // The selected student ID
        subject: examData.subject,
        caExam: examData.ca, // Map correctly to the backend field
        examMark: examData.exam, // Map correctly to the backend field
      })
      .then((response) => {
        setMessage('Exam added successfully!');
        setLoading(false);
        setExamData({ subject: '', ca: '', exam: '' }); // Clear exam data after submission
      })
      .catch((error) => {
        setMessage('Error adding exam.');
        setLoading(false);
        console.error('Error adding exam:', error);
      });
  };

  // Fetch students on initial render
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Examination</h2>
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
              <label style={styles.label}>Subject:</label><br />
              <select
                name="subject"
                value={examData.subject}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
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
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '600px',
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
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  selectInput: {
    padding: '8px',
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
  message: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  successMessage: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  errorMessage: {
    backgroundColor: '#FF0000',
    color: 'white',
  },
};

export default AddExam;
