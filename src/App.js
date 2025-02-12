import React, { useState, useEffect } from 'react';   
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/others/LoginPage';
import RegisterPage from './components/others/RegisterPage'; // Import the Register Page
import AdminDashboard from './components/AdminDashboard'; // Import Admin Dashboard
import ManageStudent from './components/others/ManageStudent';
import ManageSection from './components/others/ManageSection';
import AdminLayout from './components/AdminLayout';
import AddStudent from './components/others/AddStudent';
import StudentsList from './components/StudentsList';
import StudentRecords from './components/StudentRecords';
import TransferStudent from './components/TransferStudent';
import WithdrawStudent from './components/WithdrawStudent';
import DeleteStudent from './components/others/DeleteStudent';
import UpdateStudent from './components/UpdateStudent';
import PrimarySection from './components/PrimarySection';
import Logout from './components/others/Logout';
import JuniorSection from './components/others/JuniorSection';
import SeniorSection from './components/SeniorSection';
import Junior1 from './components/juniorStudents/Junior1';
import Junior2 from './components/juniorStudents/Junior2';
import Junior3 from './components/juniorStudents/Junior3';
import Primary1 from './components/primaryStudents/Primary1';
import Primary2 from './components/primaryStudents/Primary2';
import Primary3 from './components/primaryStudents/Primary3';
import Primary4 from './components/primaryStudents/Primary4';
import Primary5 from './components/primaryStudents/Primary5';
import Modal from './components/others/Modal';
import ClassSection from './components/others/ClassSection';
import Senior3 from './components/seniorStudents/Senior3';
import Senior2 from './components/seniorStudents/Senior2';
import Senior1 from './components/seniorStudents/Senior1';
import ExamReport from './components/others/ExamReport';
import AddExam from './components/others/AddExam';
import ViewExam from './components/others/ViewExam';
import ViewModal from './components/others/ViewModal';
import ExamModal from './components/others/ExamModal';
import FirstTerm from './components/others/FirstTerm';
import SecondTerm from './components/others/SecondTerm';
import ThirdTerm from './components/others/ThirdTerm';
import FirstTermExam from './components/others/FirstTermExam';
import SecondTermExam from './components/others/SecondTermExam';
import ThirdTermExam from './components/others/ThirdTermExam';
import StudentResults from './components/others/StudentResults';
import ProtectedRoute from './components/others/ProtectedRoute';  // Import ProtectedRoute
import StaffDashboard from './components/StaffDashboad';
import StudentsDashboard from './components/StudentsDashboard';
import StaffLayout from './components/StaffLayout';
import StudentLayout from './components/StudentLayout';
import StudentProfile from './components/StudentProfile';
import UnauthorizedPage from './components/others/UnauthorizedPage';
import ExamReportStaff from './components/others/ExamReportStaff';
import StaffModal from './components/others/StaffModal';
import StaffSection from './components/others/StaffSection';
import ClassStaff from './components/others/ClassStaff';
import ExamModalStaff from './components/others/ExamModalStaff';
import ViewModalStaff from './components/others/ViewModalStaff';
import AddStaff from './components/others/AddStaff';
import ManageStaff from './components/others/ManageStaff';
import UpdateStaff from './components/others/UpdateStaff';
import DeleteStaff from './components/others/DeleteStaff';
import StaffProfile from './components/others/StaffProfile';
import ExamRecords from './components/PrimaryRecord';
import StaffList from './components/others/StaffList';
import AddSubject from './components/AddSubject';
import AssignSubject from './components/AssignSubject';
import UnassignSubject from './components/others/UnassignSubject';
import RecordNavigator from './components/others/RecordNavigator';
import AlbumComponent from './components/others/AlbumComponent';
import StudentPhotos from './components/others/StudentPhotos';
import StaffPhotos from './components/others/StaffPhotos';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  // Check if user is authenticated on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('role');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setRole(userRole);  // Set role to state
  }, []);

  const handleLogin = (authenticated, role) => {
    setIsAuthenticated(authenticated);
    setRole(role);  // Save role to state
    localStorage.setItem('isAuthenticated', authenticated ? 'true' : 'false');
    localStorage.setItem('role', role);  // Save role to localStorage
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        {/* Protected Routes */}
        <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['Admin']} isAuthenticated={isAuthenticated} userRole={role}><AdminLayout /></ProtectedRoute>}>
      
          <Route index element={<AdminDashboard />} />
          <Route path="manage-students" element={<ManageStudent />} />
          <Route path="manage-staff" element={<ManageStaff />} />
          <Route path="manage-section" element={<ManageSection />} />
          <Route path="manage-primary" element={<PrimarySection />} />
          <Route path="manage-junior" element={<JuniorSection />} />
          <Route path="manage-senior" element={<SeniorSection />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="add-staff" element={<AddStaff />} />
          <Route path="update-staff" element={<UpdateStaff />} />
          <Route path="delete-staff" element={<DeleteStaff />} />
          <Route path="students-list" element={<StudentsList />} />
          <Route path="student-records" element={<StudentRecords />} />
          <Route path="transfer-student" element={<TransferStudent />} />
          <Route path="update-student" element={<UpdateStudent />} />
          <Route path="delete-student" element={<DeleteStudent />} />
          <Route path="withdraw-student" element={<WithdrawStudent />} />
          <Route path="primary-section" element={<PrimarySection />} />
          <Route path="primary1" element={<Primary1/>} />
          <Route path="primary2" element={<Primary2/>} />
          <Route path="primary3" element={<Primary3/>} />
          <Route path="primary4" element={<Primary4/>} />
          <Route path="primary5" element={<Primary5/>} />
          <Route path="junior1" element={<Junior1 />} />
          <Route path="junior2" element={<Junior2 />} />
          <Route path="junior3" element={<Junior3 />} />
          <Route path="senior1" element={<Senior1 />} />
          <Route path="senior2" element={<Senior2 />} />
          <Route path="senior3" element={<Senior3 />} />
          <Route path="sections" element={<Modal />} />
          <Route path="logout" element={<Logout />} />
          <Route path="class-section" element={<ClassSection />} />
          <Route path="exam-report" element={<ExamReport />} />
          <Route path="add-exam" element={<AddExam />} />
          <Route path="view-exam" element={<ViewExam />} />
          <Route path="view-modal" element={<ViewModal />} />
          <Route path="exam-modal" element={<ExamModal />} />
          <Route path="first-term" element={<FirstTerm />} />
          <Route path="second-term" element={<SecondTerm />} />
          <Route path="third-term" element={<ThirdTerm />} />
          <Route path="add-first-exam" element={<FirstTermExam />} />
          <Route path="add-second-exam" element={<SecondTermExam />} />
          <Route path="add-third-exam" element={<ThirdTermExam />} />
          <Route path="view-result" element={<StudentResults />} />
          <Route path="record-nav" element={<RecordNavigator />} />
          <Route path="result" element={<ExamRecords />} />
          <Route path="staff-list" element={<StaffList />} />
          <Route path="subject" element={<AddSubject/>} />
          <Route path="assign-subject" element={<AssignSubject/>} />
          <Route path="unassign-subject" element={<UnassignSubject/>} />
          <Route path="album" element={<AlbumComponent/>} />
          <Route path="student-photos" element={<StudentPhotos/>} />
          <Route path="staff-photos" element={<StaffPhotos/>} />
        </Route>
          {/* Add more routes here for Admin */}
        
         {/* Protected Routes */}
         <Route path="/staff/*" element={
          <ProtectedRoute 
            allowedRoles={['Staff']} 
            isAuthenticated={isAuthenticated} 
            userRole={role}
          >
            <StaffLayout/>
          </ProtectedRoute>
        }>
          <Route index element={<StaffDashboard />} />
          <Route path="sections" element={<StaffModal />} />
          <Route path="manage-primary" element={<PrimarySection />} />
          <Route path="staff-section" element={<StaffSection />} />
          <Route path="manage-senior" element={<SeniorSection />} />
          <Route path="manage-junior" element={<JuniorSection />} />
          <Route path="class-staff" element={<ClassStaff />} />
          <Route path="primary1" element={<Primary1/>} />
          <Route path="primary2" element={<Primary2/>} />
          <Route path="primary3" element={<Primary3/>} />
          <Route path="primary4" element={<Primary4/>} />
          <Route path="primary5" element={<Primary5/>} />
          <Route path="junior1" element={<Junior1 />} />
          <Route path="junior2" element={<Junior2 />} />
          <Route path="junior3" element={<Junior3 />} />
          <Route path="senior1" element={<Senior1 />} />
          <Route path="senior2" element={<Senior2 />} />
          <Route path="senior3" element={<Senior3 />} />
          <Route path="add-exam" element={<AddExam />} />
          <Route path="view-modal" element={<ViewModalStaff />} />
          <Route path="exam-modal" element={<ExamModalStaff/>} />
          <Route path="first-term" element={<FirstTerm />} />
          <Route path="second-term" element={<SecondTerm />} />
          <Route path="third-term" element={<ThirdTerm />} />
          <Route path="add-first-exam" element={<FirstTermExam />} />
          <Route path="add-second-exam" element={<SecondTermExam />} />
          <Route path="add-third-exam" element={<ThirdTermExam />} />
          <Route path="profile" element={<StudentProfile/>} />
          <Route path="exam-report" element={<ExamReportStaff />} />
          <Route path="exam-modal" element={<ExamModalStaff />} />
          <Route path="view-result" element={<StudentResults />} />
          <Route path="staff-profile" element={<StaffProfile/>} />
          
          <Route path="logout" element={<Logout />} />
          
        </Route>

        {/* Student Routes */}
       
       <Route path="/student/*" 
       element={<ProtectedRoute allowedRoles={['Student']} 
       isAuthenticated={isAuthenticated} userRole={role}>
        <StudentLayout />
        </ProtectedRoute>}>
        <Route index element={<StudentsDashboard />} /> 
        <Route path="student-profile" element={<StudentProfile/>} />
        <Route path="manage-section" element={<ManageSection />} />   
        <Route path="manage-primary" element={<PrimarySection />} />
          <Route path="view-result" element={<StudentResults />} />
          <Route path="exam-modal" element={<ExamModal/>} />
          <Route path="logout" element={<Logout />} />
        </Route>

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
