import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const StudentResults = () => {
  const [term, setTerm] = useState("first_term");
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [examRecords, setExamRecords] = useState([]);
  const [studentRank, setStudentRank] = useState(null);

  // Function to get ordinal suffix
  const getOrdinalSuffix = (number) => {
    const j = number % 10,
          k = number % 100;
    if (j === 1 && k !== 11) {
      return number + 'st';
    }
    if (j === 2 && k !== 12) {
      return number + 'nd';
    }
    if (j === 3 && k !== 13) {
      return number + 'rd';
    }
    return number + 'th';
  };

  const handleResultRequest = async () => {
    try {
      const encodedStudentId = encodeURIComponent(studentId);
  
      const response = await axios.get(`http://localhost:5000/api/exam-results/${encodedStudentId}`, {
        params: { term },
      });
  
      // Log response to verify the data
      console.log(response.data); // Log the entire response object to check for studentResults and studentRank
  
      if (response.data.studentResults.length > 0) {
        setIsError(false);
        setExamRecords(response.data.studentResults);
        setStudentRank(response.data.studentRank);
        setShowConfirmModal(true);
      } else {
        setMessage("No results found for this student.");
        setIsError(true);
      }
    } catch (error) {
      setMessage("No results found for this student.");
      setIsError(true);
    }
  };
  

  const handleResults = async () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const calculateTotal = (records) => {
    return records.reduce((total, record) => total + (record.total || 0), 0);
  };

  const calculateAverage = (records) => {
    const totalMarks = calculateTotal(records);
    return records.length > 0 ? (totalMarks / records.length).toFixed(2) : 0;
  };

  const handlePrint = () => {
    window.print();
  };

  const getTermName = (term) => {
    switch (term) {
      case "first_term":
        return "FIRST TERM EXAMINATION";
      case "second_term":
        return "SECOND TERM EXAMINATION";
      case "third_term":
        return "THIRD TERM EXAMINATION";
      default:
        return term;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Check Student Result</h2>

      {message && (
        <p
          style={{
            ...styles.message,
            color: isError ? "red" : "green",
          }}
        >
          {message}
        </p>
      )}

      <div style={styles.formGroup}>
        <label style={styles.label}>Select Term:</label>
        <select
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={styles.input}
        >
          <option value="first_term">First Term</option>
          <option value="second_term">Second Term</option>
          <option value="third_term">Third Term</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Student ID:</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID"
          style={styles.input}
        />
      </div>

      <div style={styles.buttonContainer}>
        <Button
          color="primary"
          onClick={handleResultRequest}
          style={styles.button}
        >
          View Student Result
        </Button>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirmModal} toggle={() => setShowConfirmModal(false)} style={styles.modal}>
        <ModalHeader toggle={() => setShowConfirmModal(false)} style={styles.modalHeader}>
          
        </ModalHeader>
        <ModalBody style={styles.modalBody}>
          <p>{message}</p>
          {examRecords.length > 0 ? (
            <div>
              <div style={styles.centeredHeader}>
                <p style={styles.schoolName}>UMAR PHAROUQ INTERNATIONAL COLLEGE</p>
              </div>

              <div style={styles.centeredHeader}>
                <p style={styles.termTitle}>{getTermName(term)}</p>
              </div>

              <div style={styles.centeredHeader}>
                <p style={styles.studentInfoItem}>
                  <strong>REG NO:</strong> {examRecords[0].studentID || "Not Available"}{" "}
                  <strong>Name:</strong> {examRecords[0].studentName}{" "}
                  <strong>Class:</strong> {examRecords[0].studentClass}{" "}
                  <strong>Position:</strong> __
                </p>
              </div>

              {/* Render Exam Records Table */}
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Subject</th>
                    <th style={styles.tableHeader}>CA</th>
                    <th style={styles.tableHeader}>Exam</th>
                    <th style={styles.tableHeader}>Total</th>
                    <th style={styles.tableHeader}>Grade</th>
                    <th style={styles.tableHeader}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {examRecords.map((record, index) => (
                    <tr key={index}>
                      <td style={styles.tableCell}>{record.subject}</td>
                      <td style={styles.tableCell}>{record.caExam}</td>
                      <td style={styles.tableCell}>{record.examMark}</td>
                      <td style={styles.tableCell}>{record.total}</td>
                      <td style={styles.tableCell}>{record.grade}</td>
                      <td style={styles.tableCell}>{record.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={styles.centeredFooter}>
                <p><strong>Total Marks:</strong> {calculateTotal(examRecords)} <strong>Average Marks:</strong> {calculateAverage(examRecords)}</p>
              </div>

              <div style={styles.signatures}>
                <div style={styles.signature}>
                  <p><strong>Principal's Sign</strong></p>
                  <hr style={{ width: '70%' }} />
                </div>
                <div style={styles.signature}>
                  <p><strong>Exam Officer's Sign</strong></p>
                  <hr style={{ width: '70%' }} />
                </div>
              </div>

              <Button onClick={handlePrint} style={styles.printButton}>Print Result</Button>
            </div>
          ) : (
            <p>No exam records available for this student.</p>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    padding: "20px",
    maxWidth: "300px", // Increase container width
    margin: "50px auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#4e73df",
    fontSize: "24px",
    fontWeight: "bold",
  },
  tableHeader: {
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    borderBottom: '2px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  table: {
    width: '100%', // Ensure the table takes full width of the modal
    borderCollapse: 'collapse',
  },
  centeredHeader: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  termTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  schoolName: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#4e73df',
  },
  studentInfoItem: {
    marginBottom: '10px',
  },
  studentDetails: {
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: "10px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  printButton: {
    backgroundColor: "#4e73df",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
    borderRadius: "5px",
  },
  message: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  centeredFooter: {
    textAlign: 'center',
    marginTop: '20px',
  },
  signatures: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  signature: {
    textAlign: 'center',
    width: '45%',
  },
  modal: {
    maxWidth: "650px", 
    margin: "30px auto", 
  },
  modalHeader: {
    backgroundColor: "#4e73df",
    color: "#fff",
    padding: "10px 20px",
  },
  modalBody: {
    padding: "20px",
  },
};

export default StudentResults;
