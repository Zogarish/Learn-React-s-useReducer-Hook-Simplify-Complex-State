import React, { useReducer } from "react"; // Import the useReducer hooks
import "./App.css"; // Import the App.css file to style the application
import { initialState, reducer, actionType } from "./reducer"; // Import the initialState, reducer, and actionType from the reducer file
import {
  addTask,
  toggleTaskCompletion,
  filterTasks,
  deleteTask,
} from "./takeActions"; // Import the addTask, toggleTaskCompletion, filterTasks, and deleteTask functions

// Create a function component called App for Task Manager Functionality
function App() {
  const [state, dispatch] = useReducer(reducer, initialState); // Use the useReducer hook to create a state and dispatch function

  // Return the JSX for the App component
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          value={state.newTask} // Set the value of the input to the newTask state
          onChange={(e) =>
            dispatch({ type: actionType.SET_NEW_TASK, payload: e.target.value })
          } // Update the newTask state with the value of the input
          placeholder="Enter a new task"
        />
        <button onClick={() => addTask(state, dispatch)}>Add Task</button>{" "}
        {/* Call the addTask function with the state and dispatch as arguments */}
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="all"
            checked={state.filter === "all"}
            onChange={() =>
              dispatch({ type: actionType.SET_FILTER, payload: "all" })
            }
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="completed"
            checked={state.filter === "completed"}
            onChange={() =>
              dispatch({ type: actionType.SET_FILTER, payload: "completed" })
            }
          />
          Completed
        </label>
        <label>
          <input
            type="radio"
            value="incomplete"
            checked={state.filter === "incomplete"}
            onChange={() =>
              dispatch({ type: actionType.SET_FILTER, payload: "incomplete" })
            }
          />
          Incomplete
        </label>
      </div>
      <ul>
        {filterTasks(state).map((task) => (
          <li key={task.id}>
            <span
              // Add a style attribute to conditionally apply a line-through style to the task text
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
              onClick={() => toggleTaskCompletion(task.id, dispatch)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id, dispatch)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
