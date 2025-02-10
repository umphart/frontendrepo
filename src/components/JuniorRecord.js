
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JuniorRecord = () => {
    const [terms, setTerms] = useState([
        { label: 'First Term', value: 'first_term' },
        { label: 'Second Term', value: 'second_term' },
        { label: 'Third Term', value: 'third_term' },
    ]);

    const [selectedTerm, setSelectedTerm] = useState('first_term');
    const [examRecords, setExamRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
                if (!selectedTerm) return;
        
                setLoading(true);
                setError(null);
        
                axios.get(`http://localhost:5000/api/exam-records/junior?term=${selectedTerm}`)
                    .then((response) => {
                        setExamRecords(response.data);
                        setLoading(false);
                    })
                    .catch(() => {
                        setError('No exam records yet. Please try again later.');
                        setLoading(false);
                    });
            }, [selectedTerm]);

    const handleTermChange = (e) => {
        setSelectedTerm(e.target.value);
    };

    const groupByStudent = (records) => {
        const grouped = {};

        records.forEach((record) => {
            const { studentID, studentName, className, subject, grade } = record;

            if (!grouped[studentID]) {
                grouped[studentID] = {
                    studentID,
                    studentName,
                    className,
                    subjects: [],
                };
            }

            grouped[studentID].subjects.push({ subject, grade });
        });

        return Object.values(grouped).sort((a, b) => a.className.localeCompare(b.className) || a.studentID - b.studentID);
    };

    return (
        <div style={styles.container}>
            <div style={styles.headingContainer}>
                <h2 style={styles.heading}>Junior Exam Records</h2>
                <div style={styles.selectContainer}>
                    <label style={styles.selectLabel}>Select Term:</label>
                    <select style={styles.select} value={selectedTerm} onChange={handleTermChange}>
                        {terms.map((term) => (
                            <option key={term.value} value={term.value}>
                                {term.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && <p>Loading exam records...</p>}
            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={{ ...styles.tableHeader, width: '50px' }}>S/N</th>
                            <th style={styles.tableHeader}>Student ID</th>
                            <th style={styles.tableHeader}>Student Name</th>
                            <th style={styles.tableHeader}>Class</th>
                            <th style={styles.tableHeader}>Subjects & Grades</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupByStudent(examRecords).map((student, index) => (
                            <tr key={student.studentID}>
                                <td style={{ ...styles.tableCell, width: '50px', textAlign: 'center' }}>{index + 1}</td>
                                <td style={styles.tableCell}>{student.studentID}</td>
                                <td style={styles.studentNameCell}>{student.studentName}</td>
                                <td style={styles.tableCell}>{student.className}</td>
                                <td style={styles.subjectsCell}>
                                    <table style={styles.innerTable}>
                                        <thead>
                                            <tr>
                                                {student.subjects.map((subject, i) => (
                                                    <th key={`${student.studentID}-subject-${i}`} style={styles.innerTableHeader}>
                                                        {subject.subject}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {student.subjects.map((subject, i) => (
                                                    <td key={`${student.studentID}-grade-${i}`} style={styles.innerTableCell}>
                                                        {subject.grade}
                                                    </td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '100%',
        margin: '0 auto',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Poppins', sans-serif",
    },
    headingContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '15px',
    },
    heading: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#3347B0',
        marginBottom: '10px',
    },
    selectContainer: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    selectLabel: {
        fontSize: '16px',
        marginRight: '10px',
    },
    select: {
        padding: '8px',
        fontSize: '14px',
        borderRadius: '6px',
        border: '1px solid #ddd',
    },
    tableWrapper: {
        overflowX: 'auto',
        width: '100%',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        minWidth: '600px',
    },
    tableHeader: {
        backgroundColor: '#3347B0',
        color: '#fff',
        padding: '10px',
        textAlign: 'left',
        fontSize: '14px',
    },
    tableCell: {
        padding: '8px',
        borderBottom: '1px solid #ddd',
        fontSize: '14px',
        color: '#555',
    },
    studentNameCell: {
        padding: '8px',
        borderBottom: '1px solid #ddd',
        fontSize: '14px',
        color: '#555',
        minWidth: '140px',
    },
    subjectsCell: {
        padding: '0',
        border: 'none',
    },
    innerTable: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    innerTableHeader: {
        backgroundColor: '#f0f0f0',
        color: '#333',
        padding: '6px',
        textAlign: 'center',
        fontSize: '13px',
        borderBottom: '1px solid #ddd',
    },
    innerTableCell: {
        padding: '6px',
        textAlign: 'center',
        fontSize: '13px',
        borderBottom: '1px solid #ddd',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        textAlign: 'center',
    },
    '@media (max-width: 768px)': {
        headingContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
        tableHeader: {
            fontSize: '12px',
            padding: '8px',
        },
        tableCell: {
            fontSize: '12px',
            padding: '6px',
        },
        select: {
            width: '100%',
        },
    },
};

export default JuniorRecord;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const JuniorRecord = () => {
//     const [terms, setTerms] = useState([
//         { label: 'First Term', value: 'first_term' },
//         { label: 'Second Term', value: 'second_term' },
//         { label: 'Third Term', value: 'third_term' },
//     ]);
//     const [selectedTerm, setSelectedTerm] = useState('first_term');
//     const [examRecords, setExamRecords] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!selectedTerm) return;

//         setLoading(true);
//         setError(null);

//         axios.get(`http://localhost:5000/api/exam-records/junior?term=${selectedTerm}`)
//             .then((response) => {
//                 setExamRecords(response.data);
//                 setLoading(false);
//             })
//             .catch(() => {
//                 setError('No exam records yet. Please try again later.');
//                 setLoading(false);
//             });
//     }, [selectedTerm]);

//     const handleTermChange = (e) => {
//         setSelectedTerm(e.target.value);
//     };

//     const groupByStudent = (records) => {
//         const grouped = {};
//         records.forEach((record) => {
//             const { studentID, studentName, className, subject, grade } = record;
//             if (!grouped[studentID]) {
//                 grouped[studentID] = { studentID, studentName, className, subjects: [] };
//             }
//             grouped[studentID].subjects.push({ subject, grade });
//         });
//         return Object.values(grouped).sort((a, b) => a.className.localeCompare(b.className) || a.studentID - b.studentID);
//     };

//     return (
//         <div className="container">
//             <div className="header">
//                 <h2>Junior Exam Records</h2>
//                 <div className="term-selector">
//                     <label>Select Term:</label>
//                     <select value={selectedTerm} onChange={handleTermChange}>
//                         {terms.map((term) => (
//                             <option key={term.value} value={term.value}>{term.label}</option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             {loading && <p>Loading exam records...</p>}
//             {error && <p className="error">{error}</p>}

//             <div className="table-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>S/N</th>
//                             <th>Student ID</th>
//                             <th>Student Name</th>
//                             <th>Class</th>
//                             <th>Subjects & Grades</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {groupByStudent(examRecords).map((student, index) => (
//                             <tr key={student.studentID}>
//                                 <td>{index + 1}</td>
//                                 <td>{student.studentID}</td>
//                                 <td>{student.studentName}</td>
//                                 <td>{student.className}</td>
//                                 <td>
//                                     <table className="inner-table">
//                                         <thead>
//                                             <tr>
//                                                 {student.subjects.map((subject, i) => (
//                                                     <th key={i}>{subject.subject}</th>
//                                                 ))}
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr>
//                                                 {student.subjects.map((subject, i) => (
//                                                     <td key={i}>{subject.grade}</td>
//                                                 ))}
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <style jsx>{`
//                 .container {
//                     padding: 20px;
//                     max-width: 100%;
//                     margin: 0 auto;
//                     background-color: #f9fafb;
//                     border-radius: 8px;
//                     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//                 }
//                 .header {
//                     display: flex;
//                     justify-content: space-between;
//                     align-items: center;
//                     flex-wrap: wrap;
//                 }
//                 .term-selector label {
//                     margin-right: 10px;
//                 }
//                 .table-container {
//                     overflow-x: auto;
//                 }
//                 table {
//                     width: 100%;
//                     border-collapse: collapse;
//                     min-width: 600px;
//                 }
//                 th, td {
//                     padding: 8px;
//                     border-bottom: 1px solid #ddd;
//                     text-align: left;
//                 }
//                 th {
//                     background-color: #3347B0;
//                     color: white;
//                 }
//                 .inner-table {
//                     width: 100%;
//                     border-collapse: collapse;
//                 }
//                 .error {
//                     color: red;
//                     text-align: center;
//                 }
//                 @media (max-width: 768px) {
//                     .header {
//                         flex-direction: column;
//                         text-align: center;
//                     }
//                     .table-container {
//                         overflow-x: auto;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default JuniorRecord;
