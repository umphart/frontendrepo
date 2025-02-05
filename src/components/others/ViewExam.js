import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewExam = () => {
  const [studentList, setStudentList] = useState([]); // List of students
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [student, setStudent] = useState({
    name: '',
    section: '',
    class: '',
    dob: '',
    guidanceContact: '',
  });
  const [examResults, setExamResults] = useState([]); // Store exam results for the selected student
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // Navigate hook

  // Fetch the combined student list from all tables
  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students/all')
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

  // Fetch exam results when a student is selected
  const fetchExamResults = (studentId) => {
    axios.get(`http://localhost:5000/api/exams/results/${studentId}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setExamResults(response.data);
        } else {
          setMessage('No exam results found for this student.');
        }
      })
      .catch((error) => {
        setMessage('Error fetching exam results.');
        console.error('Error fetching exam results:', error);
      });
  };

  // UseEffect to fetch students when the component is mounted
  useEffect(() => {
    fetchStudents();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleStudentSelect = (e) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);

    if (studentId) {
      setLoading(true); // Start loading
      // Fetch student details
      axios.get(`http://localhost:5000/api/students/${encodeURIComponent(studentId)}`)
        .then((response) => {
          const studentData = response.data;
          setStudent({
            name: studentData.name,
            section: studentData.section,
            class: studentData.class,
            dob: studentData.dob,
            guidanceContact: studentData.guidanceContact,
          });
          fetchExamResults(studentId); // Fetch the exam results for the selected student
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
      setExamResults([]); // Clear previous exam results
    }
  };

  const handlePrint = (e) => {
    e.preventDefault(); // Prevent any unintended form submission

    // Trigger print dialog for the page
    window.print();
  };

  return (
    <div style={styles.container}>
      {/* Arrow for navigating back to previous page */}
      <div style={styles.arrow} onClick={() => navigate(-1)}>
        ⬅️
      </div>

      <h2 style={styles.heading}>View and Print Examination</h2>
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
      <div style={styles.form}>
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
            <p>UMAR-PHAROUQ INTERNATIONAL COLLEGE</p>
            <p>First Term Examination Result</p>
            <p>Student Name: {student.name} | Class: {student.class}</p>
            <div style={styles.formGroup}>
              {examResults.length > 0 ? (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>CA</th>
                      <th>Exam</th>
                      <th>Total</th>
                      <th>Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examResults.map((result, index) => (
                      <tr key={index}>
                        <td>{result.subject}</td>
                        <td>{result.ca}</td>
                        <td>{result.exam}</td>
                        <td>{result.total}</td>
                        <td>{result.remark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No exam results available for this student.</p>
              )}
            </div>
            <p>Principal Sign: ___________________</p>
            <p>Examination Officer Sign: ___________________</p>

            <button 
              type="button" 
              style={styles.button} 
              onClick={handlePrint} 
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Print Result'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
  selectInput: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
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

export default ViewExam;
