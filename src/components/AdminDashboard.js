import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const buttonStyle = {
    margin: '5px 0', // Reduced margin for less space between buttons
    width: '250px'   // Fixed width for all buttons
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          Manage various aspects of the system from here.
        </Typography>
      </Box>
      <Grid container spacing={1} direction="column" alignItems="center"> {/* Reduced spacing */}
        <Grid item>
          <Button
            component={Link}
            to="/view-student-record"
            variant="contained"
            color="primary"
            style={buttonStyle}
          >
            View All Student Records
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/manage-attendance"
            variant="contained"
            color="secondary"
            style={buttonStyle}
          >
            Manage Attendance
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/generate-reports"
            variant="outlined"
            color="primary"
            style={buttonStyle}
          >
            Generate Reports
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/leave-approval"
            variant="contained"
            color="success"
            style={buttonStyle}
          >
            Leave Approval
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/grading-system"
            variant="outlined"
            color="secondary"
            style={buttonStyle}
          >
            Grading System
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
