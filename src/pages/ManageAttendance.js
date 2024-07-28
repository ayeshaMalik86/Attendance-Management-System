import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

const ManageAttendance = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const [role, setRole] = useState(''); // State for user role
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = localStorage.getItem('userRole');
      setRole(userRole);
    };

    fetchRole();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users from /api/user'); // Debugging statement
        const response = await axios.get('http://localhost:5000/api/user');
        console.log('Users fetched successfully:', response.data); // Debugging statement
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err); // Debugging statement
      }
    };

    fetchUsers();
  }, []);

  const fetchAttendanceRecords = async (userId) => {
    try {
      console.log(`Fetching attendance records for user ID ${userId}`); // Debugging statement
      const response = await axios.get(`http://localhost:5000/api/attendance/records?userId=${userId}`);
      console.log('Attendance records fetched successfully:', response.data); // Debugging statement
      setAttendanceRecords(response.data);
      setSelectedUser(userId);
    } catch (err) {
      console.error('Error fetching attendance records:', err); // Debugging statement
    }
  };

  const handleDeleteClick = (recordId) => {
    setRecordToDelete(recordId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log(`Deleting attendance record ID ${recordToDelete}`); // Debugging statement
      await axios.delete(`http://localhost:5000/api/attendance/${recordToDelete}`);
      setAttendanceRecords(attendanceRecords.filter(record => record._id !== recordToDelete));
      setOpenDeleteDialog(false);
      setRecordToDelete(null);
    } catch (err) {
      console.error('Error deleting attendance record:', err); // Debugging statement
    }
  };

  const handleEditClick = (recordId) => {
    // Implement edit functionality here
  };

  const handleDetailClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/attendance/records?userId=${userId}`);
      setCurrentUserDetails(response.data);
      setOpenDetailDialog(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/admin-dashboard'); // Navigate back to the Admin Dashboard
  };

  return (
    <Container component="main" maxWidth="md">
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Attendance
        </Typography>
        <Typography variant="body1" paragraph>
          Select a user to view and manage their attendance records.
        </Typography>
      </Box>
      <List>
        {users.map((user, index) => (
          <ListItem
            key={user._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              p: 1,
              borderRadius: 1,
              boxShadow: 0,
              bgcolor: 'transparent'
            }}
          >
            <Paper
              elevation={3}
              sx={{
                flexGrow: 1,
                p: 1,
                borderRadius: 1,
                boxShadow: 2,
                bgcolor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                minWidth: 300,
                position: 'relative'
              }}
            >
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {`${index + 1}. ${user.firstName} ${user.lastName}`}
              </Typography>
              <IconButton
                edge="end"
                aria-label="info"
                onClick={() => handleDetailClick(user._id)}
                sx={{ position: 'absolute', right: 8, color: '#2074d4' }}
                title="Show Details"
              >
                <InfoIcon />
              </IconButton>
            </Paper>
          </ListItem>
        ))}
      </List>
      {selectedUser && (
        <>
          <Typography variant="h6" mb={2}>Attendance Records</Typography>
          <List>
            {attendanceRecords.map(record => (
              <ListItem key={record._id}>
                <ListItemText primary={`Date: ${record.date} - Time: ${new Date(record.timestamp).toLocaleTimeString()}`} />
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(record._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(record._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Box textAlign="center" mt={4}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBackToDashboard}
              sx={{ width: '100%' }}
            >
              Back to Dashboard
            </Button>
          </Box>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Attendance Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this attendance record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Details Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        fullscreen
        maxWidth="sm"
      >
        <DialogTitle>User Attendance Details</DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {currentUserDetails && currentUserDetails.length > 0 ? (
            <List
              sx={{
                width: '100%',
                maxWidth: 600, // Adjust this size based on your content
                overflow: 'auto',
              }}
            >
              {currentUserDetails.map(record => (
                <ListItem key={record._id}>
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
                      maxWidth: 550, // Adjust this size based on your content
                    }}
                  >
                    <ListItemText primary={`Date: ${record.date} - Time: ${new Date(record.timestamp).toLocaleTimeString()}`} />
                    <Box sx={{ display: 'flex', ml: 2 }}>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(record._id)} sx={{ color: '#2074d4' }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(record._id)} sx={{ color: '#D63748', ml: 1 }}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2">Nothing to show.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageAttendance;
