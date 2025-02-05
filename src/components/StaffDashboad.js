import React, { useState, useEffect } from 'react'; 
import { FaUserCircle, FaTasks, FaChartBar, FaCog, FaBook } from 'react-icons/fa'; // Imported FaBook for Manage Subjects
import Slider from 'react-slick';
import { Bar } from 'react-chartjs-2';
import { Table, Container, Row, Col } from 'reactstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/images.jpg';
import image4 from './images/logo.png';
import image5 from './images/images.jpg';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const galleryImages = [image1, image2, image3, image4, image5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [studentStats, setStudentStats] = useState({
    primary: 0,
    junior: 0,
    senior: 0,
    males: 0,
    females: 0,
    total: 0,
    counts: {
      primaryMale: 0,
      primaryFemale: 0,
      juniorMale: 0,
      juniorFemale: 0,
      seniorMale: 0,
      seniorFemale: 0,
    },
  });
  
  useEffect(() => {
    fetch('http://localhost:5000/api/students/stats')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          let primaryMale = 0, primaryFemale = 0;
          let juniorMale = 0, juniorFemale = 0;
          let seniorMale = 0, seniorFemale = 0;
  
          data.forEach((entry) => {
            if (entry.section === 'Primary') {
              primaryMale += parseInt(entry.male_count, 10) || 0;
              primaryFemale += parseInt(entry.female_count, 10) || 0;
            } else if (entry.section === 'Junior') {
              juniorMale += parseInt(entry.male_count, 10) || 0;
              juniorFemale += parseInt(entry.female_count, 10) || 0;
            } else if (entry.section === 'Senior') {
              seniorMale += parseInt(entry.male_count, 10) || 0;
              seniorFemale += parseInt(entry.female_count, 10) || 0;
            }
          });
  
          setStudentStats({
            primary: primaryMale + primaryFemale,
            junior: juniorMale + juniorFemale,
            senior: seniorMale + seniorFemale,
            males: primaryMale + juniorMale + seniorMale,
            females: primaryFemale + juniorFemale + seniorFemale,
            total: primaryMale + primaryFemale + juniorMale + juniorFemale + seniorMale + seniorFemale,
            counts: {
              primaryMale, primaryFemale,
              juniorMale, juniorFemale,
              seniorMale, seniorFemale,
            },
          });
        } else {
          setStudentStats((prev) => ({
            ...prev,
            counts: {
              primaryMale: 0,
              primaryFemale: 0,
              juniorMale: 0,
              juniorFemale: 0,
              seniorMale: 0,
              seniorFemale: 0,
            },
          }));
        }
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
        setStudentStats((prev) => ({
          ...prev,
          counts: {
            primaryMale: 0,
            primaryFemale: 0,
            juniorMale: 0,
            juniorFemale: 0,
            seniorMale: 0,
            seniorFemale: 0,
          },
        }));
      });
  }, []);
  const data = {
    labels: ['Primary', 'Junior Students', 'Senior Students'],
    datasets: [
      {
        label: 'Male Students',
        data: [
          studentStats.counts?.primaryMale || 0,
          studentStats.counts?.juniorMale || 0,
          studentStats.counts?.seniorMale || 0,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Female Students',
        data: [
          studentStats.counts?.primaryFemale || 0,
          studentStats.counts?.juniorFemale || 0,
          studentStats.counts?.seniorFemale || 0,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            // Round the value to the nearest integer
            const value = Math.round(tooltipItem.raw);
            return `${tooltipItem.dataset.label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: { 
        beginAtZero: true,
        title: {
          display: true,
          text: 'Section', // Label for the x-axis
        },
      },
      y: { 
        beginAtZero: true,
        title: {
          display: true,
          text: 'Pollution', // Label for the y-axis
        },
        ticks: {
          stepSize: 5, // Interval for the y-axis
        },
      },
    },
  };
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Staff Dashboard</h2>
      <p style={styles.subheading}>Welcome to the Staff Panel! Manage and monitor the entire system here.</p>

      {/* What You Can Do Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Features</h3>
        <div style={styles.iconList}>
          {[ 
            { icon: <FaUserCircle size={50} />, label: 'Profiles', path: 'staff-profile' },
            { icon: <FaTasks size={50} />, label: 'Sections and Classes', path: 'sections' },
            { icon: <FaChartBar size={50} />, label: 'Exams & Reports', path: 'exam-report' },
          ].map((item, index) => (
            <div
              key={index}
              style={styles.iconItem}
              onClick={() => handleRedirect(item.path)}
              className="icon-item"
            >
              <div style={styles.icon}>{item.icon}</div>
              <p style={styles.iconText}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
       
                 {/* Student Statistics and Chart Section */}
                 <div style={styles.section}>
                   <h3 style={styles.sectionTitle}>Student Statistics</h3>
                   <Container>
                     <Row>
                       <Col xs="12" md="6">
                         <Table responsive style={styles.table}>
                           <thead>
                             <tr>
                               <th style={styles.tableHeader}>Category</th>
                               <th style={styles.tableHeader}>Count</th>
                             </tr>
                           </thead>
                           <tbody>
                             {[{ label: 'Total Students', value: studentStats.total },
                               { label: 'Males', value: studentStats.males },
                               { label: 'Females', value: studentStats.females },
                               { label: 'Primary Students', value: studentStats.primary },
                               { label: 'Junior Students', value: studentStats.junior },
                               { label: 'Senior Students', value: studentStats.senior }].map((item, index) => (
                                 <tr key={index} style={styles.tableRow}
                                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.tableRowHover.backgroundColor)}
                                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                                   <td style={styles.tableCell}>{item.label}</td>
                                   <td style={styles.tableCell}>{item.value}</td>
                                 </tr>
                               ))}
                           </tbody>
                         </Table>
                       </Col>
                       <Col xs="12" md="6">
                         <div style={styles.chartContainer}>
                           <Bar data={data} options={options} />
                         </div>
                       </Col>
                     </Row>
                   </Container>
                 </div>

      {/* School Gallery */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>School Gallery</h3>
        <Slider {...sliderSettings}>
          {galleryImages.map((image, index) => (
            <div key={index} style={styles.slide}>
              <img src={image} alt={`Gallery ${index + 1}`} style={styles.image} />
            </div>
          ))}
        </Slider>
        <p style={styles.description}>A collection of memories and testimonies from the school.</p>
      </div>

      
    </div>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  tableHeader: {
    backgroundColor: '#3347B0',
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '10px',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  tableRow: {
    transition: 'background-color 0.3s',
  },
  tableRowHover: {
    backgroundColor: '#f4f7fa',
  },
  container: {
    padding: '30px',
    maxWidth: '1200px',
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
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '20px',
    textAlign: 'center',
  },
  description: {
    fontSize: '16px',
    color: '#777',
    textAlign: 'center',
    marginBottom: '20px',
  },
  iconList: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
  },
  iconItem: {
    display: 'flex',
    color: '#3347B0',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
    width: '22%',
    cursor: 'pointer',
    transition: 'transform 0.3s, background-color 0.3s',
    borderRadius: '10px',
    backgroundColor: '#f4f7fa',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  iconText: {
    marginTop: '10px',
    textAlign: 'center',
    color: '#555',
    fontSize: '16px',
  },
  chartContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  image: {
    width: '300px',
    height: '200px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  
};

export default AdminDashboard;

