import React, { useState } from 'react';

function ToDoItem({ task, index, completeTask, removeTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newNote, setNewNote] = useState(task.note);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newText.trim() !== '') {
      editTask(index, newText, newNote);
      setIsEditing(false);
    }
  };

  return (
    <div
      className="todo-item p-2 mb-2 border rounded d-flex justify-content-between align-items-center flex-wrap"
      style={{ backgroundColor: task.isCompleted ? 'lightgreen' : 'lightcoral' }}
    >
      <div style={{ maxWidth: '70%' }}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="form-control mb-2"
              placeholder="Add a note"
            />
          </>
        ) : (
          <>
            <span
              style={{
                textDecoration: task.isCompleted ? 'line-through' : '',
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
      <div className="d-flex flex-column align-items-end">
        <small className="text-muted mb-2" style={{ fontSize: '0.8em' }}>
          {task.timestamp}
        </small>
        <div className="d-flex justify-content-end flex-wrap">
          {isEditing ? (
            <button
              className="btn btn-success btn-sm mr-2"
              onClick={handleSave}
              disabled={newText.trim() === ''}
            >
              💾
            </button>
          ) : (
            <>
              <button className="btn btn-warning btn-sm mr-2 mb-1" onClick={handleEdit}>✏</button>
              <button
                className="btn btn-sm mr-2 mb-1"
                onClick={() => completeTask(index)}
                style={{
                  color: task.isCompleted ? 'green' : 'gray',
                  fontSize: '1.2em'
                }}
              >
                ☑
              </button>
              <button className="btn btn-danger btn-sm mb-1" onClick={() => removeTask(index)}>✖</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDoItem;
