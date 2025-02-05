import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Ensure the path is correct
import { Outlet } from 'react-router-dom';
import schoolLogo from './images/logo2.jpg'; // Import the logo image

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Adjust window size dynamically
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Responsive styles
  const layoutStyle = {
    backgroundColor: 'gray',
    display: 'flex',
    height: '100vh',
    flexDirection: windowWidth < 768 ? 'column' : 'row', // Stack elements for mobile
  };

  const contentStyle = {
    padding: '2px',
    flex: 1,
    transition: 'margin-left 0.3s ease',
    marginLeft: isSidebarOpen && windowWidth >= 768 ? '50px' : '0', // Sidebar margin
  };

  const headerStyle = {
    height: '70px',
    backgroundColor: '#3347B0',
    color: 'white',
    padding: '10px 20px',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: windowWidth < 768 ? 'column' : 'row', // Stack logo and title on mobile
    justifyContent: windowWidth < 768 ? 'flex-start' : 'space-between',
    alignItems: 'center',
  };

  const titleStyle = {
    margin: 0,
    fontSize: windowWidth < 768 ? '18px' : '24px', // Smaller font on mobile
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    textAlign: windowWidth < 768 ? 'center' : 'left', // Center title on mobile
  };

  const logoStyle = {
    height: windowWidth < 768 ? '50px' : '60px', // Smaller logo on mobile
    width: windowWidth < 768 ? '50px' : '70px',
    borderRadius: '10px',
  };

  return (
    <div style={layoutStyle}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div style={contentStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>UMAR PHAROUQ INTERNATINAL SCHOOL</h1>
          <img src={schoolLogo} alt="School Logo" style={logoStyle} />
        </header>
        <div className="content">
          <Outlet /> {/* This renders the nested route component */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
