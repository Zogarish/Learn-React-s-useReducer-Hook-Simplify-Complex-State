import React, { useState } from "react";
import "./App.css";

function App() {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);

  // State to store the input value for a new task
  const [newTask, setNewTask] = useState("");

  // State to store the filter option (all, completed, or incomplete)
  const [filter, setFilter] = useState("all");
  // Function to handle adding a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  // Function to handle marking a task as completed
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Function to handle filtering task based on completion status
  const filterTasks = () => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    } else if (filter === "incomplete") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  };

  return (
    <div className="App">
      <h1> Task Manager </h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="all"
            checked={filter === "all"}
            onChange={() => setFilter("all")}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="completed"
            checked={filter === "completed"}
            onChange={() => setFilter("completed")}
          />
          Completed
        </label>
        <label>
          <input
            type="radio"
            value="incomplete"
            checked={filter === "incomplete"}
            onChange={() => setFilter("incomplete")}
          />
          Incomplete
        </label>
      </div>
      <ul>
        {filterTasks().map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
