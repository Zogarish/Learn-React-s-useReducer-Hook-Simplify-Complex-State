import React, { useState, useReducer } from "react"; // Import the useState and useReducer hooks
import "./App.css"; // Import the App.css file to style the application

// Create a function component called App for Task Manager Functionality
function App() {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);

  // State to store the value of the new task input
  const [newTask, setNewTask] = useState("");

  // State to store the filter option (all, completed, or incomplete)
  const [filter, setFilter] = useState("all");

  // Function to handle adding a new task
  const addTask = () => {
    // Check if the new task input is not empty by trimming the value removing any white spaces
    if (newTask.trim() !== "") {
      // Create a new task object with an id, text, and completed status
      const task = {
        id: Date.now(), // Use the current date and time as the id
        text: newTask, // Set the text of the task to the value of the new task input
        completed: false, // Set the completed status of the task to false
      };
      setTasks([...tasks, task]); // Update the task state using the spread operator to create a new array with the new task and the existing tasks
      setNewTask(""); // Reset the new task input value to an empty string
    }
  };

  // Function to handle marking a task as completed
  const toggleTaskCompletion = (taskId) => {
    // Map over the tasks and update the completed status of the task with the matching id
    const updatedTasks = tasks.map((task) => {
      // Check if the task id matches the id of the task being marked as completed
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task; // Return the task if there is no match
    });
    setTasks(updatedTasks); // Update the tasks state with the updated tasks
  };

  // Function to handle filtering tasks based on completion status
  const filterTasks = () => {
    // Check the value filter is completed then Filter the tasks to only include completed tasks
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }
    // Check the value filter is incomplete then Filter the tasks to only include incomplete tasks
    else if (filter === "incomplete") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks; // Return all tasks if the filter value is all
  };

  // Return the JSX for the App component
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          value={newTask} // Set the value of the input to the newTask state
          onChange={(e) => setNewTask(e.target.value)} // Update the newTask state with the value of the input
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
              // Add a style attribute to conditionally apply a line-through style to the task text
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
