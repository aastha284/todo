import React, { useState } from "react";
import "./Form.css";

const Form = ({ onTaskAdd }) => {
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { description, time, completed };
    onTaskAdd(newTask);
    setDescription("");
    setTime("");
    setCompleted(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default Form;
