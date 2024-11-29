import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container">
      <h1 className="display-4 text-center mb-4">Weekly Planner</h1>
      <div className="d-flex justify-content-center mb-4">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <div className="text-center">
        <Link to={`/tasks/${formatDate(selectedDate)}`} className="btn btn-primary">
          View Tasks for {selectedDate.toDateString()}
        </Link>
      </div>
    </div>
  );
}

export default Home;
