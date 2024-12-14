import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import './shiftschedule.css';

const ShiftSchedule = () => {
  const [selectedDate, setSelectedDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [showModal, setShowModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [holidays, setHolidays] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [shiftCreated, setShiftCreated] = useState(false);

  // Mock data for employee names (replace with actual database in real app)
  const employees = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alex Johnson' },
    { id: 4, name: 'Emily Davis' },
    { id: 5, name: 'Michael Brown' },
  ];

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

  // Fetch holidays using Calendarific API
  const fetchHolidays = async () => {
    try {
      const year = selectedDate.year;
      const month = selectedDate.month + 1; // Calendar months are 1-based
      const response = await fetch(
        `https://calendarific.com/api/v2/holidays?api_key=YOUR_API_KEY&country=PH&year=${year}&month=${month}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch holidays');
      }
      const data = await response.json();
      setHolidays(data.response.holidays || []);
    } catch (error) {
      console.error('Error fetching holidays:', error);
      setHolidays([]); // Handle the error gracefully
    }
  };

  // UseEffect to fetch holidays whenever the selected month/year changes
  useEffect(() => {
    fetchHolidays();
  }, [selectedDate]);

  // Check if the given day is a holiday
  const isHoliday = (date) => {
    return holidays.some((holiday) => holiday.date === date);
  };

  const handleDateChange = (selectedOption) => {
    setSelectedDate(selectedOption.value);
  };

  const handleEmployeeSelection = (id) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((employeeId) => employeeId !== id) // Unselect if already selected
        : [...prevSelected, id] // Select if not selected
    );
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
      const dayString = `${year}-${month + 1 < 10 ? '0' + (month + 1) : month + 1}-${i < 10 ? '0' + i : i}`;
      days.push(
        <div key={i} className={`calendar-day ${isHoliday(dayString) ? 'holiday' : ''}`}>
          <span className="day-number">{i}</span>
          {isHoliday(dayString) && <a href="https://www.timeanddate.com/holidays/philippines" target="_blank" rel="noopener noreferrer">Holiday Info</a>}
        </div>
      );
    }
    return days;
  };

  // Handle saving the shift (e.g., store the shift data or trigger API)
  const handleCreateShift = () => {
    if (scheduleDate && scheduleTime && selectedEmployees.length > 0) {
      // Save shift logic (e.g., API call, state update)
      console.log('Shift Created:', {
        scheduleDate,
        scheduleTime,
        employees: selectedEmployees,
      });
      setShiftCreated(true);
    } else {
      alert('Please fill out all fields and select at least one employee.');
    }
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
          <button className="calendar-btn" onClick={() => setShowModal(true)}>Create Shift</button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-days-header">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
        </div>
        <div className="calendar-days-container">{renderDays()}</div>
      </div>

      {/* Full-Screen Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1050 }}>
          <div className="modal-dialog" style={{ width: '463px', height: '590px', margin: 'auto' }}>
            <div className="modal-content" style={{ height: '100%' }}>
              {/* Modal Header */}
              <div className="modal-header" style={{ borderBottom: 'none', justifyContent: 'left', padding: '10px 0', marginLeft: '30px' }}>
                <div>
                  <h5 className="modal-title">Create Shift</h5>
                  <h6>Set Employee Schedules with Ease</h6>
                </div>
              </div>
              {/* Modal Body */}
              <div className="modal-body">
                <div className="mb-3 d-flex align-items-center">
                  <label htmlFor="scheduleDate" className="form-label mb-0" style={{ fontWeight: 'bold', fontSize: '14px', width: '150px' }}>
                    Set Schedule Date
                  </label>
                  <input
                    type="date"
                    id="scheduleDate"
                    className="form-control"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    style={{ flex: 1 }}
                  />
                </div>

                {/* Schedule Time */}
                <div className="mb-3 d-flex align-items-center">
                  <label htmlFor="scheduleTime" className="form-label mb-0" style={{ fontWeight: 'bold', fontSize: '14px', width: '150px' }}>
                    Set Schedule Time
                  </label>
                  <input
                    type="time"
                    id="scheduleTime"
                    className="form-control"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    style={{ flex: 1 }}
                  />
                </div>

                {/* Awaiting Scheduling */}
                <div className="mb-3">
                  <label htmlFor="search" className="form-label mb-0" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    Awaiting Scheduling
                  </label>

                  {/* Employee Selection Table */}
                  <table className="table">
                    <thead>
                      
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee.id}>
                          <td>{employee.name}</td>
                          <td>
                            <input
                            
                              type="checkbox"
                              id={`employee-${employee.id}`}
                              checked={selectedEmployees.includes(employee.id)}
                              onChange={() => handleEmployeeSelection(employee.id)}
                              style={{ fontSize: '6px'}}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer" style={{ borderTop: 'none' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleCreateShift}>
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
