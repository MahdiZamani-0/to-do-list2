import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ToDoList from './components/ToDoList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/:day" element={<ToDoList />} />
      </Routes>
    </Router>
  );
}

export default App;

