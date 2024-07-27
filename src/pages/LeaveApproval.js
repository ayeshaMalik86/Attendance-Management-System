import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Paper } from '@mui/material';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const LeaveApproval = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch pending leave requests
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leave/requests/pending');
      console.log('Fetched leave requests:', response.data.leaves);  // Log fetched data
      setLeaveRequests(response.data.leaves);
    } catch (err) {
      console.error('Error fetching leave requests:', err);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleApprove = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/leave/update/${selectedLeave._id}`, { status: 'approved' });
      console.log('Approved leave request:', selectedLeave._id);  // Log approved request
      setLeaveRequests(prevLeaves => prevLeaves.filter(leave => leave._id !== selectedLeave._id));
      setOpenDialog(false);
    } catch (err) {
      console.error('Error approving leave request:', err);
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/leave/update/${selectedLeave._id}`, { status: 'rejected' });
      console.log('Rejected leave request:', selectedLeave._id);  // Log rejected request
      setLeaveRequests(prevLeaves => prevLeaves.filter(leave => leave._id !== selectedLeave._id));
      setOpenDialog(false);
    } catch (err) {
      console.error('Error rejecting leave request:', err);
    }
  };

  const handleOpenDialog = (leave) => {
    setSelectedLeave(leave);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedLeave(null);
  };

  const handleBackToDashboard = () => {
    navigate('/admindashboard'); // Navigate to the admin dashboard
  };

  return (
    <Container component="main" maxWidth="md">
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Leave Approval
        </Typography>
        <Typography variant="body1" paragraph>
          Review and manage leave requests from this page.
        </Typography>
      </Box>
      <List>
        {leaveRequests.length > 0 ? (
          leaveRequests.map(leave => (
            <ListItem key={leave._id}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  mb: 1,
                  borderRadius: 1,
                  boxShadow: 2,
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <ListItemText
                  primary={`Username: ${leave.userId.username} - Leave Type: ${leave.leaveType} - Start Date: ${new Date(leave.startDate).toLocaleDateString()} - End Date: ${new Date(leave.endDate).toLocaleDateString()}`}
                />
                <IconButton
                  edge="end"
                  aria-label="approve"
                  onClick={() => handleOpenDialog(leave)}
                  sx={{ color: '#4CAF50' }}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="reject"
                  onClick={() => handleOpenDialog(leave)}
                  sx={{ color: '#F44336', ml: 1 }}
                >
                  <CloseIcon />
                </IconButton>
              </Paper>
            </ListItem>
          ))
        ) : (
          <Typography variant="h6" component="div" align="center" sx={{ mt: 4 }}>
            No leave requests available.
          </Typography>
        )}
      </List>

      {/* Approval/Reject Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {selectedLeave && selectedLeave.status === 'pending' ? 'approve' : 'reject'} this leave request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApprove} color="primary">
            Approve
          </Button>
          <Button onClick={handleReject} color="secondary">
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      {/* Back to Admin Dashboard Button */}
      <Box textAlign="center" mt={4}>
        <Button variant="outlined" onClick={handleBackToDashboard}>
          Back to Admin Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default LeaveApproval;
