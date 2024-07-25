import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      console.log('Response:', response);
      if (!response.data) {
        throw new Error('No data received');
      }
      const { token } = response.data;

      // Decode token to get userId and role
      const decoded = jwtDecode(token);
      if (decoded.role === 'admin') {
        setError('Invalid credentials'); // Set error message for user trying to login as admin
      } else {
        localStorage.setItem('userId', decoded.id); // Store userId in localStorage
        navigate('/dashboard'); // Redirect to user dashboard
      }
    } catch (err) {
      console.error(err.response.data.error);
      setError(err.response.data.error || 'An error occurred');
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        User Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        {error && <Typography color="error" variant="body2" style={{ marginTop: '1rem' }}>{error}</Typography>}
      </Box>
    </Container>
  );
}

export default UserLogin;
