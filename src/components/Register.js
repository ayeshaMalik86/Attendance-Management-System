import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        lastName,
        birthday,
        username,
        password,
        email,
        phoneNumber
      });
      console.log('User registered');
      navigate('/');
    } catch (err) {
      // Handle error gracefully
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'An error occurred');
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box mb={2}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Birthday"
              type="date"
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Phone Number"
              type="tel"
              variant="outlined"
              fullWidth
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
          {error && <Typography color="error" variant="body2" style={{ marginTop: '1rem' }}>{error}</Typography>}
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
