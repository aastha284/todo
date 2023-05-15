import React, { useEffect, useState } from "react";
import Header from "./Header";
import Form from "./Form";
import TaskList from "./TaskList";
import "./App.css";


const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched tasks:", data); // Logging tasks to check if data is fetched correctly
        setTasks(data);
      } else {
        console.error("Error fetching tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskAdd = async (newTask) => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        console.log("Task created successfully");
        fetchTasks();
      } else {
        console.error("Error creating task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Task deleted successfully");
        fetchTasks();
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  const handleTaskComplete = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: true }),
        }
      );
      if (response.ok) {
        console.log("Task marked as completed successfully");
        fetchTasks();
      } else {
        console.error("Error marking task as completed");
      }
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  return (
    <div className="App">
      <Header />
      <br/>
      <Form onTaskAdd={handleTaskAdd} />
      <h3>To-Do List</h3>
      <TaskList
        tasks={tasks}
        onTaskComplete={handleTaskComplete}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
};

export default App;
