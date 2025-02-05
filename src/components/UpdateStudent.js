import React, { useState, useEffect } from 'react';  
import axios from 'axios';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const UpdateStudent = () => {
  const navigate = useNavigate();  // Use navigate hook

  const [studentList, setStudentList] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [student, setStudent] = useState({
    name: '',
    section: '',
    class: '',
    dob: '',
    guidanceContact: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [photo, setPhoto] = useState(null); // For photo upload

  // Fetch all students
  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students/all')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setStudentList(response.data);
        } else {
          setMessage('No students found.');
        }
      })
      .catch((error) => {
        setMessage('Error fetching student list.');
        console.error('Error fetching student list:', error);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle student selection
  const handleStudentSelect = (e) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);

    if (studentId) {
      setLoading(true);
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
          setLoading(false);
        })
        .catch((error) => {
          setMessage('Error fetching student details.');
          setLoading(false);
        });
    } else {
      setStudent({
        name: '',
        section: '',
        class: '',
        dob: '',
        guidanceContact: '',
      });
    }
  };

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedStudentId || !student.section || !student.class || !student.dob || !student.guidanceContact) {
      setMessage('Please provide all necessary details.');
      return;
    }

    const formData = new FormData();
    formData.append('name', student.name);
    formData.append('section', student.section);
    formData.append('class', student.class);
    formData.append('dob', student.dob);
    formData.append('guidanceContact', student.guidanceContact);
    if (photo) {
      formData.append('photo', photo);
    }

    setLoading(true);
    axios.put(`http://localhost:5000/api/students/update/${encodeURIComponent(selectedStudentId)}`, formData)
    .then(() => {
      setMessage('Student updated successfully!');
      setLoading(false);
      setSelectedStudentId('');
      setStudent({
        name: '',
        section: '',
        class: '',
        dob: '',
        guidanceContact: '',
      });
      setPhoto(null);
    })
    .catch((error) => {
      setMessage('Error updating student.');
      console.error('Error:', error);
      setLoading(false);
    });
  };

  // Filter students based on search query
  const filteredStudentList = studentList.filter((student) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(lowerQuery) ||
      student.studentID.toString().includes(lowerQuery)
    );
  });

  // Dismiss the alert message after 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000); // 2 seconds delay

      // Clean up the timer on component unmount or when message changes
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Render class options based on selected section
  const renderClassOptions = () => { 
    switch (student.section) {
      case 'Primary':
        return (
          <>
            <option value="">Select Class</option>
            <option value="Primary 1">Primary 1</option>
            <option value="Primary 2">Primary 2</option>
            <option value="Primary 3">Primary 3</option>
            <option value="Primary 4">Primary 4</option>
            <option value="Primary 5">Primary 5</option>
          </>
        );
      case 'Junior':
        return (
          <>
            <option value="">Select Class</option>
            <option value="JSS 1">JSS 1</option>
            <option value="JSS 2">JSS 2</option>
            <option value="JSS 3">JSS 3</option>
          </>
        );
      case 'Senior':
        return (
          <>
            <option value="">Select Class</option>
            <option value="SS 1">SS 1</option>
            <option value="SS 2">SS 2</option>
            <option value="SS 3">SS 3</option>
          </>
        );
      default:
        return <option value="">Select Section First</option>;
    }
  };

  // Navigate back to previous page
  const handleBack = () => {
    navigate(-1);  // Go to the previous page
  };

  return (
    <div style={styles.container}>
     {/* Back Arrow Button */}
      <button 
        style={styles.backButton} 
        onClick={() => navigate(-1)} // This will go back to the previous page
      >
        ⬅️ Back
      </button>


      <h2 style={styles.heading}>Update Student</h2>
      {message && (
        <p 
          style={{
            ...styles.message, 
            ...(message.includes('success') ? styles.successMessage : styles.errorMessage)
          }}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
        <div style={styles.formGroup}>
          <label style={styles.label}>Search Student by Name or ID:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.input}
            placeholder="Search by name or ID"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Select Student:</label>
          <select
            value={selectedStudentId}
            onChange={handleStudentSelect}
            style={styles.selectInput}
          >
            <option value="">Select a student</option>
            {filteredStudentList.length > 0 ? (
              filteredStudentList.map((s) => (
                <option key={s.studentID} value={s.studentID}>
                  Name: {s.name}, Student ID: ({s.studentID})
                </option>
              ))
            ) : (
              <option>No students match your search</option>
            )}
          </select>
        </div>

        {selectedStudentId && (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Section:</label>
              <input
                type="text"
                name="section"
                value={student.section}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Class:</label>
              <select
                name="class"
                value={student.class}
                onChange={handleChange}
                required
                style={styles.selectInput}
              >
                {renderClassOptions()}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Age:</label>
              <input
                type="text"
                name="dob"
                value={student.dob}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Guidance Contact:</label>
              <input
                type="text"
                name="guidanceContact"
                value={student.guidanceContact}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Upload Photo:</label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Updating...' : 'Update Student'}
            </button>
          </>
        )}
      </form>

      <h3 style={styles.subHeading}>Filtered Student List</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Student ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Class</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudentList.length > 0 ? (
            filteredStudentList.map((s) => (
              <tr key={s.studentID}>
                <td style={styles.td}>{s.studentID}</td>
                <td style={styles.td}>{s.name}</td>
                <td style={styles.td}>{s.class}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={styles.td}>No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '20px',
    marginBottom: '15px',
    textAlign: 'center',
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
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  selectInput: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd',
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

export default UpdateStudent;
