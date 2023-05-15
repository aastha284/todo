import React from "react";
import "./TaskList.css";

const TaskList = ({ tasks, onTaskComplete, onTaskDelete }) => {
  const handleDelete = (taskId) => {
    onTaskDelete(taskId);
  };

  const handleComplete = (taskId, completed) => {
    onTaskComplete(taskId, completed);
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id} className={task.completed ? "completed" : ""}>
          <div className="task-info">
            <span className="task">{task.description}</span>
            <span className="time">{task.time}</span>
          </div>
          <div className="task-actions">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(task._id, !task.completed)}
            />
            <button
              className="delete-button"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
