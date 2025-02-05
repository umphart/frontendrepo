import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaList, FaSignOutAlt, FaTachometerAlt , FaBars, FaUserCircle, FaClipboardList, FaChargingStation, FaChild, FaBookReader, FaGraduationCap } from 'react-icons/fa'; // Importing icons
import { FaUserPlus, FaUserEdit, FaExchangeAlt, FaUserTimes, FaTrashAlt } from 'react-icons/fa'; 

const ClassSection = () => {
  const [totalStudentsPrimary1, setTotalStudentsPrimary1] = useState(null);  // State for Primary 1 students
  const [totalStudentsPrimary2, setTotalStudentsPrimary2] = useState(null);  // State for Primary 2 students
  const [totalStudentsPrimary3, setTotalStudentsPrimary3] = useState(null);  // State for Primary 1 students
  const [totalStudentsPrimary4, setTotalStudentsPrimary4] = useState(null);  // State for Primary 2 students
  const [totalStudentsPrimary5, setTotalStudentsPrimary5] = useState(null);  // State for Primary 1 students
  const [totalStudentsJunior1, setTotalStudentsJunior1] = useState(null);  // State for Primary 2 students
  const [totalStudentsJunior2, setTotalStudentsJunior2] = useState(null);  // State for Primary 2 students
  const [totalStudentsJunior3, setTotalStudentsJunior3] = useState(null);  // State for Primary 2 students
  const [totalStudentsSenior1, setTotalStudentsSenior1] = useState(null);  // State for Primary 2 students
  const [totalStudentsSenior2, setTotalStudentsSenior2] = useState(null);  // State for Primary 2 students
  const [totalStudentsSenior3, setTotalStudentsSenior3] = useState(null);  // State for Primary 2 students

  const navigate = useNavigate();

  // Fetch data for Primary 1 students
  useEffect(() => {
    fetch('http://localhost:5000/api/primary1/count')
      .then(response => response.json())
      .then(data => {
        setTotalStudentsPrimary1(data.totalStudents);  // Set Primary 1 students count
      })
      .catch(error => {
        console.error('Error fetching Primary 1 students:', error);
      });
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  // Fetch data for Primary 2 students
  useEffect(() => {
    fetch('http://localhost:5000/api/primary2/count')
      .then(response => response.json())
      .then(data => {
        setTotalStudentsPrimary2(data.totalStudents);  // Set Primary 2 students count
      })
      .catch(error => {
        console.error('Error fetching Primary 2 students:', error);
      });
  }, []);  // Empty dependency array ensures this runs once when the component mounts
 // Fetch data for Primary 2 students
 useEffect(() => {
  fetch('http://localhost:5000/api/primary3/count')
    .then(response => response.json())
    .then(data => {
      setTotalStudentsPrimary3(data.totalStudents);  // Set Primary 2 students count
    })
    .catch(error => {
      console.error('Error fetching Primary 3 students:', error);
    });
}, []);  // Empty dependency array ensures this runs once when the component mounts
useEffect(() => {
  fetch('http://localhost:5000/api/primary4/count')
    .then(response => response.json())
    .then(data => {
      setTotalStudentsPrimary4(data.totalStudents);  // Set Primary 2 students count
    })
    .catch(error => {
      console.error('Error fetching Primary 3 students:', error);
    });
}, []);  // Empty dependency array ensures this runs once when the component mounts
useEffect(() => {
  fetch('http://localhost:5000/api/primary5/count')
    .then(response => response.json())
    .then(data => {
      setTotalStudentsPrimary5(data.totalStudents);  // Set Primary 2 students count
    })
    .catch(error => {
      console.error('Error fetching Primary 3 students:', error);
    });
}, []);  // Empty dependency array ensures this runs once when the component mounts
useEffect(() => {
  fetch('http://localhost:5000/api/senior1/count')
    .then(response => response.json())
    .then(data => {
      setTotalStudentsSenior1(data.totalStudents);  // Set Primary 2 students count
    })
    .catch(error => {
      console.error('Error fetching Primary 3 students:', error);
    });
}, []);  // Empty dependency array ensures this runs once when the component mounts

useEffect(() => {
  fetch('http://localhost:5000/api/senior2/count')
    .then(response => response.json())
    .then(data => {
      setTotalStudentsSenior2(data.totalStudents);  // Set Primary 2 students count
    })
    .catch(error => {
      console.error('Error fetching  students:', error);
    });
}, []);  // Empty dependency array ensures this runs once when the component mounts
useEffect(() => {
  fetch('http://localhost:5000/api/senior3/count')
    .then(response => response.json())
    .then(data => {
      setTotalStudentsSenior3(data.totalStudents);  // Set Primary 2 students count
    })
    .catch(error => {
      console.error('Error  students:', error);
    });
}, []);  // Empty dependency array ensures this runs once when the component mounts
useEffect(() => {
  fetch('http://localhost:5000/api/junior1/count')
    .then(response => response.json())
    .then(data => {
      setTotalStudentsJunior1(data.totalStudents);  // Set Primary 2 students count
    })
    .catch(error => {
      console.error('Error  students:', error);
    });
}, []);  // Empty dependency array ensures this runs once when the component mounts
useEffect(() => {
  fetch('http://localhost:5000/api/junior2/count')
    .then(response => response.json())
    .then(data => {
      setTotalStudentsJunior2(data.totalStudents);  // Set Primary 2 students count
    })
    .catch(error => {
      console.error('Error  students:', error);
    });
}, []);  // Empty dependency array ensures this runs once when the component mounts
useEffect(() => {
  fetch('http://localhost:5000/api/junior3/count')
    .then(response => response.json())
    .then(data => {
      setTotalStudentsJunior3(data.totalStudents);  // Set Primary 2 students count
    })
    .catch(error => {
      console.error('Error  students:', error);
    });
}, []);  // Empty dependency array ensures this runs once when the component mounts




  const handleRedirect = (path) => {
    navigate(path);
  };
  return (
    <div style={styles.container}>
            <button 
        style={styles.backButton} 
        onClick={() => navigate(-1)} // This will go back to the previous page
      >
        ⬅️ Back
      </button>
    <h2 style={styles.heading}>Classes Section</h2>
    <div style={styles.section}>
      <div style={styles.iconList}>
     {/* Primary 1 */}
     <div style={styles.iconItem} onClick={() => handleRedirect('/admin/primary1')}>
            <FaChild size={40} style={styles.icon} />
            <p style={styles.iconText}>Primary 1</p>
            {totalStudentsPrimary1 !== null && (  // Display totalStudentsPrimary1 only after it's fetched
              <p style={styles.studentCount}>{totalStudentsPrimary1} students</p>
            )}
          </div>
    {/* Primary 2 */}
    <div style={styles.iconItem} onClick={() => handleRedirect('/admin/primary2')}>
            <FaChild size={40} style={styles.icon} />
            <p style={styles.iconText}>Primary 2</p>
            {totalStudentsPrimary2 !== null && (  // Display totalStudentsPrimary2 only after it's fetched
              <p style={styles.studentCount}>{totalStudentsPrimary2} students</p>
            )}
          </div>
        {/* Primary 1 */}
     <div style={styles.iconItem} onClick={() => handleRedirect('/admin/primary3')}>
            <FaChild size={40} style={styles.icon} />
            <p style={styles.iconText}>Primary 3</p>
            {totalStudentsPrimary3 !== null && (  // Display totalStudentsPrimary1 only after it's fetched
              <p style={styles.studentCount}>{totalStudentsPrimary3} students</p>
            )}
          </div>
    {/* Primary 2 */}
    <div style={styles.iconItem} onClick={() => handleRedirect('/admin/primary4')}>
            <FaChild size={40} style={styles.icon} />
            <p style={styles.iconText}>Primary 4</p>
            {totalStudentsPrimary4 !== null && (  // Display totalStudentsPrimary2 only after it's fetched
              <p style={styles.studentCount}>{totalStudentsPrimary4} students</p>
            )}
          </div>
 {/* Primary 1 */}
 <div style={styles.iconItem} onClick={() => handleRedirect('/admin/primary5')}>
            <FaChild size={40} style={styles.icon} />
            <p style={styles.iconText}>Primary 5</p>
            {totalStudentsPrimary5 !== null && (  // Display totalStudentsPrimary1 only after it's fetched
              <p style={styles.studentCount}>{totalStudentsPrimary5} students</p>
            )}
          </div>
    {/* Primary 2 */}
    <div style={styles.iconItem} onClick={() => handleRedirect('/admin/junior1')}>
            <FaChild size={40} style={styles.icon} />
            <p style={styles.iconText}>Junior 1</p>
            {totalStudentsJunior1 !== null && (  // Display totalStudentsPrimary2 only after it's fetched
              <p style={styles.studentCount}>{totalStudentsJunior1} students</p>
            )}
          </div>
         {/* Primary 1 */}
     <div style={styles.iconItem} onClick={() => handleRedirect('/admin/junior2')}>
            <FaChild size={40} style={styles.icon} />
            <p style={styles.iconText}>Junior 2</p>
            {totalStudentsJunior2 !== null && (  // Display totalStudentsPrimary1 only after it's fetched
              <p style={styles.studentCount}>{totalStudentsJunior2} students</p>
            )}
          </div>
    {/* Primary 2 */}
    <div style={styles.iconItem} onClick={() => handleRedirect('/admin/junior3')}>
            <FaChild size={40} style={styles.icon} />
            <p style={styles.iconText}>Junior 3</p>
            {totalStudentsJunior3 !== null && (  // Display totalStudentsPrimary2 only after it's fetched
              <p style={styles.studentCount}>{totalStudentsJunior3} students</p>
            )}
          </div>
         {/* Primary 1 */}
     <div style={styles.iconItem} onClick={() => handleRedirect('/admin/senior1')}>
            <FaChild size={40} style={styles.icon} />
            <p style={styles.iconText}>Senior 1</p>
            {totalStudentsSenior1 !== null && (  // Display totalStudentsPrimary1 only after it's fetched
              <p style={styles.studentCount}>{totalStudentsSenior1} students</p>
            )}
          </div>
    {/* Primary 2 */}
    <div style={styles.iconItem} onClick={() => handleRedirect('/admin/senior2')}>
            <FaChild size={40} style={styles.icon} />
            <p style={styles.iconText}>Senior 2</p>
            {totalStudentsSenior2 !== null && (  // Display totalStudentsPrimary2 only after it's fetched
              <p style={styles.studentCount}>{totalStudentsSenior2} students</p>
            )}
          </div>
         {/* Primary 1 */}
     <div style={styles.iconItem} onClick={() => handleRedirect('/admin/senior3')}>
            <FaChild size={40} style={styles.icon} />
            <p style={styles.iconText}>Senior 1</p>
            {totalStudentsSenior3 !== null && (  // Display totalStudentsPrimary1 only after it's fetched
              <p style={styles.studentCount}>{totalStudentsSenior3} students</p>
            )}
          </div>
   
      </div>
    </div>
  </div>
);
};

const styles = {
container: {
  padding: '30px',
  maxWidth: '1000px',
  margin: '0 auto',
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  fontFamily: "'Poppins', sans-serif",
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
section: {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  marginBottom: '20px',
},
sectionTitle: {
  fontSize: '22px',
  fontWeight: '600',
  color: '#444',
  marginBottom: '20px',
  textAlign: 'center',
},
iconList: {
  display: 'flex',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
  gap: '20px',
},
backButton: {
  fontSize: '15px',
  color: '#4CAF50',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  textAlign: 'left',
},
iconItem: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '15%',
  padding: '10px',
  cursor: 'pointer',
  borderRadius: '10px',
  transition: 'transform 0.3s, background-color 0.3s',
  backgroundColor: '#f4f7fa',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
},
iconItemHover: {
  backgroundColor: '#e0e7ff',
  transform: 'scale(1.05)',
},
icon: {
  color: '#3347B0',
  transition: 'color 0.3s',
},
iconText: {
  marginTop: '10px',
  color: '#555',
  fontSize: '15px',
  fontWeight: '500',
  textAlign: 'center',
},

};

export default ClassSection;
