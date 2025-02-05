import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Nav, NavItem, NavLink } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const JuniorStudent = () => {
  const [students, setStudents] = useState([]);  // State to hold student data
  const [activeSection, setActiveSection] = useState('Primary');  // Default section is 'Primary'
  const [editModal, setEditModal] = useState(false);  // For handling edit modal state
  const [deleteModal, setDeleteModal] = useState(false);  // For handling delete modal state
  const [selectedStudent, setSelectedStudent] = useState(null);  // For storing selected student
  const [updatedName, setUpdatedName] = useState('');
  const [updatedClass, setUpdatedClass] = useState('');
  const [updatedDob, setUpdatedDob] = useState('');
  const [updatedGuidanceContact, setUpdatedGuidanceContact] = useState('');
  const navigate = useNavigate();

  // Fetch students data based on active section
  useEffect(() => {
    const fetchStudents = async () => {
      if (!activeSection) return; // Skip if no section is selected yet

      try {
        // Make an API call based on the active section (Primary, Junior, Senior)
        const response = await axios.get(`http://localhost:5000/api/students/${activeSection}`);
        setStudents(response.data);  // Set fetched data to students state
      } catch (err) {
        console.error('There was an error fetching the student data:', err);
      }
    };

    fetchStudents();
  }, [activeSection]); // Runs only when activeSection changes

  // Handle section change from navigation
  const handleSectionChange = (section) => {
    setActiveSection(section);  // Change to 'Primary', 'Junior', or 'Senior'
  };

  // Open modal to edit student data
  const toggleEditModal = (student) => {
    setSelectedStudent(student);
    setUpdatedName(student.name);
    setUpdatedClass(student.class);
    setUpdatedDob(student.dob);
    setUpdatedGuidanceContact(student.guidanceContact);
    setEditModal(!editModal);
  };

  // Open modal to delete student data
  const toggleDeleteModal = (student) => {
    setSelectedStudent(student);
    setDeleteModal(!deleteModal);
  };

  // Handle student update
  const handleUpdateStudent = () => {
    const updatedStudent = {
      ...selectedStudent,
      name: updatedName,
      class: updatedClass,
      dob: updatedDob,
      guidanceContact: updatedGuidanceContact,
    };

    axios.put(`http://localhost:5000/api/students/${selectedStudent.studentID}`, updatedStudent)
      .then(response => {
        setStudents(students.map(student => student.studentID === selectedStudent.studentID ? updatedStudent : student));
        setEditModal(false);  // Close the edit modal
      })
      .catch(error => console.error('Error updating student:', error));
  };

  // Handle student deletion
  const handleDeleteStudent = () => {
    axios.delete(`http://localhost:5000/api/students/${selectedStudent.studentID}`)
      .then(response => {
        setStudents(students.filter(student => student.studentID !== selectedStudent.studentID));
        setDeleteModal(false);  // Close the delete modal
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  return (
    <div className="students-list">
   <button 
        style={styles.backButton} 
        onClick={() => navigate(-1)} // This will go back to the previous page
      >
        ⬅️ Back
      </button>
      {/* Only display the table if students have been fetched */}
      {students.length > 0 ? (
        <Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>DOB</th>
              <th>Guidance Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.studentID}>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.section}</td>
                <td>{student.dob}</td>
                <td>{student.guidanceContact}</td>
                <td>
                  <Button color="warning" onClick={() => toggleEditModal(student)}><FaEdit /></Button>
                  <Button color="danger" onClick={() => toggleDeleteModal(student)}><FaTrash /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No students found for this section</p>  // Optional message if no students are fetched
      )}

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={() => setEditModal(false)}>
        <ModalHeader toggle={() => setEditModal(false)}>Edit Student</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input value={updatedName} onChange={e => setUpdatedName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="class">Class</Label>
            <Input value={updatedClass} onChange={e => setUpdatedClass(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="dob">Date of Birth</Label>
            <Input type="date" value={updatedDob} onChange={e => setUpdatedDob(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="guidanceContact">Guidance Contact</Label>
            <Input value={updatedGuidanceContact} onChange={e => setUpdatedGuidanceContact(e.target.value)} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateStudent}>Save</Button>
          <Button color="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
        <ModalHeader toggle={() => setDeleteModal(false)}>Delete Student</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this student?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteStudent}>Delete</Button>
          <Button color="secondary" onClick={() => setDeleteModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default JuniorStudent;
