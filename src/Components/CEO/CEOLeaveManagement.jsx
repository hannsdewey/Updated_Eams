import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CEOLeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");

  // Sample data: leave requests from employees
  const allLeaveRequests = [
    {
      id: 1,
      employeeName: "John Doe",
      leaveType: "Vacation",
      startDate: "2024-12-20",
      endDate: "2024-12-25",
      status: "Pending",
      reason: "Family vacation",
      manager: "Jane Smith",
      comments: "", // No initial comment
    },
    {
      id: 2,
      employeeName: "Michael Scott",
      leaveType: "Sick",
      startDate: "2024-12-22",
      endDate: "2024-12-23",
      status: "Approved",
      reason: "Medical emergency",
      manager: "Jessica Lee",
      comments: "", // No initial comment
    },
    {
      id: 3,
      employeeName: "Jim Halpert",
      leaveType: "Vacation",
      startDate: "2024-12-24",
      endDate: "2024-12-28",
      status: "Rejected",
      reason: "Holiday plans",
      manager: "Michael Scott",
      comments: "", // No initial comment
    },
  ];

  useEffect(() => {
    setLeaveRequests(allLeaveRequests);
  }, []);

  // Open leave request details modal
  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setStatus(request.status);
    setComments(request.comments); // Set initial comments in the modal
    setOpenModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Handle approve/reject action for leave requests
  const handleLeaveStatusChange = (status) => {
    const updatedRequests = leaveRequests.map((request) =>
      request.id === selectedRequest.idgit
        ? { ...request, status: status, comments: comments } // Save comments along with the status
        : request
    );
    setLeaveRequests(updatedRequests);
    handleCloseModal();
  };

  // Count the leave requests based on their status
  const getLeaveStatusCount = (status) => {
    return leaveRequests.filter((request) => request.status === status).length;
  };

  return (
    <Box sx={{ padding: "1rem", width: "99.9%", marginTop: "2rem" }}>
      {/* Title */}
      <Typography variant="h4" component="h1" color="blue" fontWeight="bold">
        Leave Management
      </Typography>
      <Typography
        variant="subtitle2"
        component="p"
        color="blue"
        marginLeft="0.2rem"
      >
        Manage their leave request
      </Typography>

      {/* Card Section for Leave Status Counts with Shadow Background */}
      <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
        <Grid item xs={12} sm={4}>
          <Card
            variant="outlined"
            sx={{
              boxShadow: 3, // Add shadow effect to the card
              backgroundColor: "#f5f5f5", // Light grey background
              padding: "1rem",
            }}
          >
            <CardHeader title="Approved" />
            <CardContent>
              <Typography variant="h5" color="primary">
                {getLeaveStatusCount("Approved")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            variant="outlined"
            sx={{
              boxShadow: 3, // Add shadow effect to the card
              backgroundColor: "#f5f5f5", // Light grey background
              padding: "1rem",
            }}
          >
            <CardHeader title="Rejected" />
            <CardContent>
              <Typography variant="h5" color="error">
                {getLeaveStatusCount("Rejected")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            variant="outlined"
            sx={{
              boxShadow: 3, // Add shadow effect to the card
              backgroundColor: "#f5f5f5", // Light grey background
              padding: "1rem",
            }}
          >
            <CardHeader title="Pending" />
            <CardContent>
              <Typography variant="h5" color="secondary">
                {getLeaveStatusCount("Pending")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Leave Requests Grid */}
      <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ padding: "1rem" }}>
            <DataGrid
              rows={leaveRequests}
              columns={[
                { field: "employeeName", headerName: "Employee", width: 200 },
                { field: "leaveType", headerName: "Leave Type", width: 150 },
                { field: "startDate", headerName: "Start Date", width: 150 },
                { field: "endDate", headerName: "End Date", width: 150 },
                { field: "status", headerName: "Status", width: 150 },
                {
                  field: "actions",
                  headerName: "Actions",
                  renderCell: (params) => (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(params.row)}
                    >
                      View
                    </Button>
                  ),
                },
              ]}
              autoHeight
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Leave Request Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Leave Request Details</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box>
              <Typography variant="body1" color="blue">
                Employee: {selectedRequest.employeeName}
              </Typography>
              <Typography variant="body1" color="blue">
                Leave Type: {selectedRequest.leaveType}
              </Typography>
              <Typography variant="body1" color="blue">
                Start Date: {selectedRequest.startDate}
              </Typography>
              <Typography variant="body1" color="blue">
                End Date: {selectedRequest.endDate}
              </Typography>
              <Typography variant="body1" color="blue">
                Reason: {selectedRequest.reason}
              </Typography>

              <FormControl fullWidth sx={{ marginTop: "1rem" }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>

              {/* CEO's Comments Section */}
              <TextField
                label="Add Comments/Notes"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                sx={{ marginTop: "1rem" }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
          <Button
            onClick={() => handleLeaveStatusChange(status)}
            color="primary"
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CEOLeaveManagement;
