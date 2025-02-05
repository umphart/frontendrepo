import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Nav, NavItem, NavLink, Button } from 'reactstrap';
import './styles.css';

const StudentsList = () => {
  const [students, setStudents] = useState([]);           // All students
  const [filteredStudents, setFilteredStudents] = useState([]);  // Students after search
  const [activeSection, setActiveSection] = useState('primary');
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);  // Fetch students once on component mount

  // Fetch the combined student list from all tables
  const fetchStudents = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/students/all')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setStudents(response.data);  // Set the student list
          setFilteredStudents(response.data);  // Initially, show all students
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

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSearchQuery('');  // Reset search query
    const filteredBySection = students.filter(student =>
      student.section.toLowerCase() === section.toLowerCase()
    );
    setFilteredStudents(filteredBySection);
  };
  

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const lowerQuery = query.toLowerCase();
      const filtered = students.filter(student =>
        student.name.toLowerCase().includes(lowerQuery) ||
        student.class.toLowerCase().includes(lowerQuery) ||
        student.section.toLowerCase().includes(lowerQuery)
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);  // Show all students if no search query
    }
  };

  const groupByClass = (studentsList) => {
    return studentsList.reduce((groups, student) => {
      if (!groups[student.class]) {
        groups[student.class] = [];
      }
      groups[student.class].push(student);
      return groups;
    }, {});
  };

  const handlePrint = () => {
    window.print();
  };

  const groupedStudents = groupByClass(filteredStudents);

  return (
    <div className="students-list">
      <Nav className="nav-tabs">
        <NavItem>
          <NavLink
            className={activeSection === 'primary' ? 'active' : ''}
            onClick={() => handleSectionChange('primary')}
          >
            PRIMARY SECTION
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeSection === 'junior' ? 'active' : ''}
            onClick={() => handleSectionChange('junior')}
          >
            JUNIOR SECTION
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeSection === 'senior' ? 'active' : ''}
            onClick={() => handleSectionChange('senior')}
          >
            SENIOR SECTION
          </NavLink>
        </NavItem>
      </Nav>

      <Input
        type="text"
        placeholder="Search students by name, class, or section..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="my-3"
      />

      <Button onClick={handlePrint} color="primary" className="mb-3">
        Print List
      </Button>

      {loading && <p>Loading students...</p>}

      {message && <p>{message}</p>}

      {Object.keys(groupedStudents).length > 0 ? (
        Object.entries(groupedStudents).map(([className, studentsInClass]) => (
          <div key={className}>
            <h3 className="class-header">{className.toUpperCase()}</h3>
            <Table hover>
              <thead>
                <tr>
                  <th>StudentID</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Age</th>
                  <th>Guidance Contact</th>
                </tr>
              </thead>
              <tbody>
                {studentsInClass.map(student => (
                  <tr key={student.studentID}>
                    <td>{student.studentID}</td>
                    <td>{student.name}</td>
                    <td>{student.class}</td>
                    <td>{student.section}</td>
                    <td>{student.dob}</td>
                    <td>{student.guidanceContact}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))
      ) : (
        <p>No students found for this section or search query.</p>
      )}
    </div>
  );
};

export default StudentsList;
