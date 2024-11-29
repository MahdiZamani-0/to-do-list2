import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ToDoItem from './ToDoItem';

function ToDoList() {
  const { day } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskNote, setTaskNote] = useState('');
  const [taskCategory, setTaskCategory] = useState('Work');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(day)) || [];
    setTasks(storedTasks);
  }, [day]);

  const saveTasks = (tasks) => {
    localStorage.setItem(day, JSON.stringify(tasks));
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const timestamp = new Date().toLocaleString();
      const newTasks = [...tasks, { text: newTask, note: taskNote, category: taskCategory, day, isCompleted: false, timestamp }];
      setTasks(newTasks);
      saveTasks(newTasks);
      setNewTask('');
      setTaskNote('');
    }
  };

  const completeTask = index => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const removeTask = index => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const editTask = (index, newText, newNote, newCategory) => {
    const newTasks = [...tasks];
    newTasks[index].text = newText;
    newTasks[index].note = newNote;
    newTasks[index].category = newCategory;
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const handleSaveAndBack = () => {
    saveTasks(tasks);
    navigate('/');
  };

  const completedTasksCount = tasks.filter(task => task.isCompleted).length;
  const totalTasksCount = tasks.length;
  const incompleteTasksCount = totalTasksCount - completedTasksCount;

  const filteredTasks = filterCategory === 'All'
    ? tasks.filter(task => task.day === day)
    : tasks.filter(task => task.day === day && task.category === filterCategory);

  return (
    <div className="container">
      <h1 className="display-4 text-center mb-4">To-Do List for {new Date(day).toDateString()}</h1>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <span>Total Tasks: {totalTasksCount}</span>
        <span style={{ color: 'green' }}>Completed Tasks: {completedTasksCount}</span>
        <span style={{ color: 'red' }}>Incomplete Tasks: {incompleteTasksCount}</span>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <input
          type="text"
          className="form-control ml-2"
          value={taskNote}
          onChange={e => setTaskNote(e.target.value)}
          placeholder="Add a note"
        />
        <select
          className="form-control ml-2"
          value={taskCategory}
          onChange={e => setTaskCategory(e.target.value)}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={addTask}>Add</button>
        </div>
      </div>
      <div className="mb-3">
        <select
          className="form-control"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
      </div>
      <div>
        {filteredTasks.map((task, index) => (
          <ToDoItem
            key={index}
            index={index}
            task={task}
            completeTask={completeTask}
            removeTask={removeTask}
            editTask={editTask}
          />
        ))}
      </div>
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-secondary mr-2" onClick={handleSaveAndBack}>Save and Back to Calendar</button>
      </div>
    </div>
  );
}

export default ToDoList;
