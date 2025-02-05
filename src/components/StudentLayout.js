import React, { useState } from 'react';
import StudentSidebar from './StudentSidebar';
import { Outlet } from 'react-router-dom';
import schoolLogo from './images/logo2.jpg'; // Import the logo image


const StudentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div style={layoutStyle}>
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div style={{ ...contentStyle, marginLeft: isSidebarOpen ? '50px' : '0' }}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>UMAR PHAROUQ INTERNATINAL SCHOOL</h1>
          {/* Display the school logo */}
          <img src={schoolLogo} alt="School Logo" style={logoStyle} />
        </header>
        <div className="content">
          <Outlet /> {/* This renders the nested route component */}
        </div>
      </div>
    </div>
  );
};

// Styles for AdminLayout
const layoutStyle = {
  backgroundColor: 'gray',
  display: 'flex',
  height: '100vh',
  flexDirection: 'row', // Ensure the layout is row-based
};

const contentStyle = {
  padding: '2px',
  flex: 1,
  transition: 'margin-left 0.3s ease', // For smooth transition if sidebar is toggled
};

const headerStyle = {
  height: '60px',
  backgroundColor: '#3347B0',
  color: 'white',
  padding: '10px 20px',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between', // Ensures that the title and logo are spaced out
  alignItems: 'center', // Aligns title and logo vertically in the center
};

const titleStyle = {
  margin: 0, // Remove margin from the title to make it align properly
  fontSize: '24px',
  fontWeight:'bold',
  fontFamily:'cursive'
};

const logoStyle = {
  height: '60px', // Adjust the size of the logo
  width: '70px', // Maintain the aspect ratio of the logo
  borderRadius:'10px'
};

export default StudentLayout;
