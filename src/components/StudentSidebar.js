import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import {FaSignOutAlt, FaTachometerAlt , FaBars,  FaBookOpen } from 'react-icons/fa'; // Importing icons

// Sidebar component
const StudentSidebar = () => {
  const [isHovered, setIsHovered] = useState(false); // State to manage the hover effect

  return (
    <div
      style={sidebarStyle(isHovered)}
      onMouseEnter={() => setIsHovered(true)}  // Set to true when sidebar is hovered
      onMouseLeave={() => setIsHovered(false)} // Set to false when sidebar is unhovered
    >
      {/* Button to toggle the sidebar */}
      <button
        onClick={() => setIsHovered(!isHovered)}
        style={toggleButtonStyle}
      >
        <FaBars /> {/* Hamburger icon */}
      </button>

      {/* Sidebar Content */}
      <div style={isHovered ? { display: 'block' } : { display: 'none' }}>
        <h3 style={headerStyle}>STUDENT</h3>
        <ul style={ulStyle}>
          <SidebarItem to="/student" icon={<FaTachometerAlt />} text="Dashboard" />
          <SidebarItem to="/student/student-profile" icon={<FaSave/>} text="Profile" /> 
          <SidebarItem to="/student/view-result " icon={<FaBookOpen />} text="Check Result" />
          <SidebarItem to="/student/logout" icon={<FaSignOutAlt />} text="Logout" />
        </ul>
      </div>
    </div>
  );
};

// Sidebar styles with dynamic width and background color based on hover state
const sidebarStyle = (isHovered) => ({
  width: isHovered ? '200px' : '50px',
  height: '100vh',
  background: isHovered ? '#2c3e50' : 'transparent',  // Transparent when minimized
  color: '#fff',
  padding: '5px',
  boxSizing: 'border-box',
  position: 'fixed',
  top: 0,
  left: 0,
  transition: 'width 0.3s ease, background 0.3s ease', // Add transition for background
  overflow: 'hidden',
  zIndex: 1000,
});

const headerStyle = {
  textAlign: 'center',
  marginBottom: '30px',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#ecf0f1',
};

const ulStyle = {
  listStyleType: 'none',
  paddingLeft: 0,
};

const liStyle = {
  marginBottom: '1px', // Space out the list items
};

const linkStyle = {
  textDecoration: 'none',
  color: '#ecf0f1', // Light color for the links
  fontSize: '15px',
  display: 'flex', // Use flexbox for icon and text alignment
  alignItems: 'center', // Center icon and text vertically
  padding: '10px 1px',
  borderRadius: '5px',
  transition: 'background 0.3s ease',  // Smooth background transition
};

const iconStyle = {
  marginRight: '15px',  // Space between icon and text
  fontSize: '20px',  // Set icon size
};

const SidebarItem = ({ to, icon, text }) => (
  <li style={liStyle}>
    <Link
      to={to}
      style={linkStyle}
      onMouseEnter={(e) => e.target.style.background = '#34495e'}  // Hover effect
      onMouseLeave={(e) => e.target.style.background = 'transparent'}  // Reset on mouse leave
    >
      <span style={iconStyle}>{icon}</span>
      {text && <span>{text}</span>} {/* Only show text if sidebar is expanded */}
    </Link>
  </li>
);

const toggleButtonStyle = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '20px',
  position: 'absolute',
  top: '20px',
  left: '2px',
  cursor: 'pointer',
};

export default StudentSidebar;
