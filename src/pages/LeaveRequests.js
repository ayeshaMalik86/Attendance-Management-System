import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Grid, TextField, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';  // Import dayjs for date formatting

const LeaveRequests = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userId, setUserId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState([]);

  useEffect(() => {
    // Fetch userId from local storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleRequestLeave = async () => {
    setIsRequesting(true);
    try {
      if (!userId || !leaveType || !startDate || !endDate) {
        setStatusMessage('All fields are required');
        setIsRequesting(false);
        return;
      }

      const response = await axios.post('http://localhost:5000/api/leave/request', {
        userId,
        leaveType,
        startDate,
        endDate,
      });

      setStatusMessage('Leave requested successfully');
    } catch (error) {
      setStatusMessage(error.response?.data?.error || 'Error requesting leave');
      console.error('Error requesting leave:', error.response?.data || error.message);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleCheckStatus = async () => {
    try {
      if (!userId) {
        setStatusMessage('User ID is required to check status');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/leave/status', {
        params: { userId }
      });

      if (response.data.leaves.length === 0) {
        setStatusMessage('No leave requests found');
      } else {
        setLeaveStatus(response.data.leaves);
        setOpenDialog(true);
      }
    } catch (error) {
      setStatusMessage(error.response?.data?.error || 'Error checking leave status');
      console.error('Error checking leave status:', error.response?.data || error.message);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'approved') return 'green';
    if (status === 'rejected') return 'red';
    return 'blue';
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Leave Requests
        </Typography>
        <Typography variant="body1" paragraph>
          Here you can request leave and check the status of your leave requests.
        </Typography>
      </Box>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h6">Request Leave</Typography>
          <TextField
            label="Leave Type"
            variant="outlined"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Start Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="End Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRequestLeave}
            disabled={isRequesting}
          >
            {isRequesting ? <CircularProgress size={24} /> : 'Request Leave'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCheckStatus}
          >
            Check Leave Status
          </Button>
        </Grid>
        <Grid item>
          {statusMessage && <Typography variant="body1">{statusMessage}</Typography>}
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Leave Status</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><b>Leave Type</b></TableCell>
                  <TableCell align="center"><b>Start Date</b></TableCell>
                  <TableCell align="center"><b>End Date</b></TableCell>
                  <TableCell align="center"><b>Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveStatus.map((leave, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{leave.leaveType}</TableCell>
                    <TableCell align="center">{dayjs(leave.startDate).format('YYYY-MM-DD')}</TableCell>
                    <TableCell align="center">{dayjs(leave.endDate).format('YYYY-MM-DD')}</TableCell>
                    <TableCell align="center" style={{ color: getStatusColor(leave.status) }}>
                      {leave.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LeaveRequests;
