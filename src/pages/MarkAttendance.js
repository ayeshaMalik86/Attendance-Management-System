import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MarkAttendance = () => {
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Example user ID retrieval

  useEffect(() => {
    if (!userId) {
      setError('User ID not found. Please log in again.');
      // Redirect to login page if userId is not found
      navigate('/login');
    } else {
      checkAttendance();
    }
  }, [userId, navigate]);

  const checkAttendance = async () => {
    try {
      console.log('Checking attendance status for user:', userId);
      const response = await axios.get('http://localhost:5000/api/attendance/check', {
        params: { userId } // Pass userId as query parameter
      });
      console.log('Response from checkAttendance:', response.data);
      setAttendanceStatus(response.data.message);
    } catch (err) {
      console.error('Error in checkAttendance:', err.response?.data?.error || err.message);
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const markAttendance = async () => {
    try {
      console.log('Marking attendance for user:', userId);
      const response = await axios.post('http://localhost:5000/api/attendance/mark', {
        userId // Pass userId in request body
      });
      console.log('Response from markAttendance:', response.data);
      setAttendanceStatus(response.data.message || 'Attendance marked successfully!');
    } catch (err) {
      console.error('Error in markAttendance:', err.response?.data?.error || err.message);
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const getStatusColor = () => {
    if (attendanceStatus === 'Attendance already marked for today') {
      return 'green'; // Green color for this specific status
    }
    return 'red'; // Red color for other statuses
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Mark Attendance
      </Typography>
      <Box 
        textAlign="center" 
        mb={4} 
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background
          borderRadius: '8px', 
          padding: '16px', 
          width: '100%', 
          maxWidth: '400px', // Optional: to control container width
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
          marginTop: '1rem' // Margin to push container away from elements
        }}
      >
        <Typography
          variant="body1"
          paragraph
          style={{ color: getStatusColor(), textAlign: 'center' }}
        >
          {attendanceStatus ? attendanceStatus : 'Checking attendance status...'}
        </Typography>
      </Box>
      <Button
        onClick={markAttendance}
        variant="contained"
        color="primary"
        style={{ margin: '5px 0', width: '250px' }}
      >
        Mark Attendance
      </Button>
      <Box mt={6}> {}
        <Button
          onClick={() => navigate('/dashboard')}
          variant="outlined"
          style={{ 
            color: 'black', 
            borderColor: 'black', 
            width: '250px', 
            padding: '4px 8px', 
            fontSize: '0.75rem' 
          }}
        >
          Back to Dashboard
        </Button>
      </Box>
      {error && <Typography color="error" variant="body2" style={{ marginTop: '1rem' }}>{error}</Typography>}
    </Container>
  );
};

export default MarkAttendance;
