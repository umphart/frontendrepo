import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Primary4 = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate

  useEffect(() => {
    axios.get('http://localhost:5000/api/primary4')
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching primary 4 students:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
       <button 
        style={styles.backButton} 
        onClick={() => navigate(-1)} // This will go back to the previous page
      >
        ⬅️ Back
      </button>
      <h2 style={styles.heading}>Primary 4 Class</h2>
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.tableHeader, width: '50px' }}>S/N</th>
              <th style={styles.tableHeader}>Student ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Section</th>
              <th style={styles.tableHeader}>Class</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.studentID}>
                {/* Add Serial Number */}
                <td style={{ ...styles.tableCell, textAlign: 'center', width: '50px' }}>
                  {index + 1}
                </td>
                <td style={styles.tableCell}>{student.studentID}</td>
                <td style={styles.tableCell}>{student.name}</td>
                <td style={styles.tableCell}>{student.section}</td>
                <td style={styles.tableCell}>{student.class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '30px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#3347B0',
    textAlign: 'center',
    marginBottom: '15px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#3347B0',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
    fontSize: '16px',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    fontSize: '14px',
    color: '#555',
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

export default Primary4;
