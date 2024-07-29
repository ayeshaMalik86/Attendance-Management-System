import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute'; 
import MarkAttendance from './pages/MarkAttendance';
import AttendanceRecords from './components/AttendanceRecord';
import LeaveRequests from './pages/LeaveRequests'; // Import LeaveRequests component
import Layout from './components/Layout'; // Import Layout
import Profile from './pages/Profile';
import ManageAttendance from './pages/ManageAttendance';
import LeaveApproval from './pages/LeaveApproval';
import ViewStudentRecord from './pages/ViewStudentRecord';
import GradingSystem from './pages/GradingSystem';
import GenerateReports from './pages/GenerateReports';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/admindashboard" element={<ProtectedRoute element={AdminDashboard} />} />
            <Route path="/mark-attendance" element={<ProtectedRoute element={MarkAttendance} />} />
            <Route path="/attendance-records" element={<ProtectedRoute element={AttendanceRecords} />} />
            <Route path="/leave-requests" element={<ProtectedRoute element={LeaveRequests} />} /> {/* Add LeaveRequests route */}
            <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
            <Route path="/manage-attendance" element={<ProtectedRoute element={ManageAttendance} />} />
            <Route path="/leave-approval" element={<ProtectedRoute element={LeaveApproval} />} />
            <Route path="/view-student-record" element={<ProtectedRoute element={ViewStudentRecord} />} />
            <Route path="/grading-system" element={<ProtectedRoute element={GradingSystem} />} />
            <Route path="/generate-reports" element={<ProtectedRoute element={GenerateReports} />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
