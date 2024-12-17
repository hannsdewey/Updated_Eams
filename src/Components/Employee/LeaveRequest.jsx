import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const LeaveRequest = () => {
  const [requestType, setRequestType] = useState(""); // Dropdown state
  const [openModal, setOpenModal] = useState(false); // Modal visibility
  const [modalContent, setModalContent] = useState(""); // Modal content
  const [leaveType, setLeaveType] = useState(""); // Leave type state

  // Handle dropdown change
  const handleRequestChange = (event) => {
    const value = event.target.value;
    setRequestType(value);
    setModalContent(value);
    setOpenModal(true); // Open modal on selection
  };

  // Handle modal close
  const handleCloseModal = () => {
    setOpenModal(false);
    setLeaveType(""); // Reset leave type on modal close
  };

  // Handle leave type change
  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
  };

  const createCard = (title, content, subtitle) => (
    <Card
      sx={{
        width: "18rem",
        height: "8rem",
        backgroundColor: "white",
        boxShadow: 3,
        color: "black",
        marginBottom: "1rem",
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {content}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) => {
        const getStatusStyle = (status) => {
          switch (status) {
            case "Approved":
              return {
                backgroundColor: "green",
                color: "white",
                padding: "5px",
                borderRadius: "5px",
                textAlign: "center",
              };
            case "Rejected":
              return {
                backgroundColor: "red",
                color: "white",
                padding: "5px",
                borderRadius: "5px",
                textAlign: "center",
              };
            case "Pending":
              return {
                backgroundColor: "yellow",
                color: "black",
                padding: "5px",
                borderRadius: "5px",
                textAlign: "center",
              };
            default:
              return {};
          }
        };

        return <span style={getStatusStyle(params.value)}>{params.value}</span>;
      },
    },
    { field: "name", headerName: "Name", width: 110 },
    { field: "leaveType", headerName: "Leave Type", width: 110 },
    { field: "duration", headerName: "Duration", width: 110 },
    { field: "datefrom", headerName: "Date From", width: 110 },
    { field: "dateto", headerName: "Date To", width: 110 },
    { field: "notes", headerName: "Reason", width: 110 },
    { field: "addedon", headerName: "Added On", width: 110 },
  ];

  const rows = [
    {
      id: 1,
      name: "John Doe",
      leaveType: "Sick Leave",
      status: "Pending",
      duration: "72 Hours",
      datefrom: "11-09-2024",
      dateto: "11-12-2024",
      notes: "I have medical appointment",
      addedon: "11-05-2024",
    },
    {
      id: 2,
      name: "Jane Smith",
      leaveType: "Vacation",
      status: "Approved",
      duration: "72 Hours",
      datefrom: "11-09-2024",
      dateto: "11-12-2024",
      notes: "We have a family vacation",
      addedon: "11-05-2024",
    },
    {
      id: 3,
      name: "Bob Brown",
      leaveType: "Personal Leave",
      status: "Rejected",
      duration: "72 Hours",
      datefrom: "11-09-2024",
      dateto: "11-12-2024",
      notes: "To have some fun",
      addedon: "11-05-2024",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop="3rem"
      >
        <Typography variant="h4" component="h1" color="blue" fontWeight="bold">
          Leave Request
        </Typography>
        <FormControl sx={{ minWidth: 90 }}>
          <InputLabel
            id="request-select-label"
            sx={{
              fontSize: "0.75rem", // Smaller placeholder text
              lineHeight: "1.5",
            }}
          >
            Request
          </InputLabel>
          <Select
            labelId="request-select-label"
            value={requestType}
            onChange={handleRequestChange}
            label="Request"
            sx={{
              fontSize: "0.875rem", // Dropdown text size
              height: "3rem", // Smaller dropdown height
            }}
          >
            <MenuItem value="Overtime">Overtime</MenuItem>
            <MenuItem value="Leave">Leave</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography
        variant="subtitle2"
        component="p"
        color="blue"
        marginBottom="1rem"
      >
        About your leave & overtime request
      </Typography>

      {/* Cards Section */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={5}>
        {createCard("5", "Days Available", "to submit leave")}
        {createCard("3", "Pending Request", "Awaiting manager approval")}
        {createCard("0", "Days Upcoming", "0 days taken")}
      </Box>

      <Typography
        variant="subtitle2"
        component="p"
        color="blue"
        marginBottom="1rem"
      >
        Leave Request Summary
      </Typography>

      {/* DataGrid Section */}
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
        />
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {modalContent === "Overtime"
              ? "Submit Overtime Request"
              : "Submit Leave Request"}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalContent === "Overtime"
              ? "Fill out the details for your overtime request."
              : "Fill out the details for your leave request."}
          </Typography>

          {/* Conditional Input Fields */}
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            {modalContent === "Leave" && (
              <FormControl fullWidth>
                <InputLabel id="leave-type-label">Leave Type</InputLabel>
                <Select
                  labelId="leave-type-label"
                  value={leaveType}
                  onChange={handleLeaveTypeChange}
                  label="Leave Type"
                >
                  <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                  <MenuItem value="Vacation">Vacation</MenuItem>
                  <MenuItem value="Personal Leave">Personal Leave</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            )}
            <TextField label="Reason" variant="outlined" fullWidth />
            <TextField label="Date" variant="outlined" fullWidth />
            {modalContent === "Overtime" && (
              <TextField label="Hours" variant="outlined" fullWidth />
            )}
            {modalContent === "Leave" && (
              <TextField label="Duration" variant="outlined" fullWidth />
            )}
          </Box>

          {/* Submit Button */}
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseModal}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default LeaveRequest;
