import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const buttonStyle = {
    margin: '5px 0', // Reduced margin for less space between buttons
    width: '250px',  // Fixed width for all buttons
  };

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
      <Grid container spacing={1} direction="column" alignItems="center"> {/* Vertical layout */}
        <Grid item>
          <Button
            component={Link}
            to="/mark-attendance"
            variant="contained"
            color="success"
            style={buttonStyle}
          >
            Mark Attendance
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/leave-requests"
            variant="contained"
            color="secondary"
            style={buttonStyle}
          >
            Leave Requests
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/attendance-records"
            variant="contained"
            color="primary" // Set to "primary" for blue background
            style={{ ...buttonStyle, color: '#fff' }} // Override text color to white
          >
            View Attendance Records
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/profile"
            variant="outlined"
            color="info"
            style={buttonStyle}
          >
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
