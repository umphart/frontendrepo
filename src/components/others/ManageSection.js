import React, { useState, useEffect } from 'react';     
import { FaChild, FaBookOpen, FaGraduationCap } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';  // Import Slider component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ManageSection = () => {
  const [studentStats, setStudentStats] = useState({
    primary: 0,
    junior: 0,
    senior: 0,
    males: 0,
    females: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/students/stats')
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          let primary = 0;
          let junior = 0;
          let senior = 0;
          let males = 0;
          let females = 0;
          let total = 0;

          data.forEach((entry) => {
            if (entry.section === 'Primary') {
              primary += entry.total_students;
            } else if (entry.section === 'Junior') {
              junior += entry.total_students;
            } else if (entry.section === 'Senior') {
              senior += entry.total_students;
            }

            males += parseInt(entry.male_count, 10) || 0;
            females += parseInt(entry.female_count, 10) || 0;
            total += entry.total_students;
          });

          setStudentStats({
            primary,
            junior,
            senior,
            males,
            females,
            total,
          });
        }
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
        setError('Failed to load student data');
        setLoading(false);
      });
  }, []);

  const handleRedirect = (path) => {
    navigate(path);
  };

  const [hoveredSection, setHoveredSection] = useState(null);

  const handleMouseEnter = (section) => setHoveredSection(section);
  const handleMouseLeave = () => setHoveredSection(null);

  return (
    <div style={styles.container}>
      {/* Arrow button for navigation */}
      <button 
        onClick={() => navigate(-1)} // Navigate to the previous page
        style={styles.arrowButton}
      >
        ⬅️
      </button>

      <h2 style={styles.heading}>Manage Section</h2>
      <p style={styles.subheading}>Manage Primary, Junior, and Senior sections effortlessly.</p>

      {/* Slider for showcasing the sections */}
      <div style={styles.sliderContainer}>
        <Slider {...sliderSettings}>
          <div style={styles.sliderImage}>
            <h3>Primary Section</h3>
            <p>Manage Primary Section students and more.</p>
          </div>
          <div style={styles.sliderImage}>
            <h3>Junior Section</h3>
            <p>Manage Junior Section students and more.</p>
          </div>
          <div style={styles.sliderImage}>
            <h3>Senior Section</h3>
            <p>Manage Senior Section students and more.</p>
          </div>
        </Slider>
      </div>

      {/* Error Handling */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Loading state */}
      {loading ? (
        <p style={styles.loading}>Loading student stats...</p>
      ) : (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Sections:</h3>
          <div style={styles.iconList}>
            {/* Primary Section Icon */}
            <div
              style={{
                ...styles.iconItem,
                ...(hoveredSection === 'primary' ? styles.iconItemHover : {}),
              }}
              onClick={() => handleRedirect('/admin/manage-primary')}
              onMouseEnter={() => handleMouseEnter('primary')}
              onMouseLeave={handleMouseLeave}
            >
              <FaChild size={50} style={styles.icon} />
              <p style={styles.iconText}>Primary Section</p>
              <p style={styles.studentCount}>{studentStats.primary} students</p>
            </div>

            {/* Junior Section Icon */}
            <div
              style={{
                ...styles.iconItem,
                ...(hoveredSection === 'junior' ? styles.iconItemHover : {}),
              }}
              onClick={() => handleRedirect('/admin/manage-junior')}
              onMouseEnter={() => handleMouseEnter('junior')}
              onMouseLeave={handleMouseLeave}
            >
              <FaBookOpen size={50} style={styles.icon} />
              <p style={styles.iconText}>Junior Section</p>
              <p style={styles.studentCount}>{studentStats.junior} students</p>
            </div>

            {/* Senior Section Icon */}
            <div
              style={{
                ...styles.iconItem,
                ...(hoveredSection === 'senior' ? styles.iconItemHover : {}),
              }}
              onClick={() => handleRedirect('/admin/manage-senior')}
              onMouseEnter={() => handleMouseEnter('senior')}
              onMouseLeave={handleMouseLeave}
            >
              <FaGraduationCap size={50} style={styles.icon} />
              <p style={styles.iconText}>Senior Section</p>
              <p style={styles.studentCount}>{studentStats.senior} students</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative', // Ensure positioning for arrow button
  },
  arrowButton: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    fontSize: '15px',
    padding: '0',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#007bff',
    textDecoration: 'none', // Remove underline from button text
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
  iconItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18%',
    padding: '15px',
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
    fontSize: '16px',
    fontWeight: '500',
    textAlign: 'center',
  },
  studentCount: {
    marginTop: '5px',
    color: '#777',
    fontSize: '14px',
    fontWeight: '400',
  },
  sliderContainer: {
    marginBottom: '0px',
    borderRadius:'6px'
  },
  sliderImage: {
    width: '20%',
    height: 'auto',
    borderRadius: '8px',
    textAlign: 'center',
    padding: '20px',
  },
  loading: {
    textAlign: 'center',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
};

export default ManageSection;
