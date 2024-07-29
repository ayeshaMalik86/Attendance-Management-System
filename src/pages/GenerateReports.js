import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';

const GenerateReports = () => {
  const [reports, setReports] = useState([]);
  const [gradingCriteria, setGradingCriteria] = useState({});

  useEffect(() => {
    const fetchGradingCriteria = async () => {
      try {
        // Fetch grading criteria from the backend
        const response = await axios.get('http://localhost:5000/api/grading-criteria');
        setGradingCriteria(response.data);
      } catch (error) {
        console.error('Error fetching grading criteria:', error);
      }
    };

    const fetchReports = async () => {
      try {
        // Fetch reports from the backend
        const response = await axios.get('http://localhost:5000/api/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchGradingCriteria();
    fetchReports();
  }, []);

  const calculateGrade = (attendance) => {
    if (attendance >= gradingCriteria.A) return 'Grade A';
    if (attendance >= gradingCriteria.A_minus) return 'Grade A-';
    if (attendance >= gradingCriteria.B_plus) return 'Grade B+';
    if (attendance >= gradingCriteria.B) return 'Grade B';
    if (attendance >= gradingCriteria.B_minus) return 'Grade B-';
    if (attendance >= gradingCriteria.C_plus) return 'Grade C+';
    if (attendance >= gradingCriteria.C) return 'Grade C';
    if (attendance >= gradingCriteria.C_minus) return 'Grade C-';
    if (attendance >= gradingCriteria.D_plus) return 'Grade D+';
    if (attendance >= gradingCriteria.D) return 'Grade D';
    return 'Grade F';
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Reports
        </Typography>
        {reports.length === 0 ? (
          <Typography variant="body1">No reports available.</Typography>
        ) : (
          <Box>
            {reports.map((report) => (
              <Box key={report.userId} mb={2}>
                <Typography variant="body1">
                  {`User: ${report.username}, Attendance: ${report.attendance}, Grade: ${calculateGrade(report.attendance)}`}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default GenerateReports;
