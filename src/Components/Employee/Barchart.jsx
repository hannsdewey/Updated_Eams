import React, { useState } from "react";
import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";

Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale);

const BarChartComponent = () => {
  const [viewMode] = useState("year"); // Static for now

  const attendanceData = {
    year: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Active Shifts",
          data: [22, 20, 23, 21, 24, 26, 25, 27, 23, 22, 20, 21],
          backgroundColor: "#007bff",
        },
        {
          label: "Leave Shifts",
          data: [5, 4, 6, 5, 7, 8, 6, 5, 6, 5, 4, 6],
          backgroundColor: "#28a745",
        },
        {
          label: "Absent",
          data: [2, 1, 3, 2, 1, 0, 2, 3, 1, 2, 1, 3],
          backgroundColor: "#ffc107",
        },
        {
          label: "Overtime",
          data: [10, 12, 15, 14, 16, 18, 17, 20, 15, 14, 12, 13],
          backgroundColor: "#dee2e6",
        },
      ],
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Work Hour Distribution",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        stacked: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <Box
      sx={{
        height: "300px",
        backgroundColor: "white", // Optional styling
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Bar data={attendanceData[viewMode]} options={barOptions} />
    </Box>
  );
};

export default BarChartComponent;
