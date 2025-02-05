import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const JuniorRecord = () => {
    const [terms, setTerms] = useState([
        { label: 'First Term', value: 'first_term' },
        { label: 'Second Term', value: 'second_term' },
        { label: 'Third Term', value: 'third_term' },
    ]);
    const [selectedTerm, setSelectedTerm] = useState('first_term'); // Default to 'first_term'
    const [examRecords, setExamRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedTerm) return;

        setLoading(true);
        setError(null);

        axios
            .get(`http://localhost:5000/api/exam-records/junior?term=${selectedTerm}`)
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

        const groupedArray = Object.values(grouped);

        // Sorting: first by className and then by studentID
        groupedArray.sort((a, b) => {
           
            if (a.className === 'JSS 1' && b.className !== 'JSS 1') return -1;
            if (b.className === 'JSS 1' && a.className !== 'JSS 1') return 1;
        
            // Sort alphabetically by className
            if (a.className !== b.className) {
                return a.className > b.className ? 1 : -1;
            }
        
            // Sort by studentID (ascending) if className is the same
            return a.studentID - b.studentID;
        });
        
        return groupedArray;
        
    };

    return (
        <div style={styles.container}>
            <div style={styles.headingContainer}>
                <h2 style={styles.heading}>Junior Exam Records</h2>
                <div style={styles.selectContainer}>
                    <label style={styles.selectLabel}>Select Term:</label>
                    <select
                        style={styles.select}
                        value={selectedTerm}
                        onChange={handleTermChange}
                    >
                        <option value="">Select Term</option>
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

            <table style={styles.table}>
    <thead>
        <tr>
            <th style={{ ...styles.tableHeader, width: '50px' }}>S/N</th>
            <th style={styles.tableHeader}>Student ID</th>
            <th style={styles.tableHeader}>Student Name</th>
            <th style={styles.tableHeader}>Class</th>
            <th style={styles.tableHeader}>Subjects and Grades</th>
        </tr>
    </thead>
    <tbody>
        {groupByStudent(examRecords).map((student, index) => (
            <tr key={student.studentID}>
                {/* Add Serial Number with Reduced Width */}
                <td style={{ ...styles.tableCell, width: '50px', textAlign: 'center' }}>
                    {index + 1}
                </td>
                <td style={styles.tableCell}>{student.studentID}</td>
                <td style={styles.studentNameCell}>{student.studentName}</td>
                <td style={styles.tableCell}>{student.className}</td>
                <td style={styles.subjectsCell}>
                    <table style={styles.innerTable}>
                        <thead>
                            <tr>
                                {student.subjects.map((subject, i) => (
                                    <th
                                        key={`${student.studentID}-subject-${i}`}
                                        style={styles.innerTableHeader}
                                    >
                                        {subject.subject}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {student.subjects.map((subject, i) => (
                                    <td
                                        key={`${student.studentID}-grade-${i}`}
                                        style={styles.innerTableCell}
                                    >
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
    );
};

const styles = {
    container: {
        padding: '30px',
        maxWidth: '100%',
        margin: '0 auto',
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Poppins', sans-serif",
    },
    headingContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    heading: {
        fontSize: '25px',
        fontWeight: 'bold',
        color: '#3347B0',
        margin: 0,
    },
    selectContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    selectLabel: {
        fontSize: '18px',
        marginRight: '10px',
    },
    select: {
        padding: '10px',
        fontSize: '16px',
        width: '200px',
        borderRadius: '6px',
        border: '1px solid #ddd',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        backgroundColor: '#3347B0',
        color: '#fff',
        padding: '12px',
        textAlign: 'left',
        fontSize: '16px',
    },
    tableCell: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        fontSize: '14px',
        color: '#555',
    },
    studentNameCell: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        fontSize: '14px',
        color: '#555',
        width: '160px',
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
        padding: '8px',
        textAlign: 'center',
        fontSize: '14px',
        borderBottom: '1px solid #ddd',
    },
    innerTableCell: {
        padding: '8px',
        textAlign: 'center',
        fontSize: '14px',
        borderBottom: '1px solid #ddd',
    },
    error: {
        color: 'red',
        fontSize: '16px',
        textAlign: 'center',
    },
};

export default JuniorRecord;
