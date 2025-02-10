import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateStaff = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [staff, setStaff] = useState({
    name: '',
    department: '',
    phone: '',
    email: '',
    gender: '',
    profilePhoto: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:5000/api/getStaffMembers')
      .then((response) => setStaffList(response.data))
      .catch(() => setMessage('Error fetching staff list.'));
  }, []);

  const handleStaffSelect = (e) => {
    const staffId = e.target.value;
    setSelectedStaffId(staffId);

    if (staffId) {
      setLoading(true);
      axios.get(`http://localhost:5000/api/staff/${encodeURIComponent(staffId)}`)
        .then(({ data }) => setStaff(data))
        .catch(() => setMessage('Error fetching staff details.'))
        .finally(() => setLoading(false));
    } else {
      setStaff({ name: '', department: '', phone: '', email: '', gender: '', profilePhoto: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStaffId || !staff.department || !staff.phone || !staff.email || !staff.gender) {
      setMessage('Please provide all necessary details.');
      return;
    }

    const formData = new FormData();
    Object.keys(staff).forEach((key) => formData.append(key, staff[key]));
    if (photo) formData.append('photo', photo);

    setLoading(true);
    axios.put(
       `http://localhost:5000/api/staff/update/${encodeURIComponent(selectedStaffId)}`,
          formData, 
             { headers: { 'Content-Type': 'multipart/form-data' } }
           )
      .then(() => setMessage('Staff updated successfully!'))
      .catch(() => setMessage('Error updating staff.'))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000); // 2 seconds
  
      return () => clearTimeout(timer); // Cleanup function
    }
  }, [message]);
  
  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>⬅️ Back</button>
      <h2 style={styles.heading}>Update Staff</h2>
      {message && <p style={{ ...styles.message, ...(message.includes('success') ? styles.successMessage : styles.errorMessage) }}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
        <div style={styles.formGroup}>
          <label style={styles.label}>Search Staff by Name or ID:</label>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.input} placeholder="Search by name or ID" />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Select Staff:</label>
          <select value={selectedStaffId} onChange={handleStaffSelect} style={styles.selectInput}>
            <option value="">Select a staff</option>
            {staffList.map((s) => <option key={s.staffID} value={s.staffID}>{s.name} ({s.staffID})</option>)}
          </select>
        </div>
        {selectedStaffId && (
          <>
            <div style={styles.formGroup}><label style={styles.label}>Name:</label><input type="text" name="name" value={staff.name} onChange={handleChange} required style={styles.input} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Department:</label><input type="text" name="department" value={staff.department} onChange={handleChange} required style={styles.input} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Phone:</label><input type="text" name="phone" value={staff.phone} onChange={handleChange} required style={styles.input} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Email:</label><input type="email" name="email" value={staff.email} onChange={handleChange} required style={styles.input} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Gender:</label><select name="gender" value={staff.gender} onChange={handleChange} required style={styles.selectInput}><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option></select></div>
            <div style={styles.formGroup}><label style={styles.label}>Upload Photo:</label><input type="file" name="photo" onChange={handleFileChange} style={styles.input} /></div>
            <button type="submit" style={styles.button} disabled={loading}>{loading ? 'Updating...' : 'Update Staff'}</button>
          </>
        )}
      </form>

      <h3 style={styles.listHeading}>Staff List</h3>
<table style={styles.table}>
  <thead>
    <tr>
      <th style={styles.th}>Name</th>
      <th style={styles.th}>Department</th>
      <th style={styles.th}>Phone</th>
      <th style={styles.th}>Email</th>
    </tr>
  </thead>
  <tbody>
    {staffList.map((s) => (
      <tr key={s.staffID}>
        <td style={styles.td}>{s.name}</td>
        <td style={styles.td}>{s.department}</td>
        <td style={styles.td}>{s.phone}</td>
        <td style={styles.td}>{s.email}</td>
      </tr>
    ))}
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
    maxWidth: '50%',
    margin: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    border: '1px solid #ddd', // Add border to the table
  },
  th: {
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left',
    border: '1px solid #ddd', // Add border to headers
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd', // Add border to table cells
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
