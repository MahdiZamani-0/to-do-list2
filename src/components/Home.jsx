import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import '../calender.css';

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // فرض می‌کنیم تسک‌ها در localStorage ذخیره شده‌اند
    const storedTasks = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)));
    setTasks(storedTasks.flat()); // تسک‌ها را از localStorage دریافت و ذخیره می‌کنیم
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const isDayWithTask = (date) => {
    return tasks.some(task => task.day === formatDate(date));
  };

  return (
    <Container>
      <h1 style={{ color: '#89A8B2' }} className="display-4 text-center mb-4">Weekly Planner</h1>
      <Row className="justify-content-center align-items-center mb-4" style={{ height: '50vh' }}>
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date, view }) => (isDayWithTask(date) ? 'task-day' : '')} // افزودن کلاس سفارشی برای روزهای دارای تسک
          />
          <Link to={`/tasks/${formatDate(selectedDate)}`}>
            <Button style={{ backgroundColor: '#6c757d', border: 'none' }} variant="primary" className="mt-3">
              View Tasks for {selectedDate.toDateString()}
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
