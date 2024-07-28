import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, List, ListItem, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

const ViewStudentRecord = () => {
  const [users, setUsers] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user');
        console.log('Users fetched successfully:', response.data); // Debugging
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log(`Deleting User ${userToDelete}`);
      await axios.delete(`http://localhost:5000/api/user/${userToDelete}`);
      setUsers(users.filter(user => user._id !== userToDelete));
      setOpenDeleteDialog(false);
      setUserToDelete(null);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleDetailClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
      console.log('User details fetched:', response.data); // Debugging
      const user = response.data;
      setCurrentUserDetails({
        ...user,
        birthday: new Date(user.birthday).toLocaleDateString() // Ensure valid date format
      });
      setOpenDetailDialog(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Users
        </Typography>
        <Typography variant="body1" paragraph>
          Select a user to view and manage their details.
        </Typography>
      </Box>
      <List>
        {users.map((user, index) => {
          console.log(`Rendering user:`, user); // Debugging
          return (
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
                  {`${index + 1}. ${user.firstName || 'First Name Not Available'} ${user.lastName || 'Last Name Not Available'}`}
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
                <IconButton
                  edge="end"
                  aria-label="edit"
                  sx={{ position: 'absolute', right: 40, color: '#2074d4' }}
                  onClick={() => navigate(`/edit-user/${user._id}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{ position: 'absolute', right: 72, color: '#D63748' }}
                  onClick={() => handleDeleteClick(user._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            </ListItem>
          );
        })}
      </List>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
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
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {currentUserDetails ? (
            <Paper
              elevation={2}
              sx={{
                p: 2,
                mb: 1,
                borderRadius: 1,
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: 550,
              }}
            >
              <Typography variant="body1"><strong>Username:</strong> {currentUserDetails.username}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {currentUserDetails.email}</Typography>
              <Typography variant="body1"><strong>Phone Number:</strong> {currentUserDetails.phoneNumber}</Typography>
              <Typography variant="body1"><strong>First Name:</strong> {currentUserDetails.firstName || 'First Name Not Available'}</Typography>
              <Typography variant="body1"><strong>Last Name:</strong> {currentUserDetails.lastName || 'Last Name Not Available'}</Typography>
              <Typography variant="body1"><strong>Birthday:</strong> {currentUserDetails.birthday}</Typography>
            </Paper>
          ) : (
            <Typography variant="body2">No details available.</Typography>
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

export default ViewStudentRecord;
