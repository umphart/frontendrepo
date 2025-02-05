import React, { useState } from 'react';

const TransferStudent = () => {
  const [studentId, setStudentId] = useState('');
  const [newClass, setNewClass] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'studentId') {
      setStudentId(value);
    } else if (name === 'newClass') {
      setNewClass(value);
    }
  };

  const handleTransfer = () => {
    // Handle student transfer (e.g., API call)
    console.log(`Student with ID ${studentId} transferred to class ${newClass}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Transfer Student</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>Student ID:</label>
        <input
          type="text"
          name="studentId"
          value={studentId}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>New Class:</label>
        <input
          type="text"
          name="newClass"
          value={newClass}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <button onClick={handleTransfer} style={styles.button}>Transfer Student</button>
    </div>
  );
};
const styles = {
  container: {
    padding: '30px',
    maxWidth: '600px',
    margin: '50px auto',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#4e73df',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    color: 'green',
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    color: '#6c757d',
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '5px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#4e73df',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
};


// Applying hover/focus effects
const inputStyleWithFocus = (isFocused) => ({
  ...styles.input,
  ...(isFocused ? styles.inputFocus : {}),
});

const buttonStyleWithHover = (isHovered) => ({
  ...styles.button,
  ...(isHovered ? styles.buttonHover : {}),
});

export default TransferStudent;
