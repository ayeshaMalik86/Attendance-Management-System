import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container
      component="main"
      maxWidth="md"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to the Dashboard. Here you can access various features.
        </Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/attendance"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Access Attendance
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/leave-requests"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Leave Requests
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/attendance-record"
            variant="outlined"
            color="primary"
            fullWidth
          >
            View Attendance Records
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
