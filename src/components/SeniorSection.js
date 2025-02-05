import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SeniorSection = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]); // Store fetched students
  const [filteredStudents, setFilteredStudents] = useState([]); // Store filtered students based on search
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(''); // Message for errors or empty data
  const [searchQuery, setSearchQuery] = useState(''); // Search input value

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/students/senior')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          // Sort students by class
          const sortedStudents = response.data.sort((a, b) => a.class.localeCompare(b.class));
          setStudents(sortedStudents);
          setFilteredStudents(sortedStudents);
        } else {
          setMessage('No students found.');
        }
      })
      .catch((error) => {
        setMessage('Error fetching student list.');
        console.error('Error fetching student list:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRedirect = (path) => {
    navigate(path);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(query) || student.studentID.toString().includes(query)
    );
    setFilteredStudents(filtered);
  };

  const handlePrint = () => {
    window.print(); // Trigger the print functionality
  };

  return (
    <div style={styles.container}>
       <button 
        style={styles.backButton} 
        onClick={() => navigate(-1)} // This will go back to the previous page
      >
        ⬅️ Back
      </button>
      <h2 style={styles.heading}>Senior Section</h2>
   
      <div style={styles.section}>
        {loading ? (
          <p>Loading students...</p>
        ) : message ? (
          <p>{message}</p>
        ) : (
          <div>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search student by name or ID"
              value={searchQuery}
              onChange={handleSearch}
              style={styles.searchInput}
            />
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Student ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Class</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.studentID}>
                    <td style={styles.td}>{student.studentID}</td>
                    <td style={styles.td}>{student.name}</td>
                    <td style={styles.td}>{student.class}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Print Button at the Bottom */}
      <div style={styles.printButtonContainer}>
        <button onClick={handlePrint} style={styles.button}>Print list</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '1000px',
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
  subheading: {
    fontSize: '18px',
    color: '#555',
    textAlign: 'center',
    marginBottom: '30px',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    marginBottom: '20px',
  },
  backButton: {
    fontSize: '15px',
    color: '#4CAF50',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '10px',
    backgroundColor: '#3347B0',
    color: '#ffffff',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  button: {
    margin: '0 5px',
    padding: '5px 10px',
    backgroundColor: 'green',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  searchInput: {
    margin: '15px 0',
    padding: '10px',
    width: '100%',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  printButtonContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default SeniorSection;
