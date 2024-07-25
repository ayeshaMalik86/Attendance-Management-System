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

  return (
    <Container
      component="main"
      maxWidth="md"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Mark Attendance
      </Typography>
      <Box textAlign="center" mb={4}>
        <Typography variant="body1" paragraph>
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
      <Box mt={6}> {/* Increased top margin to push button lower */}
        <Button
          onClick={() => navigate('/dashboard')}
          variant="outlined"
          style={{ 
            color: 'black', 
            borderColor: 'black', 
            width: '120px', 
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
