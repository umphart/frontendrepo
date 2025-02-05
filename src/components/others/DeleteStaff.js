import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DeleteStaff = () => {
  const [staffID, setStaffID] = useState('');
   const navigate = useNavigate();

  const handleInputChange = (e) => {
    setStaffID(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Encode the staffID to handle special characters
    const encodedStaffID = encodeURIComponent(staffID);
    
    // Send DELETE request to backend
    fetch(`/deleteStaff/${encodedStaffID}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error); // Handle error (e.g., staff not found)
        } else {
          alert(`Staff with ID ${staffID} deleted successfully!`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error deleting staff!');
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
      <h2 style={styles.heading}>Delete Staff</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Staff ID</label>
        <input 
          type="text" 
          style={styles.input} 
          value={staffID}
          onChange={handleInputChange}
          required 
        />
        <button type="submit" style={styles.button}>Delete Staff</button>
      </form>
    </div>
  );
};

// Reuse the styles object from AddStaff
const styles = {
    container: {
      padding: '30px',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Poppins', sans-serif",
    },
    heading: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#3347B0',
      textAlign: 'center',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    label: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#555',
    },
    input: {
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#3347B0',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#2a3b8f',
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

export default DeleteStaff;
