// src/components/AttendanceRecord.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

const AttendanceRecord = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttendanceRecords = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Fetch user ID from local storage
      if (!userId) {
        throw new Error('User ID not found');
      }

      const response = await axios.get(`http://localhost:5000/api/attendance/records?userId=${userId}`);
      setRecords(response.data);
    } catch (err) {
      console.error('Error fetching attendance records:', err);
      setError('Error fetching attendance records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Attendance Records
      </Typography>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f5f5f5',
          width: '100%'
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <Box textAlign="center">
            {records.length === 0 ? (
              <Typography variant="body1">No attendance records found.</Typography>
            ) : (
              records.map((record) => (
                <Box key={record._id} mb={2}>
                  <Typography variant="body2">
                    <strong>Date:</strong> {record.date}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Time:</strong> {new Date(record.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AttendanceRecord;
