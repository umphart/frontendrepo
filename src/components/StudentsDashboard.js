import React, { useState, useEffect } from 'react'; 
import { FaUserCircle, FaTasks, FaChartBar, FaCog } from 'react-icons/fa';
import Slider from 'react-slick';
import { Line } from 'react-chartjs-2';
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

const StudentsDashboard = () => {
  const navigate = useNavigate();

  const galleryImages = [image1, image2, image3, image4, image5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: ['Primary', 'Junior Students', 'Senior Students', 'Grade 4', 'Grade 5'],
    datasets: [
      {
        label: 'Progress (%)',
        data: [85, 70, 90, 75, 65],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
          label: (tooltipItem) => `${tooltipItem.raw}%`,
        },
      },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
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
      <h2 style={styles.heading}>Student Dashboard</h2>
      <p style={styles.subheading}>Welcome to the Student Panel! Manage and monitor the entire system here.</p>

      {/* What You Can Do Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Features</h3>
        <div style={styles.iconList}>
          {[
            { icon: <FaUserCircle size={50} />, label: 'Student Profile', path: 'student-profile' },
            { icon: <FaCog size={50} />, label: 'Student Result Checker', path: 'view-result' },
          ].map((item, index) => (
            <div
              key={index}
              style={styles.iconItem}
              onClick={() => handleRedirect(item.path)}
            >
              <div style={styles.icon}>{item.icon}</div>
              <p style={styles.iconText}>{item.label}</p>
            </div>
          ))}
        </div>
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
  container: {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f7f9fc',
    borderRadius: '16px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: '38px',
    fontWeight: '600',
    color: '#333B66',
    textAlign: 'center',
    marginBottom: '12px',
  },
  subheading: {
    fontSize: '18px',
    color: '#6C7B8B',
    textAlign: 'center',
    marginBottom: '30px',
  },
  section: {
    marginBottom: '40px',
    padding: '25px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  },
  sectionTitle: {
    fontSize: '26px',
    fontWeight: '600',
    color: '#2F3C4E',
    marginBottom: '20px',
    textAlign: 'center',
  },
  description: {
    fontSize: '16px',
    color: '#7A8B99',
    textAlign: 'center',
    marginBottom: '20px',
  },
  iconList: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: '25px',
  },
  iconItem: {
    display: 'flex',
    color: '#3347B0',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    width: '22%',
    cursor: 'pointer',
    transition: 'transform 0.3s, background-color 0.3s',
    borderRadius: '12px',
    backgroundColor: '#f0f4f8',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  },
  iconItemHover: {
    transform: 'scale(1.1)',
    backgroundColor: '#e1f0ff',
  },
  iconText: {
    marginTop: '10px',
    textAlign: 'center',
    color: '#555',
    fontSize: '16px',
  },
  chartContainer: {
    maxWidth: '850px',
    margin: '0 auto',
  },
  image: {
    width: '70%',
    height: '150px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
};

export default StudentsDashboard;
