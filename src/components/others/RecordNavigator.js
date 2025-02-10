import React, { useState } from 'react';
import PrimaryRecord from '../PrimaryRecord';
import JuniorRecord from '../JuniorRecord';
import SeniorRecord from '../SenoirRecord';
import { useNavigate } from 'react-router-dom';

const RecordNavigator = () => {
  const [currentRecord, setCurrentRecord] = useState('primary');
  const navigate = useNavigate();

  const handleNavigation = (recordType) => {
    setCurrentRecord(recordType);
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '90%',
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
      justifyContent: 'center',
      flexWrap: 'wrap', // Ensures buttons wrap properly on small screens
      gap: '10px',
      marginBottom: '20px',
    },
    navButton: {
      padding: '10px 15px',
      fontSize: '14px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      minWidth: '120px', // Ensures a minimum width for readability
      textAlign: 'center',
    },
    activeButton: {
      backgroundColor: '#28a745',
    },
    recordContent: {
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    // Media Query for responsiveness
    '@media (max-width: 600px)': {
      container: {
        padding: '10px',
      },
      navigationButtons: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      navButton: {
        width: '100%', // Buttons will take full width on small screens
        fontSize: '16px',
        padding: '12px',
      },
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>⬅️ Back</button>

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

      {/* Display Selected Component */}
      <div style={styles.recordContent}>
        {currentRecord === 'primary' && <PrimaryRecord />}
        {currentRecord === 'junior' && <JuniorRecord />}
        {currentRecord === 'senior' && <SeniorRecord />}
      </div>
    </div>
  );
};

export default RecordNavigator;
