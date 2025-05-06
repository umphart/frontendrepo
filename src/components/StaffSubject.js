import React, { useEffect, useState } from 'react';
import { Alert } from 'reactstrap';

const StaffSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);


  // Fetch subjects
  useEffect(() => {
    const staffID = localStorage.getItem('staffID');

    if (!staffID) {
      setError('No staff ID found in local storage.');
      setLoading(false);
      return;
    }

    const encodedID = encodeURIComponent(staffID);

    fetch(`http://localhost:5000/api/staffSubjects/${encodedID}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch subjects');
        return res.json();
      })
      .then((data) => {
        setSubjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching subjects:', err);
        setError('Unable to load subjects. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleBack = () => {
    window.history.back(); // Or useNavigate from react-router
  };

  return (
    <div style={styles.container}>
      <div style={styles.arrow} onClick={handleBack}>
        ⬅️ Back
      </div>

      <h2 style={styles.heading}>Subject Management</h2>
      <p style={styles.subheading}>Here are the subjects assigned to you this term.</p>

      <div style={styles.contentBox}>
        {/* Notifications block */}
        {notifications.map((note, index) => (
          <Alert key={index} color="info">
            📢 {note.message}
          </Alert>
        ))}

        {loading ? (
          <p style={styles.info}>Loading subjects...</p>
        ) : error ? (
          <p style={{ ...styles.info, color: 'red' }}>{error}</p>
        ) : subjects.length === 0 ? (
          <p style={styles.info}>No subjects assigned yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Subject Code</th>
                <th style={styles.th}>Subject Name</th>
                <th style={styles.th}>Description</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{subject.subject_code}</td>
                  <td style={styles.td}>{subject.subjectName}</td>
                  <td style={styles.td}>{subject.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    padding: '40px',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#f9fafb',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    color: 'green',
    top: '20px',
    left: '20px',
    fontSize: '15px',
    cursor: 'pointer',
  },
  heading: {
    fontSize: '32px',
    color: '#3347B0',
    marginBottom: '10px',
  },
  subheading: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '30px',
  },
  contentBox: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  info: {
    fontSize: '16px',
    color: '#777',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#3347B0',
    color: 'white',
    padding: '10px',
    border: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
};

export default StaffSubject;
