import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "date", headerName: "Date", width: 150 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      const getStatusStyle = (status) => {
        return {
          backgroundColor: status === "Present" ? "green" : "red",
          color: "white",
          padding: "5px",
          borderRadius: "5px",
          textAlign: "center",
        };
      };

      return <span style={getStatusStyle(params.value)}>{params.value}</span>;
    },
  },
  {
    field: "checkin",
    headerName: "Check-In",
    width: 125,
  },
  {
    field: "checkout",
    headerName: "Check-Out",
    width: 125,
  },
  {
    field: "breakin",
    headerName: "Break-In",
    width: 125,
  },
  {
    field: "breakout",
    headerName: "Break-Out",
    width: 125,
  },
  {
    field: "workhours",
    headerName: "Work Hours",
    width: 125,
  },
  {
    field: "overtime",
    headerName: "Overtime",
    width: 125,
  },
];

const rows = [
  {
    id: 1,
    date: "Dec 11, 2024",
    status: "Present",
    checkin: "8:00pm",
    checkout: "6:00am",
    breakin: "1:00am",
    breakout: "2:00am",
    workhours: "10hrs",
    overtime: "N/A",
  },
  {
    id: 2,
    date: "Dec 11, 2024",
    status: "Absent",
    checkin: "8:00pm",
    checkout: "6:00am",
    breakin: "1:00am",
    breakout: "2:00am",
    workhours: "10hrs",
    overtime: "N/A",
  },
  {
    id: 3,
    date: "Dec 11, 2024",
    status: "Present",
    checkin: "8:00pm",
    checkout: "6:00am",
    breakin: "1:00am",
    breakout: "2:00am",
    workhours: "10hrs",
    overtime: "N/A",
  },
  {
    id: 4,
    date: "Dec 11, 2024",
    status: "Present",
    checkin: "8:00pm",
    checkout: "6:00am",
    breakin: "1:00am",
    breakout: "2:00am",
    workhours: "10hrs",
    overtime: "N/A",
  },
  {
    id: 5,
    date: "Dec 11, 2024",
    status: "Present",
    checkin: "8:00pm",
    checkout: "6:00am",
    breakin: "1:00am",
    breakout: "2:00am",
    workhours: "10hrs",
    overtime: "N/A",
  },
  {
    id: 6,
    date: "Dec 11, 2024",
    status: "Present",
    checkin: "8:00pm",
    checkout: "6:00am",
    breakin: "1:00am",
    breakout: "2:00am",
    workhours: "10hrs",
    overtime: "N/A",
  },
  {
    id: 7,
    date: "Dec 11, 2024",
    status: "Present",
    checkin: "8:00pm",
    checkout: "6:00am",
    breakin: "1:00am",
    breakout: "2:00am",
    workhours: "10hrs",
    overtime: "N/A",
  },
  {
    id: 8,
    date: "Dec 11, 2024",
    status: "Present",
    checkin: "8:00pm",
    checkout: "6:00am",
    breakin: "1:00am",
    breakout: "2:00am",
    workhours: "10hrs",
    overtime: "N/A",
  },
  {
    id: 9,
    date: "Dec 11, 2024",
    status: "Present",
    checkin: "8:00pm",
    checkout: "6:00am",
    breakin: "1:00am",
    breakout: "2:00am",
    workhours: "10hrs",
    overtime: "N/A",
  },
  {
    id: 10,
    date: "Dec 11, 2024",
    status: "Present",
    checkin: "8:00pm",
    checkout: "6:00am",
    breakin: "1:00am",
    breakout: "2:00am",
    workhours: "10hrs",
    overtime: "N/A",
  },
];

export default function DataGridDemo() {
  return (
    <Box
      m="5px"
      marginTop="5%"
      display="flex"
      flexDirection="column"
      height="calc(100vh - 100px)"
    >
      <Typography variant="h4" component="h1" color="blue" fontWeight="bold">
        Attendance
      </Typography>
      <Typography
        variant="subtitle2"
        component="p"
        color="blue"
        marginBottom="1rem"
      >
        Your summary and history
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: rows.length,
            },
          },
        }}
        disableRowSelectionOnClick
        sx={{
          flexGrow: 1,
        }}
      />
    </Box>
  );
}
