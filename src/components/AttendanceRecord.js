// src/components/AttendanceRecord.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';

const AttendanceRecord = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  const fetchAttendanceRecords = async () => {
    try {
      // Assuming userId is stored in local storage
      const userId = localStorage.getItem('userId') || 'defaultUserId'; // Replace with actual logic
      const response = await axios.get(`/api/attendance/records?userId=${userId}`);
      setRecords(response.data);
    } catch (err) {
      console.error('Error fetching attendance records:', err);
      setError('Error fetching attendance records');
    }
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Attendance Records
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {records.map(record => (
          <Grid item xs={12} sm={6} md={4} key={record._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Username: {/* Fetch the username from the user data or pass it from server */}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Date: {record.date}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Time: {new Date(record.timestamp).toLocaleTimeString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AttendanceRecord;
