import React, { useState, useEffect } from 'react'; 
import { Table, Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Input, Nav, NavItem, NavLink, Spinner } from 'reactstrap';
import { FaPlus, FaEye, FaPrint } from 'react-icons/fa';
import axios from 'axios';
const StudentRecords = () => {
  const [studentRecords, setStudentRecords] = useState([]);
  const [activeClass, setActiveClass] = useState('Primary 1');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isViewExamModalOpen, setIsViewExamModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subject, setSubject] = useState('');
  const [caExam, setCaExam] = useState('');
  const [examMark, setExamMark] = useState('');
  const [total, setTotal] = useState('');
  const [exams, setExams] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [position , setPosition]= useState();

 useEffect(() => {
  const fetchStudents = async () => {
    const section = activeClass; // For example, 'Primary 1'
    try {
      console.log(`Fetching students for section: ${section}`);
      const response = await axios.get(`http://localhost:5000/api/students/${encodeURIComponent(section)}`);
      setStudentRecords(response.data); // Store the student records
    } catch (error) {
      console.error('Error fetching student records:', error);
    }
  };
  
  
  if (activeClass) {
    fetchStudents();  // Only fetch students if a section is selected
  }
}, [activeClass]);  // Runs when activeClass changes

  const toggleAddExamModal = () => {
    setIsAddExamModalOpen(!isAddExamModalOpen);
    setError('');
    setSubject('');
    setCaExam('');
    setExamMark('');
    setTotal('');
  };

  const handleAddExam = async (studentID) => {
    setIsLoading(true);
    if (!subject || isNaN(caExam) || isNaN(examMark)) {
      setError('Please provide valid inputs for all fields.');
      setIsLoading(false);
      return;
    }

    const examData = {
      studentID,
      subject,
      caExam: parseInt(caExam, 10),
      examMark: parseInt(examMark, 10),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/add-exam', examData);
      setSuccessMessage(response.data.message);
      toggleAddExamModal();
    } catch (error) {
      //console.error('Error adding exam:', error);
      setError('Failed to add exam record.');
    }

    setIsLoading(false);
  };

  const toggleViewExamModal = async (student) => {
    if (!student || !student.studentID) {
      setError('Student data is not valid or studentID is missing.');
      return;
    }

    setSelectedStudent(student);

    try {
      const encodedStudentID = encodeURIComponent(student.studentID);
      const response = await axios.get(`http://localhost:5000/api/view-exam/${encodedStudentID}`);

      setExams(response.data.exams);
      setTotalScore(response.data.totalScore);
      setAverageScore(response.data.averageScore);
      setPosition(response.data.position); // Set position from response
    } catch (error) {
      //console.error('Error fetching exam records:', error);
      setError('Failed to load exams.');
    }

    setIsViewExamModalOpen(!isViewExamModalOpen);
  };

  // Print Function
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="container">
      <h2>Student Records</h2>

      {successMessage && <Alert color="success">{successMessage}</Alert>}
      {error && <Alert color="danger">{error}</Alert>}

      {/* Class Tabs */}
      <Nav tabs>
        {['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'].map(className => (
          <NavItem key={className}>
            <NavLink
              className={activeClass === className ? 'active' : ''}
              onClick={() => setActiveClass(className)}
            >
              {className.toUpperCase()}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      {/* Student Records Table */}
      {studentRecords.length ? (
        <Table striped>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentRecords.map(student => (
              <tr key={student.studentID}>
                <td>{student.studentID}</td>
                <td>{student.name}</td>
                <td>
                  <Button color="primary" onClick={() => { setSelectedStudent(student); toggleAddExamModal(); }}>
                    <FaPlus /> Add Exam
                  </Button>
                  <Button color="secondary" onClick={() => toggleViewExamModal(student)}>
                    <FaEye /> View Exams
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert color="info">No students found for this class.</Alert>
      )}

      {/* Add Exam Modal */}
      <Modal isOpen={isAddExamModalOpen} toggle={toggleAddExamModal}>
        <ModalHeader toggle={toggleAddExamModal}>Add Exam for {selectedStudent?.name}</ModalHeader>
        <ModalBody>
          {error && <Alert color="danger">{error}</Alert>}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Subject</label>
              <Input 
                type="text" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="Subject" 
              />
            </div>
            <div className="form-group">
              <label>CA</label>
              <Input 
                type="text" 
                value={caExam}  
                onChange={(e) => setCaExam(e.target.value)} 
                placeholder="CA" 
              />
            </div>
            <div className="form-group">
              <label>Exam</label>
              <Input 
                type="text" 
                value={examMark}
                onChange={(e) => setExamMark(e.target.value)}
                placeholder="Exam" 
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleAddExamModal}>Cancel</Button>
          <Button color="primary" onClick={() => handleAddExam(selectedStudent.studentID)} disabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : 'Add Exam'}
          </Button>
        </ModalFooter>
      </Modal>

      {/* View Exam Modal */}
      <Modal isOpen={isViewExamModalOpen} toggle={toggleViewExamModal}>
        <ModalHeader toggle={toggleViewExamModal}><br>
        </br>PRIVATE COMPREHENSIVE COLLEGE <br/>
        <p> First Term Examination Result </p>
        {selectedStudent?.studentID} {selectedStudent?.name} 
        </ModalHeader>
        <ModalBody>
          <Table striped>
            <thead>
              <tr>
                <th>Subject</th>
                <th>CA</th>
                <th>Exam</th>
                <th>Total</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => {
                let remark = "";
                if (exam.total >= 0 && exam.total <= 40) remark = "Fail";
                else if (exam.total >= 41 && exam.total <= 49) remark = "Pass";
                else if (exam.total >= 50 && exam.total <= 65) remark = "Good";
                else if (exam.total >= 66 && exam.total <= 75) remark = "Very Good";
                else if (exam.total >= 76 && exam.total <= 100) remark = "Excellent";

                return (
                  <tr key={index}>
                    <td>{exam.subject}</td>
                    <td>{exam.caExam}</td>
                    <td>{exam.examMark}</td>
                    <td>{exam.total}</td>
                    <td>{remark}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div>
    
  <strong>Total Score:</strong> {totalScore}
  <br />
  <strong>Average Score:</strong> {averageScore}
  <br />
  <strong>Position in Class:</strong> {position}
</div>
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            <div><strong>Principal’s Signature:</strong> __________________________</div>
            <div><strong>Exam Officer’s Signature:</strong> ______________________</div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handlePrint}>
            <FaPrint /> Print
          </Button>
          <Button onClick={() => setIsViewExamModalOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default StudentRecords;
