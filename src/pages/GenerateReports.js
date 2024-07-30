import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, List, ListItem, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const GenerateReports = () => {
  const [reports, setReports] = useState([]);
  const [gradingCriteria, setGradingCriteria] = useState({});
  const [users, setUsers] = useState([]);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [selectedUserReport, setSelectedUserReport] = useState(null);
  const [reportGenerated, setReportGenerated] = useState(false);

  useEffect(() => {
    const fetchGradingCriteria = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/grading/grading-criteria');
        setGradingCriteria(response.data);
      } catch (error) {
        console.error('Error fetching grading criteria:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchGradingCriteria();
    fetchUsers();
  }, []);

  const calculateAttendancePercentage = (records) => {
    const totalDays = records.reduce((acc, record) => {
      const date = new Date(record.date);
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Exclude weekends
        acc.totalDays += 1;
        if (record.attendance === 'present') {
          acc.presentDays += 1;
        }
      }
      return acc;
    }, { totalDays: 0, presentDays: 0 });

    if (totalDays.totalDays === 0) return 0; // Avoid division by zero

    return (totalDays.presentDays / totalDays.totalDays) * 100;
  };

  const calculateGrade = (attendancePercentage) => {
    if (attendancePercentage >= gradingCriteria.A) return 'Grade A';
    if (attendancePercentage >= gradingCriteria.A_minus) return 'Grade A-';
    if (attendancePercentage >= gradingCriteria.B_plus) return 'Grade B+';
    if (attendancePercentage >= gradingCriteria.B) return 'Grade B';
    if (attendancePercentage >= gradingCriteria.B_minus) return 'Grade B-';
    if (attendancePercentage >= gradingCriteria.C_plus) return 'Grade C+';
    if (attendancePercentage >= gradingCriteria.C) return 'Grade C';
    if (attendancePercentage >= gradingCriteria.C_minus) return 'Grade C-';
    if (attendancePercentage >= gradingCriteria.D_plus) return 'Grade D+';
    if (attendancePercentage >= gradingCriteria.D) return 'Grade D';
    return 'Grade F';
  };

  const handleDetailClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/attendance/records/past-two-months?userId=${userId}`);
      const records = response.data;
      const attendancePercentage = calculateAttendancePercentage(records);
      const grade = calculateGrade(attendancePercentage);

      setSelectedUserReport({
        userId,
        attendancePercentage,
        grade
      });
      setOpenReportDialog(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleCloseReportDialog = () => {
    setOpenReportDialog(false);
    setSelectedUserReport(null);
  };

  const handleGenerateReports = async () => {
    try {
      const userIdList = users.map(user => user._id);
      const reportPromises = userIdList.map(userId =>
        axios.get(`http://localhost:5000/api/attendance/records/past-two-months?userId=${userId}`)
      );

      const responses = await Promise.all(reportPromises);
      const allRecords = responses.map(response => response.data);
      const userReports = allRecords.map((records, index) => {
        const userId = userIdList[index];
        const user = users.find(user => user._id === userId); // Find user details
        const attendancePercentage = calculateAttendancePercentage(records);
        return {
          userId,
          firstName: user.firstName,
          lastName: user.lastName,
          attendance: attendancePercentage
        };
      });

      setReports(userReports);
      setReportGenerated(true);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Generate Reports
      </Typography>
      <List>
        {users.map((user, index) => (
          <ListItem
          key={user._id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1,
            p: 1,
            borderRadius: 1,
            boxShadow: 0,
            bgcolor: 'transparent'
          }}
          >
            <Paper
              elevation={3}
              sx={{
                flexGrow: 1,
                p: 1,
                borderRadius: 1,
                boxShadow: 2,
                bgcolor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                minWidth: 300,
                position: 'relative'
              }}
            >
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
              {`${index + 1}. ${user.firstName} ${user.lastName}`}
              </Typography>
              <IconButton
                edge="end"
                aria-label="info"
                onClick={() => handleDetailClick(user._id)}
                sx={{ color: '#2074d4' }}
                title="Show Details"
                disabled={!reportGenerated}
              >
                <InfoIcon />
              </IconButton>
            </Paper>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" color="primary" onClick={handleGenerateReports}>
          Generate Report
        </Button>
      </Box>

      {/* Report Dialog */}
      <Dialog open={openReportDialog} onClose={handleCloseReportDialog} maxWidth="sm" fullWidth>
        <DialogTitle>User Attendance Report</DialogTitle>
        <DialogContent>
          {selectedUserReport ? (
            <>
              <Typography>Attendance Percentage: {selectedUserReport.attendancePercentage}%</Typography>
              <Typography>{selectedUserReport.grade}</Typography>
            </>
          ) : (
            <Typography>No report available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReportDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GenerateReports;
