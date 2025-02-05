import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SecondTerm = () => {
  const [studentList, setStudentList] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [studentRank, setStudentRank] = useState(null);  
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    section: '',
    class: '',
    dob: '',
    guidanceContact: '',
    results: [],
    average: 0,
    totalMarks: 0, // Added totalMarks to the state
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to get the correct ordinal suffix for ranks (1st, 2nd, 3rd, etc.)
  const getOrdinalSuffix = (num) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) {
      return num + "st";
    }
    if (j === 2 && k !== 12) {
      return num + "nd";
    }
    if (j === 3 && k !== 13) {
      return num + "rd";
    }
    return num + "th";
  };

  // Fetch students from the backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students/all');
      if (response.data && response.data.length > 0) {
        setStudentList(response.data);
        //console.log('Student List:', response.data); // Log the student list
      } else {
        setMessage('No students found.');
        setTimeout(() => setMessage(''), 2000); // Dismiss message after 2 seconds
      }
    } catch (error) {
      setMessage('Error fetching student list.');
      console.error('Error fetching student list:', error);
      setTimeout(() => setMessage(''), 2000); // Dismiss message after 2 seconds
    }
  };
  const fetchStudentDetails = async (studentId) => {
    setLoading(true); // Start loading
    try {
      const studentData = studentList.find((s) => s.studentID === studentId) || {};
      const response = await axios.get(`http://localhost:5000/api/second-term-results/${encodeURIComponent(studentId)}`);
      const data = response.data;
  
      if (data && data.results.length > 0) {
        setStudent({
          ...studentData,
          results: data.results,
          totalMarks: data.totalMarks, // Set totalMarks
          average: data.average.toFixed(2), // Round to 2 decimal places
        });
  
        // Set rank and show message
        setStudentRank(data.studentRank.rank); // Set student rank here
        setMessage(''); // Clear message
      } else {
        setMessage('No results found for this student.');
        setStudent({ ...studentData, results: [], totalMarks: 0, average: 0 });
        setStudentRank(null);
        setTimeout(() => setMessage(''), 2000); // Dismiss message after 2 seconds
      }
    } catch (error) {
      setMessage('Error fetching student details.');
      console.error('No results found for this student:', error);
      setTimeout(() => setMessage(''), 2000); // Dismiss message after 2 seconds
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle student selection from dropdown
  const handleStudentSelect = (e) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);

    if (studentId) {
      fetchStudentDetails(studentId);
    } else {
      setStudent({
        name: '',
        section: '',
        class: '',
        dob: '',
        guidanceContact: '',
        results: [],
        totalMarks: 0, // Reset totalMarks
        average: 0,
      });
    }
  };

  // Handle the form submission for printing the results
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudentId) {
      setMessage('Please select a student to print results.');
      setTimeout(() => setMessage(''), 2000); 
      return;
    }
    window.print();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={styles.container}>
       <button 
        style={styles.backButton} 
        onClick={() => navigate(-1)} // This will go back to the previous page
      >
        ⬅️ Back
      </button>
      {message && (
        <p
          style={{
            ...styles.message,
            ...(message.includes('Error') ? styles.errorMessage : styles.successMessage),
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
    <p style={styles.schoolName}>UMAR-PHAROUQ INTERNATIONAL COLLEGE</p>
    <p style={styles.termTitle}>Second Term Examination Result</p>
    <div style={styles.studentDetails}>
      <p>
        <strong>Student Name:</strong> {student.name || 'N/A'} |{' '}
        <strong>Class:</strong> {student.class || 'N/A'} |{' '}
        <strong>Position:</strong> {studentRank ? getOrdinalSuffix(studentRank) : 'N/A'}
      </p>
    </div>

    <div style={styles.formGroup}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>S/N</th>
            <th style={styles.th}>SUBJECT</th>
            <th style={styles.th}>CA</th>
            <th style={styles.th}>EXAM</th>
            <th style={styles.th}>TOTAL</th>
            <th style={styles.th}>GRADE</th>
            <th style={styles.th}>REMARK</th>
          </tr>
        </thead>
        <tbody>
          {student.results.length > 0 ? (
            student.results.map((result, index) => (
              <tr key={index} style={styles.tableRow}>
                <td>{index + 1}</td>
                <td>{result.subject}</td>
                <td>{result.caExam}</td>
                <td>{result.examMark}</td>
                <td>{result.total}</td>
                <td>{result.grade}</td>
                <td>{result.remarks}</td>
              </tr>
            ))
          ) : (
            <tr style={styles.tableRow}>
              <td colSpan="6">No results available</td>
            </tr>
          )}
          {/* Total and Average in the same row */}
          <tr style={styles.totalAverageRow}>
            <td colSpan="6" style={styles.averageCell}>Total Marks: {student.totalMarks} {' '} Average: {student.average}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>Principal Sign: ___________________</p>
    <p>Examination Officer Sign: ___________________</p>

    <button type="submit" style={styles.button} disabled={loading}>
      {loading ? 'Loading...' : 'Print Result'}
    </button>
  </>
)}

      </form>
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
  schoolName: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  termTitle: {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  studentDetails: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    border: '1px solid #ccc',
  },
  th: {
    backgroundColor: '#4CAF50', // Set background color for table header
    color: 'white',
    padding: '8px',
    fontWeight: 'bold', // Make header text bold for consistency
  },
  td: {
    padding: '8px', // Add padding to match the header
    textAlign: 'center', // Ensure the table data is centered
    borderBottom: '1px solid #ddd', // Add border for data rows
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  totalAverageRow: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  averageCell: {
    textAlign: 'right',
    paddingRight: '50px',
    fontWeight: 'bold',
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
  backButton: {
    fontSize: '15px',
    color: '#4CAF50',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
   
    textAlign: 'left',
  },
};

export default SecondTerm;
