// WithdrawStudent.js
import React, { useState } from 'react';

const WithdrawStudent = () => {
  const [studentId, setStudentId] = useState('');

  const handleChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleWithdraw = () => {
    // Handle student withdrawal (e.g., API call)
    console.log(`Student with ID ${studentId} withdrawn`);
  };

  return (
    <div style={styles.container}>
     <h2 style={styles.heading}>Withdraw Student</h2>
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <button onClick={handleWithdraw} style={styles.button}>Withdraw Student</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#4e73df',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    width: '100%',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default WithdrawStudent;
