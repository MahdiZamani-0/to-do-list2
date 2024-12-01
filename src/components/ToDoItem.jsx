import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

function ToDoItem({ task, index, completeTask, removeTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newNote, setNewNote] = useState(task.note);
  const [newCategory, setNewCategory] = useState(task.category); // اضافه کردن دسته‌بندی جدید

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newText.trim() !== '') {
      editTask(index, newText, newNote, newCategory); // اضافه کردن دسته‌بندی جدید به تابع ویرایش
      setIsEditing(false);
    }
  };

  return (
    <div
      className="todo-item p-2 mb-2 rounded d-flex justify-content-between align-items-center flex-wrap"
      style={{
        backgroundColor: '#E5E1DA', // رنگ پس‌زمینه تسک
        border: 'none' // حذف بوردر
      }}
    >
      <div style={{ maxWidth: '70%' }}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="form-control mb-2"
              style={{ border: 'none', outline: 'none' }} // حذف بوردر و outline
              onFocus={(e) => e.target.style.outline = 'none'} // حذف outline هنگام فوکوس
            />
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="form-control mb-2"
              placeholder="Add a note"
              style={{ border: 'none', outline: 'none' }} // حذف بوردر و outline
              onFocus={(e) => e.target.style.outline = 'none'} // حذف outline هنگام فوکوس
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="form-control mb-2"
              style={{ border: 'none', outline: 'none' }} // حذف بوردر و outline
              onFocus={(e) => e.target.style.outline = 'none'} // حذف outline هنگام فوکوس
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
            </select>
          </>
        ) : (
          <>
            <span
              style={{
                textDecoration: task.isCompleted ? 'line-through' : '',
                color: task.isCompleted ? 'gray' : 'black', // تغییر رنگ متن به خاکستری برای تسک‌های کامل شده
                wordWrap: 'break-word',
                whiteSpace: 'normal',
                maxWidth: '100%'
              }}
            >
              {task.text}
            </span>
            {task.note && (
              <small className="d-block text-muted">
                {task.note}
              </small>
            )}
          </>
        )}
      </div>
      <div className="d-flex flex-column align-items-end mt-2">
        <div className="d-flex justify-content-end flex-wrap mb-2">
          {isEditing ? (
            <button
              className="btn btn-sm mr-2"
              onClick={handleSave}
              disabled={newText.trim() === ''}
              style={{ backgroundColor: 'white', border: 'none', outline: 'none', color: '#77dd77' }} // حذف بوردر و outline، رنگ و پس‌زمینه دکمه سیو
              onFocus={(e) => e.target.style.outline = 'none'} // حذف outline هنگام فوکوس
            >
              <FontAwesomeIcon icon={faFloppyDisk} color="gray" />
            </button>
          ) : (
            <>
              <button
                className="btn btn-sm mr-2 mb-1"
                onClick={handleEdit}
                style={{ backgroundColor: 'white', border: 'none', outline: 'none' }} // حذف بوردر و outline
                onFocus={(e) => e.target.style.outline = 'none'} // حذف outline هنگام فوکوس
              >
                <FontAwesomeIcon icon={faPenToSquare} color="gray" />
              </button>
              <button
                className="btn btn-sm mr-2 mb-1"
                onClick={() => completeTask(index)}
                style={{ backgroundColor: 'white', border: 'none', outline: 'none' }} // حذف بوردر و outline
                onFocus={(e) => e.target.style.outline = 'none'} // حذف outline هنگام فوکوس
              >
                <FontAwesomeIcon icon={faCheck} color="#77dd77" />
              </button>
              <button
                className="btn btn-sm mb-1"
                onClick={() => removeTask(index)}
                style={{ backgroundColor: 'white', border: 'none', outline: 'none' }} // حذف بوردر و outline
                onFocus={(e) => e.target.style.outline = 'none'} // حذف outline هنگام فوکوس
              >
                <FontAwesomeIcon icon={faTrash} color="#ff6961" />
              </button>
            </>
          )}
        </div>
        <div className="d-flex flex-column align-items-end w-100">
          <span className="badge badge-secondary mb-2" style={{ border: 'none', backgroundColor: 'white', color: '#B3C8CF' }}>#{task.category}</span>
          <small className="text-muted" style={{ fontSize: '0.8em', textAlign: 'right' }}>
            {task.timestamp}
          </small>
        </div>
      </div>
    </div>
  );
}

export default ToDoItem;
