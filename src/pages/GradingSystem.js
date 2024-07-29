import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';

const GradingSystem = () => {
  const [gradingCriteria, setGradingCriteria] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchGradingCriteria = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/grading/grading-criteria');
        // Filter out _id before setting the state
        const { _id, ...criteria } = response.data || {};
        setGradingCriteria(criteria);
      } catch (error) {
        console.error('Error fetching grading criteria:', error);
      }
    };

    fetchGradingCriteria();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:5000/api/grading/grading-criteria', gradingCriteria);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating grading criteria:', error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Grading System
        </Typography>
        <Typography variant="body1" paragraph>
          The current grading criteria are as follows:
        </Typography>
        <Box 
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
          style={{
            border: '1px solid #ddd',
            padding: '1rem',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '900px',
            margin: 'auto'
          }}
        >
          {Object.entries(gradingCriteria).map(([grade, threshold]) => (
            <Box 
              key={grade}
              display="flex"
              alignItems="center"
              mb={2}
              style={{ borderBottom: '1px solid #ddd', width: '100%', padding: '0.5rem 0' }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography variant="body1" textAlign="right">
                    Attendance 
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {editMode ? (
                    <TextField
                      type="number"
                      value={gradingCriteria[grade] || ''}
                      onChange={(e) => setGradingCriteria({ ...gradingCriteria, [grade]: e.target.value })}
                      margin="normal"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      style={{ width: '100%', border: '1px solid #ddd', borderRadius: '4px', padding: '0.5rem' }}
                    >
                      {threshold}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1" textAlign="center" style={{ paddingLeft: '0.5rem' }}>
                    %,
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" textAlign="center">
                    Grade
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  {editMode ? (
                    <TextField
                      value={grade.replace('_', ' ')}
                      onChange={(e) => setGradingCriteria({ ...gradingCriteria, [grade]: e.target.value })}
                      margin="normal"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      style={{ width: '100%', border: '1px solid #ddd', borderRadius: '4px', padding: '0.5rem' }}
                    >
                      {grade.replace('_', ' ')}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
        {editMode ? (
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            style={{ marginTop: '1rem' }}
          >
            Update Grading Criteria
          </Button>
        ) : (
          <Button
            onClick={() => setEditMode(true)}
            variant="outlined"
            color="primary"
            style={{ marginTop: '1rem' }}
          >
            Edit Grading Criteria
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default GradingSystem;
