import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Alert } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import StudentsList from './StudentsList';  // Assuming you already have the StudentsList component

const SectionedStudentsList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch students from localStorage when the component mounts
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  // Filter students based on search term
  useEffect(() => {
    setFilteredStudents(
      students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, students]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Delete a student from the list
  const deleteStudent = (studentID) => {
    const updatedStudents = students.filter(student => student.studentID !== studentID);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  // Start editing a student by setting the editingStudent state
  const editStudent = (student) => {
    setEditingStudent(student);
  };

  // Save updated student details
  const saveUpdatedStudent = (updatedStudent) => {
    const updatedStudents = students.map(student =>
      student.studentID === updatedStudent.studentID ? updatedStudent : student
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setEditingStudent(null); // Exit edit mode
  };

  // Group students by their section
  const groupedStudents = students.reduce((acc, student) => {
    const { section } = student;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(student);
    return acc;
  }, {});

  return (
    <div className="container mt-5">
      <h2>Students List</h2>

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search by name, section, or class"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-3"
      />

      {/* Display Students for each section */}
      {Object.keys(groupedStudents).length > 0 ? (
        Object.keys(groupedStudents).map((section) => (
          <div key={section} className="mb-4">
            <h3>{section} Section</h3>
            <Table striped responsive hover>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Date of Birth</th>
                  <th>Guidance Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedStudents[section]
                  .filter((student) => {
                    return student.name.toLowerCase().includes(searchTerm.toLowerCase());
                  })
                  .map((student) => (
                    <tr key={student.studentID}>
                      <td>{student.studentID}</td>
                      <td>{student.name}</td>
                      <td>{student.class}</td>
                      <td>{new Date(student.dob).toLocaleDateString()}</td>
                      <td>{student.guidanceContact}</td>
                      <td>
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => editStudent(student)}
                          style={{ marginRight: '10px' }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => deleteStudent(student.studentID)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        ))
      ) : (
        <Alert color="info">No students available.</Alert>
      )}
    </div>
  );
};

export default SectionedStudentsList;
