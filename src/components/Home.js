import React from 'react';
import { Container, Typography, Button, List, ListItem, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}
    >
      <Box textAlign="center" mb={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          Attendance Management System
        </Typography>
      </Box>
      <Typography variant="body1" paragraph align="center">
        Please choose an option:
      </Typography>
      <List>
        <ListItem>
          <Button
            component={Link}
            to="/user-login"
            variant="contained"
            color="primary"
            fullWidth
          >
            User Login
          </Button>
        </ListItem>
        <ListItem>
          <Button
            component={Link}
            to="/admin-login"
            variant="contained"
            color="secondary"
            fullWidth
          >
            Admin Login
          </Button>
        </ListItem>
        <ListItem>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            color="primary"
            fullWidth
          >
            Register
          </Button>
        </ListItem>
      </List>
    </Container>
  );
};

export default Home;
