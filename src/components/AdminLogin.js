import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      const { token } = response.data;

      // Decode token to check role
      const decoded = jwtDecode(token);
      if (decoded.role === 'user') {
        setError('Invalid credentials'); 
      } else {
        navigate('/admindashboard'); 
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
        Admin Login
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

export default AdminLogin;
