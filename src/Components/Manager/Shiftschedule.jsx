import React, { useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import './shiftschedule.css';

const ShiftSchedule = () => {
  const [selectedDate, setSelectedDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [assignee, setAssignee] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  const options = years.flatMap((year) =>
    months.map((month, index) => ({
      value: { month: index, year },
      label: `${month} ${year}`,
    }))
  );

  const handleDateChange = (selectedOption) => {
    setSelectedDate(selectedOption.value);
  };

  const renderDays = () => {
    const { month, year } = selectedDate;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={i} className="calendar-day">
          <span className="day-number">{i}</span>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Shift Schedule</h2>
        <div className="calendar-controls">
          <Select
            options={options}
            onChange={handleDateChange}
            defaultValue={{
              value: { month: selectedDate.month, year: selectedDate.year },
              label: `${months[selectedDate.month]} ${selectedDate.year}`,
            }}
            className="calendar-dropdown"
            isSearchable={false}
          />
          <button
            className="calendar-btn"
            onClick={() => setShowModal(true)} // Open the modal
          >
            Create Shift
          </button>
        </div>
      </div>
      <div className="calendar-grid">
        <div className="calendar-days-header">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
            (day) => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            )
          )}
        </div>
        <div className="calendar-days-container">{renderDays()}</div>
      </div>

      {/* Full-Screen Bootstrap Modal */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed', // Position the modal to cover the full screen
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
            zIndex: 1050, // Make sure modal is on top
            overflow: 'hidden', // Prevent scrolling
          }}
        >
          <div
            className="modal-dialog"
            style={{
              width: '463px',
              height: '590px', // Auto height for responsiveness
              margin: 'auto', // Ensure it stays centered
            }}
          >
            <div className="modal-content" style={{ height: '100%' }}>
              {/* Modal Header (No Close Button) */}
              <div
  className="modal-header"
  style={{
    borderBottom: 'none', // Remove line under the header
    justifyContent: 'left', // Center the modal title
    textAlign: 'left', // Center the text of both header and subheader
    padding: '10px 0', // Add some padding for spacing
    marginLeft: '30px',
  }}
>
  <div>
    <h5 className="modal-title">Create Shift</h5>
    <h6>Set Employee Schedules with Ease</h6> {/* Subheader */}
  </div>
</div>
              {/* Modal Body */}
              <div className="modal-body">
               
                {/* Assignee */}
                <div className="mb-3">
                  <label htmlFor="assignee" className="form-label" style={{ fontWeight: 'bold', fontSize: 'medium' }}>
                    Assignee
                  </label>
                  <input
                    type="text"
                    id="assignee"
                    className="form-control"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    placeholder="Enter Employee Name"
                  />
                </div>

                {/* Schedule Date */}
                <div className="mb-3">
                  <label htmlFor="scheduleDate" className="form-label" style={{ fontWeight: 'bold', fontSize: 'medium' }}>
                    Set Schedule Date
                  </label>
                  <input
                    type="date"
                    id="scheduleDate"
                    className="form-control"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  />
                </div>

                {/* Schedule Time */}
                <div className="mb-3">
                  <label htmlFor="scheduleTime" className="form-label" style={{ fontWeight: 'bold', fontSize: 'medium' }}>
                    Set Schedule Time
                  </label>
                  <input
                    type="time"
                    id="scheduleTime"
                    className="form-control"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div
                className="modal-footer"
                style={{
                  borderTop: 'none', // Remove line above the footer
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)} // Close the modal
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save Shift
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftSchedule;
