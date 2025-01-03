import React from "react";
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
  { field: "checkin", headerName: "Check-In", width: 125 },
  { field: "checkout", headerName: "Check-Out", width: 125 },
  { field: "breakin", headerName: "Break-In", width: 125 },
  { field: "breakout", headerName: "Break-Out", width: 125 },
  { field: "workhours", headerName: "Work Hours", width: 125 },
  { field: "overtime", headerName: "Overtime", width: 125 },
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
  // Add more rows as necessary...
];

export default function AttendanceGrid() {
  return (
    <div style={{ height: "400px", width: "100%" }}>
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
      />
    </div>
  );
}
