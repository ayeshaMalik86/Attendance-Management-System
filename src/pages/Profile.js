import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');

    if (!userId) {
      navigate('/user-login'); // Redirect to login page if userId is not found
    } else {
      setUsername(storedUsername || ''); // Set username if found
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/'); // Redirect to home page after sign out
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Profile
      </Typography>
      <Box
        component="div"
        style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
      >
        <Typography variant="h6" gutterBottom>
          Username: {username}
        </Typography>
        <Button
          onClick={handleSignOut}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Out
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
