  import React from 'react';     
  import { FaChalkboardTeacher, FaPencilAlt, FaGraduationCap, FaPhotoVideo } from 'react-icons/fa'; 
  import { useNavigate } from 'react-router-dom';
  import 'slick-carousel/slick/slick.css';
  import 'slick-carousel/slick/slick-theme.css';
import { FaPhotoFilm } from 'react-icons/fa6';
import { FcStackOfPhotos } from 'react-icons/fc';

  const AlbumComponent = () => {
    const navigate = useNavigate();

    const handleRedirect = (path) => {
      navigate(path);
    };

    return (
      <div style={styles.container}>
        {/* Arrow button for navigation */}
        <button 
          onClick={() => navigate(-1)} // Navigate to the previous page
          style={styles.arrowButton}
        >
          ⬅️ Back
        </button>

        <h2 style={styles.heading}>Manage Album</h2>
        <p style={styles.subheading}>Manage Staff and Student Photos  effortlessly.</p>

        <div style={styles.section}>
          <div style={styles.iconList}>
            {/*  Sections Icon */}
            <div style={styles.iconItem} onClick={() => handleRedirect('/admin/student-photos')}>
              <FaPhotoVideo size={50} style={styles.icon} />
              <p style={styles.iconText}>Student Photos</p>
            </div>

            {/* Classes Icon */}
            <div style={styles.iconItem} onClick={() => handleRedirect('/admin/staff-photos')}>
              <FaPhotoFilm size={50} style={styles.icon} />
              <p style={styles.iconText}>Staff Photos</p>
            </div>
          </div>
        </div>
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
      position: 'relative', // Ensure positioning for the arrow button
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
    sliderContainer: {
      marginBottom: '0px',
      backgroundColor: 'blue',
      borderRadius: '6px',
    },
    sliderImage: {
      width: '20%',
      height: 'auto',
      borderRadius: '8px',
      textAlign: 'center',
      padding: '20px',
    },
  };

  export default AlbumComponent;
