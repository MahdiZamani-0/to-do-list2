import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ToDoItem from './ToDoItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faFlagCheckered, faCircleExclamation, faListOl, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import '../App.css'; // اطمینان از وجود و درستی مسیر فایل CSS

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

  const handleBackToCalendar = () => {
    navigate('/'); // بازگشت به صفحه اصلی (تقویم)
  };

  const completedTasksCount = tasks.filter(task => task.isCompleted).length;
  const totalTasksCount = tasks.length;
  const incompleteTasksCount = totalTasksCount - completedTasksCount;

  const filteredTasks = filterCategory === 'All'
    ? tasks.filter(task => task.day === day)
    : tasks.filter(task => task.day === day && task.category === filterCategory);

  return (
    <div className="container" style={{ backgroundColor: '#F1F0E8', border: 'none', padding: '20px' }}> {/* پس‌زمینه کلی */}
      <h1 className="display-4 text-center mb-4" style={{ color: '#89A8B2', fontSize: '2rem' }}>To-Do List for {new Date(day).toDateString()}</h1>
      <div className="mb-3 d-flex justify-content-between align-items-center task-summary" style={{ border: 'none', backgroundColor: '#E5E1DA', padding: '5px', borderRadius: '5px' }}>
        <span className="total-tasks"><FontAwesomeIcon icon={faListOl} /> {totalTasksCount}</span>
        <span className="completed-tasks"><FontAwesomeIcon icon={faFlagCheckered} /> {completedTasksCount}</span>
        <span className="incomplete-tasks"><FontAwesomeIcon icon={faCircleExclamation} /> {incompleteTasksCount}</span>
      </div>
      <div className="input-group mb-3" style={{ border: 'none' }}>
        <input
          type="text"
          className="form-control"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add task"
          style={{ border: 'none' }}
        />
        <input
          type="text"
          className="form-control ml-2"
          value={taskNote}
          onChange={e => setTaskNote(e.target.value)}
          placeholder="Add note"
          style={{ border: 'none' }}
        />
        <select
          className="form-control ml-2"
          value={taskCategory}
          onChange={e => setTaskCategory(e.target.value)}
          style={{ border: 'none' }}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
        <div className="input-group-append" style={{ border: 'none' }}>
          <button 
            className="btn btn-primary add-task-btn"
            onClick={addTask}
            style={{ backgroundColor: '#89A8B2', color: 'white', border: 'none' }} // تغییر رنگ بک‌گراند و آیکون دکمه افزودن تسک
          >
            <FontAwesomeIcon icon={faSquarePlus} />
          </button>
        </div>
      </div>
      <div className="mb-3" style={{ border: 'none' }}>
        <select
          className="form-control"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          style={{ border: 'none' }}
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
      <div className="d-flex justify-content-end mt-4" style={{ border: 'none' }}>
        <button className="btn btn-secondary" onClick={handleBackToCalendar} style={{ border: 'none' }}>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </button>
      </div>
    </div>
  );
}

export default ToDoList;
