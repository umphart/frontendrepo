import React, { useState } from 'react';
import PrimaryRecord from '../PrimaryRecord';
import JuniorRecord from '../JuniorRecord';
import SeniorRecord from '../SenoirRecord';
import { useNavigate } from 'react-router-dom';

const RecordNavigator = () => {
  // State to manage which component is being displayed
  const [currentRecord, setCurrentRecord] = useState('primary');
  const navigate = useNavigate();

  // Handler to change the component based on user selection
  const handleNavigation = (recordType) => {
    setCurrentRecord(recordType);
  };

  // Internal styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    backButton: {
      fontSize: '15px',
      color: '#4CAF50',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',

      textAlign: 'left',
    },
    navigationButtons: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '20px',
    },
    navButton: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    navButtonHover: {
      backgroundColor: '#0056b3',
      transform: 'scale(1.05)',
    },
    activeButton: {
      backgroundColor: '#28a745', // Active button is green
    },
    recordContent: {
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <div style={styles.container}>
       <button 
        style={styles.backButton} 
        onClick={() => navigate(-1)} // This will go back to the previous page
      >
        ⬅️ Back
      </button>
      {/* Navigation Buttons */}
      <div style={styles.navigationButtons}>
        <button
          style={{
            ...styles.navButton,
            ...(currentRecord === 'primary' ? styles.activeButton : {}),
          }}
          onClick={() => handleNavigation('primary')}
        >
          Primary Record
        </button>
        <button
          style={{
            ...styles.navButton,
            ...(currentRecord === 'junior' ? styles.activeButton : {}),
          }}
          onClick={() => handleNavigation('junior')}
        >
          Junior Record
        </button>
        <button
          style={{
            ...styles.navButton,
            ...(currentRecord === 'senior' ? styles.activeButton : {}),
          }}
          onClick={() => handleNavigation('senior')}
        >
          Senior Record
        </button>
      </div>

      {/* Conditional Rendering of Components */}
      <div style={styles.recordContent}>
        {currentRecord === 'primary' && <PrimaryRecord />}
        {currentRecord === 'junior' && <JuniorRecord />}
        {currentRecord === 'senior' && <SeniorRecord />}
      </div>
    </div>
  );
};

export default RecordNavigator;
