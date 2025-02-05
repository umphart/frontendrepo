import React, { useEffect, useState } from 'react';   
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'; // Import necessary components
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);  // Store staff list data
  const [modal, setModal] = useState(false);  // Modal visibility state
  const [selectedStaffID, setSelectedStaffID] = useState(null);  // Store selected staff ID for deletion
  const navigate = useNavigate();  // Initialize navigate hook

  // Fetch staff list data from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/getStaffMembers')
      .then((response) => response.json())
      .then((data) => setStaffList(data))
      .catch((error) => console.error('Error fetching staff data:', error));
  }, []);

  // Toggle modal visibility
  const toggleModal = () => setModal(!modal);

  // Handle deletion of the selected staff member
  const handleDeleteStaff = () => {
    if (selectedStaffID) {
      const encodedStaffID = encodeURIComponent(selectedStaffID);
  
      fetch(`http://localhost:5000/deleteStaff/${encodedStaffID}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete staff member');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Staff deleted successfully:', data);
          // Update the staffList to remove the deleted staff from the UI
          setStaffList(staffList.filter(staff => staff.staffID !== selectedStaffID));
          toggleModal();  // Close the modal after deletion
        })
        .catch((error) => {
          console.error('Error deleting staff member:', error);
          toggleModal();  // Close the modal on error
        });
    }
  };

  // Trigger the modal to confirm deletion
  const confirmDelete = (staffID) => {
    setSelectedStaffID(staffID);  // Set the staffID to be deleted
    toggleModal();  // Open the modal
  };

  return (
    <div style={styles.container}>
      {/* Arrow button for navigation */}
      <button 
        onClick={() => navigate(-1)} // Navigate to the previous page
        style={styles.arrowButton}
      >
        ⬅️
      </button>

      <h2 style={styles.heading}>Staff List</h2>
      <p style={styles.subheading}>Here is the list of all staff members.</p>

      <Table responsive style={styles.table}>
        <thead>
          <tr>
            <th style={styles.snColumn}>S/N</th>  {/* Serial Number Column with reduced width */}
            <th style={styles.tableHeader}>Staff ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Department</th>
            <th style={styles.tableHeader}>Phone</th>
            <th style={styles.tableHeader}>Subject</th>
            <th style={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, index) => (
            <tr key={staff.staffID} style={styles.tableRow}>
              <td style={styles.snColumn}>{index + 1}</td> {/* Serial Number with reduced width */}
              <td style={styles.tableCell}>{staff.staffID}</td>
              <td style={styles.tableCell}>{staff.name}</td>
              <td style={styles.tableCell}>{staff.department}</td>
              <td style={styles.tableCell}>{staff.phone}</td>
              {/* Display "No subject set" if no subject is assigned */}
              <td style={styles.tableCell}>{staff.subjects ? staff.subjects : 'No subject set'}</td>
              <td style={styles.tableCell}>
                <button
                  onClick={() => confirmDelete(staff.staffID)} // Show confirmation modal
                  style={styles.actionButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Confirmation Modal */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this staff member? This action cannot be undone.
        </ModalBody> {/* Correctly closing ModalBody here */}
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          <Button color="danger" onClick={handleDeleteStaff}>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

// Styles (including reduced width for S/N column)
const styles = {
  container: {
    padding: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative', // Ensure positioning for the arrow button
  },
  arrowButton: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    fontSize: '15px',
    padding: '0',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#007bff',
    textDecoration: 'none', // Remove underline from button text
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#3347B0',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '10px',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  tableRow: {
    transition: 'background-color 0.3s',
  },
  snColumn: {
    width: '50px',  // Reduced width for the Serial Number column
    textAlign: 'center',  // Center align the serial number
  },
  actionButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '10px',
  },
};

export default StaffList;
