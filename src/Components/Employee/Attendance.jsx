import React, { useState, useEffect } from "react";

// Simulating fetching data from a database (replace with actual API call)
const fetchAttendanceData = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          employeeId: "E001",
          fullname: "John Doe",
          date: "2024-12-10",
          scheduleIn: "09:00 AM",
          scheduleOut: "05:00 PM",
          breakIn: "01:00 PM",
          breakOut: "02:00 PM",
          workHours: "7h",
          status: "Present",
          overtime: "1h",
        },
        {
          employeeId: "E002",
          fullname: "Jane Smith",
          date: "2024-12-10",
          scheduleIn: "09:00 AM",
          scheduleOut: "05:00 PM",
          breakIn: "12:30 PM",
          breakOut: "01:30 PM",
          workHours: "8h",
          status: "Absent",
          overtime: "0h",
        },
        {
          employeeId: "E003",
          fullname: "Mark Johnson",
          date: "2024-12-10",
          scheduleIn: "08:00 AM",
          scheduleOut: "04:00 PM",
          breakIn: "12:00 PM",
          breakOut: "01:00 PM",
          workHours: "7h",
          status: "Late",
          overtime: "2h",
        },
      ]);
    }, 1000)
  );
};

const Attendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState("Clock In");
  const [attendanceData, setAttendanceData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("December");

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAttendanceData();
      setAttendanceData(data);
    };
    loadData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  const toggleStatus = () => {
    setStatus((prevStatus) => (prevStatus === "Clock In" ? "Clock Out" : "Clock In"));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "#4caf50";
      case "Absent":
        return "#f44336";
      case "Late":
        return "#ffc107";
      default:
        return "#9e9e9e";
    }
  };

  const filteredData = filter === "all" ? attendanceData : attendanceData.filter((data) => data.status === "Late");

  return (
    <div style={{ marginLeft: "0", marginTop: "3rem", padding: "20px", width: "100%" }}>
      {/* Dashboard Header */}
      <div style={{ backgroundColor: "#f8f9fa", padding: "15px 20px", marginBottom: "20px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h4 style={{ margin: 0 }}>Hello, John Doe</h4>
            <p style={{ fontSize: "14px", color: "gray", marginTop: "5px" }}>Welcome back to the Raddacon Call Center</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>{formattedTime}</div>
              <div style={{ fontSize: "12px", color: "gray" }}>{formattedDate}</div>
            </div>
            <div
              style={{
                padding: "8px 16px",
                backgroundColor: status === "Clock In" ? "#4caf50" : "#f44336",
                color: "white",
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "center",
                minWidth: "100px",
                cursor: "pointer",
              }}
              onClick={toggleStatus}
            >
              {status}
            </div>
          </div>
        </div>
      </div>

      {/* View Month Dropdown and Filter Buttons Container */}
      
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
  {/* View Month Dropdown */}
  <div style={{ display: "flex", alignItems: "center" }}>
    <label style={{ fontSize: "14px", marginRight: "10px" }}>View Month:</label>
    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      style={{
        padding: "8px 16px",
        height: "39px",
        width: "172px",
        backgroundColor: "#f8f9fa",
        border: "none",
        borderRadius: "5px",
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  </div>

  {/* Filter Buttons (Aligned to the Right) */}
  <div style={{ display: "flex", gap: "10px" }}>
    <button
      onClick={() => setFilter("all")}
      style={{
        padding: "8px 16px",
        height: "39px",
        width: "172px",
        backgroundColor: filter === "all" ? "#007bff" : "#f8f9fa",
        color: filter === "all" ? "white" : "#007bff",
        border: "1px solid transparent",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Attendance
    </button>
    <button
      onClick={() => setFilter("late")}
      style={{
        padding: "8px 16px",
        height: "39px",
        width: "172px",
        backgroundColor: filter === "late" ? "#007bff" : "#f8f9fa",
        color: filter === "late" ? "white" : "#007bff",
        border: "1px solid transparent",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Late Attendance
    </button>
  </div>
</div>

      {/* Attendance Table */}
      <div>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", fontSize: "14px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
          <thead>
            <tr>
              {[
                "Employee ID",
                "Full Name",
                "Date",
                "Schedule In",
                "Schedule Out",
                "Break In",
                "Break Out",
                "Work Hours",
                "Status",
                "Overtime",
              ].map((header) => (
                <th key={header} style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2", fontSize: "14px" }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((key) => (
                  <td
                    key={key}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: key === "status" ? getStatusColor(row[key]) : "transparent",
                      color: key === "status" ? "white" : "black",
                      fontSize: "14px",
                    }}
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
