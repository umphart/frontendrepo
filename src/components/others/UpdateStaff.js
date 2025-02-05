import React, { useState, useEffect } from 'react';  
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate for back functionality

const UpdateStaff = () => {
  const [staffList, setStaffList] = useState([]); // List of staff members
  const [selectedStaffID, setSelectedStaffID] = useState(''); // Selected staff ID
  const [staff, setStaff] = useState({
    staffID: '',
    name: '',
    department: '',
    phone: '',
    email: '',
    subject: '',
    gender: '',
    photo: null, // Photo field for uploading
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const [searchQuery, setSearchQuery] = useState(''); // For search functionality
  const navigate = useNavigate(); // Hook to navigate between pages

  // Fetch the staff list
  const fetchStaff = () => {
    axios.get('http://localhost:5000/api/getStaffMembers')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setStaffList(response.data); // Set the staff list
        } else {
          setMessage('No staff found.');
        }
      })
      .catch((error) => {
        setMessage('Error fetching staff list.');
        console.error('Error fetching staff list:', error);
      });
  };

  // UseEffect to fetch staff when the component is mounted
  useEffect(() => {
    fetchStaff();
  }, []);

  const handleStaffSelect = (e) => {
    const staffID = e.target.value;
    setSelectedStaffID(staffID);

    if (staffID) {
      setLoading(true); // Start loading
      axios.get(`http://localhost:5000/api/staff/${encodeURIComponent(staffID)}`)
      .then((response) => {
        const staffData = response.data;
        setStaff({
          staffID: staffData.staffID,
          name: staffData.name,
          department: staffData.department,
          phone: staffData.phone,
          email: staffData.email,
          subject: staffData.subject,
          gender: staffData.gender,
          photo: staffData.profilePhoto || null, // Load current photo if available
        });
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        setMessage('Error fetching staff details.');
        setLoading(false); // Stop loading
      });
    } else {
      setStaff({
        staffID: '',
        name: '',
        department: '',
        phone: '',
        email: '',
        subject: '',
        gender: '',
        photo: null,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setStaff((prevState) => ({
      ...prevState,
      photo: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedStaffID || !staff.name || !staff.department || !staff.phone || !staff.email || !staff.gender) {
      setMessage('Please provide all necessary details.');
      return;
    }

    setLoading(true); // Start loading

    // Prepare the FormData object to send both the text data and the file
    const formData = new FormData();
    formData.append('staffID', selectedStaffID);
    formData.append('name', staff.name);
    formData.append('department', staff.department);
    formData.append('phone', staff.phone);
    formData.append('email', staff.email);
    formData.append('subject', staff.subject);
    formData.append('gender', staff.gender);
    if (staff.photo) {
      formData.append('photo', staff.photo); // Append the photo file
    }

    axios.put(
      `http://localhost:5000/api/staff/update/${encodeURIComponent(selectedStaffID)}`,
      formData, 
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    .then(() => {
      setMessage('Staff updated successfully!');
      setLoading(false); // Stop loading
      setSelectedStaffID('');
      setStaff({
        staffID: '',
        name: '',
        department: '',
        phone: '',
        email: '',
        subject: '',
        gender: '',
        photo: null,
      });
    })
    .catch((error) => {
      setMessage('Error updating staff.');
      console.error('Error:', error);
      setLoading(false); // Stop loading
    });
  };

  // Filter staff based on search query (by name or ID)
  const filteredStaffList = staffList.filter((staff) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      staff.name.toLowerCase().includes(lowerQuery) ||
      staff.staffID.toString().includes(lowerQuery)
    );
  });

  return (
    <div style={styles.container}>
      {/* Back Arrow Button */}
      <button 
        style={styles.backButton} 
        onClick={() => navigate(-1)} // This will go back to the previous page
      >
        ⬅️ Back
      </button>

      <h2 style={styles.heading}>Update Staff</h2>
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
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Search Staff by Name or ID:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.input}
            placeholder="Search by name or ID"
          />
        </div>

        {/* Displaying filtered staff list */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Select Staff:</label>
          <select
            value={selectedStaffID}
            onChange={handleStaffSelect}
            style={styles.selectInput}
          >
            <option value="">Select a staff member</option>
            {filteredStaffList.length > 0 ? (
              filteredStaffList.map((s) => (
                <option key={s.staffID} value={s.staffID}>
                  Name: {s.name}, Staff ID: ({s.staffID})
                </option>
              ))
            ) : (
              <option>No staff members match your search</option>
            )}
          </select>
        </div>

        {selectedStaffID && (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={staff.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Department:</label>
              <input
                type="text"
                name="department"
                value={staff.department}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone:</label>
              <input
                type="text"
                name="phone"
                value={staff.phone}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={staff.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
         
            <div style={styles.formGroup}>
              <label style={styles.label}>Gender:</label>
              <input
                type="text"
                name="gender"
                value={staff.gender}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            {/* File Upload for Photo */}
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
              {loading ? 'Updating...' : 'Update Staff'}
            </button>
          </>
        )}
      </form>

      {/* Displaying the filtered list of staff members */}
      <h3 style={styles.subHeading}>Filtered Staff List</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Staff ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaffList.length > 0 ? (
            filteredStaffList.map((s) => (
              <tr key={s.staffID}>
                <td style={styles.td}>{s.staffID}</td>
                <td style={styles.td}>{s.name}</td>
                <td style={styles.td}>{s.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={styles.td}>No staff found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Styles for Back Button
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '50%',
    margin: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    fontSize: '15px',
    color: '#4CAF50',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
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
};

export default UpdateStaff;
