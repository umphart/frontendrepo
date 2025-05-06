import React, { useState, useEffect } from 'react'; 
import { FaUserCircle, FaTasks, FaChartBar, FaBookOpen, FaBell } from 'react-icons/fa';
import Slider from 'react-slick';
import { Bar } from 'react-chartjs-2';
import { Table, Container, Row, Col, Alert, Badge, Button } from 'reactstrap';
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

const StaffDashboard = () => {
  const navigate = useNavigate();
  const galleryImages = [image1, image2, image3, image4, image5];
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
  
  // Notification state
  const [socket, setSocket] = useState(null);
const [notifications, setNotifications] = useState([]);
const [showNotifications, setShowNotifications] = useState(false);
const [unreadCount, setUnreadCount] = useState(0);
const [errorMessage, setErrorMessage] = useState('');
// Mark single notification as read
const markAsRead = async (notificationId) => {
  try {
    // First get the staffID from localStorage
    const staffID = localStorage.getItem('staffID');
    if (!staffID) {
      throw new Error('No staff ID found in session');
    }

    // Encode both the staffID and notificationId for the URL
    const encodedStaffID = encodeURIComponent(staffID);
    const encodedNotificationId = encodeURIComponent(notificationId);

    const response = await fetch(
      `http://localhost:5000/api/notifications/${encodedNotificationId}/read`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Staff-ID': encodedStaffID  // Send staffID in headers if needed
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Update local state
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
    setUnreadCount(prev => prev - 1);

  } catch (error) {
    console.error('Error marking notification as read:', error);
    setErrorMessage('Failed to mark notification as read');
    setTimeout(() => setErrorMessage(''), 5000); // Clear error after 5 seconds
  }
};
// Mark all notifications as read
const markAllAsRead = async () => {
  try {
    const staffID = localStorage.getItem('staffID');
    if (!staffID) {
      throw new Error('No staff ID found in session');
    }

    const encodedStaffID = encodeURIComponent(staffID);
    const response = await fetch(
      `http://localhost:5000/api/notifications/mark-all-read/${encodedStaffID}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  } catch (error) {
    console.error('Error marking all as read:', error);
    setErrorMessage('Failed to mark all notifications as read');
    setTimeout(() => setErrorMessage(''), 5000);
  }
};

// Clear all notifications
const clearAllNotifications = async () => {
  try {
    const staffID = localStorage.getItem('staffID');
    if (!staffID) {
      throw new Error('No staff ID found in session');
    }

    const encodedStaffID = encodeURIComponent(staffID);
    const response = await fetch(
      `http://localhost:5000/api/notifications/clear-all/${encodedStaffID}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    setNotifications([]);
    setUnreadCount(0);
  } catch (error) {
    console.error('Error clearing notifications:', error);
    setErrorMessage('Failed to clear notifications');
    setTimeout(() => setErrorMessage(''), 5000);
  }
};
  // Handle WebSocket messages
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new-notification') {
        const staffID = localStorage.getItem('staffID');
        if (data.staffID === staffID) {
          setNotifications(prev => [data.notification, ...prev]);
          setUnreadCount(prev => prev + 1);
        }
      }
    };
  }, [socket]);
  // Fetch initial notifications
useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const staffID = localStorage.getItem('staffID');
      if (!staffID) {
        console.error('No staffID found in localStorage');
        return;
      }
  
      // Encode the staffID to handle special characters
      const encodedStaffID = encodeURIComponent(staffID);
      const response = await fetch(`http://localhost:5000/api/notifications/${encodedStaffID}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Optionally show error to user
      setErrorMessage('Failed to load notifications. Please try again later.');
    }
  };

  fetchNotifications();
}, []);

// Mark notifications as read when panel is opened
const toggleNotifications = () => {
  const newState = !showNotifications;
  setShowNotifications(newState);

};
  // Fetch student statistics
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
        }
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  // Fetch notifications and set up refresh listeners
  useEffect(() => {
    const fetchNotifications = () => {
      const staffID = localStorage.getItem('staffID');
      if (!staffID) return;

    
    };

    fetchNotifications();

    // Listen for custom events from other components
    const handleRefreshEvent = () => fetchNotifications();
    window.addEventListener('refresh-notifications', handleRefreshEvent);

    // Listen for postMessage events from iframes/popups
    const handlePostMessage = (event) => {
      if (event.data === 'refresh-notifications') {
        fetchNotifications();
      }
    };
    window.addEventListener('message', handlePostMessage);

    return () => {
      window.removeEventListener('refresh-notifications', handleRefreshEvent);
      window.removeEventListener('message', handlePostMessage);
    };
  }, [showNotifications]);

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
            const value = Math.round(tooltipItem.raw);
            return `${tooltipItem.dataset.label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: { 
        beginAtZero: true,
        title: { display: true, text: 'Section' },
      },
      y: { 
        beginAtZero: true,
        title: { display: true, text: 'Number of Students' },
        ticks: { stepSize: 5 },
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
      <div style={styles.header}>
        <h2 style={styles.heading}>Staff Dashboard</h2>
        <div style={styles.notificationIcon} onClick={toggleNotifications}>
          <FaBell size={24} />
          {unreadCount > 0 && (
            <Badge color="danger" pill style={styles.badge}>
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
      
      {showNotifications && (
  <div style={styles.notificationPanel}>
    <div style={styles.notificationHeader}>
      <h4 style={styles.notificationTitle}>Notifications</h4>
      <div style={styles.notificationActions}>
        <Button 
          color="link" 
          size="sm" 
          onClick={() => markAllAsRead()}
          disabled={unreadCount === 0}
          style={styles.notificationButton}
        >
          Mark all as read
        </Button>
        <Button 
          color="link" 
          size="sm" 
          onClick={() => clearAllNotifications()}
          disabled={notifications.length === 0}
          style={styles.notificationButton}
        >
          Clear all
        </Button>
      </div>
    </div>
    
    {notifications.length > 0 ? (
      notifications.map((note) => (
        <Alert 
          key={note.id}
          color={note.isRead ? "light" : "info"}
          style={styles.notification}
          toggle={() => markAsRead(note.id)}
        >
          <div>{note.message}
          </div>
          <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
            {new Date(note.createdAt).toLocaleString()}
          </small>
        </Alert>
      ))
    ) : (
      <p style={styles.noNotifications}>No notifications</p>
    )}
  </div>
)}
      <p style={styles.subheading}>Welcome to the Staff Panel! Manage and monitor the entire system here.</p>

      {/* Features Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Features</h3>
        <div style={styles.iconList}>
          {[ 
            { icon: <FaUserCircle size={50} />, label: 'Profiles', path: 'staff-profile' },
            { icon: <FaTasks size={50} />, label: 'Sections and Classes', path: 'sections' },
            { icon: <FaChartBar size={50} />, label: 'Exams & Reports', path: 'exam-report' },
            { icon: <FaBookOpen size={50} />, label: 'Subjects', path: 'subject' },
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

// Styles remain the same 
const styles = {
  container: {
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#3347B0',
    margin: 0,
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
notificationIcon: {
    position: 'relative',
    cursor: 'pointer',
    marginLeft: '15px',
    color:'red'
},
badge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
},
notificationPanel: {
  position: 'absolute',
  right: '20px',
  top: '60px',
  width: '400px',
  maxHeight: '500px',
  overflowY: 'auto',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  padding: '15px',
  zIndex: 1000,
},
notificationHeader: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '15px',
  borderBottom: 'none', // Explicitly remove any border
},
notificationTitle: {
  margin: 0,
  padding: 0,
  fontSize: '1.2rem',
  fontWeight: '600',
  color: '#333',
  textDecoration: 'none', // Remove underline
},
notificationActions: {
  display: 'flex',
  gap: '10px',
},
notificationButton: {
  padding: '0',
  textDecoration: 'none',
  color: '#007bff',
  '&:hover': {
    textDecoration: 'none',
    color: '#0056b3',
  },
  '&:disabled': {
    color: '#6c757d',
    cursor: 'not-allowed',
  },
},
notification: {
  marginBottom: '10px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
},
noNotifications: {
  color: '#6c757d',
  textAlign: 'center',
  margin: '10px 0',
}
};

export default StaffDashboard;