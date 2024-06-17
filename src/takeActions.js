import { actionType } from "./reducer"; // Import the actionType from the reducer file

// Function to handle adding a new task
export const addTask = (state, dispatch) => {
  const newTaskText = state.newTask.trim(); // Trim the new task input value to remove any white spaces
  // Check if the new task input is not empty and find if the task already exists
  const existingTasks = state.tasks.find((task) => task.text === newTaskText); // Find if the task already exists in the tasks array
  if (existingTasks) {
    alert("Task already exists! Please enter a different task."); // Alert the user if the task already exists
  } else {
    const newTask = {
      id: Date.now(), // Use the current date and time as the id
      text: newTaskText, // Set the text of the task to the value of the new task input
      completed: false, // Set the completed status of the task to false
    };
    dispatch({ type: actionType.ADD_TASK, payload: newTask }); // Update the tasks state with the new task
  }
};

// Function to handle Add Task Button
export const handleAddTask = (state, dispatch) => {
  const newTaskText = state.newTask.trim(); // Trim the new task input value to remove any white spaces
  if (newTaskText === "") {
    alert("Please enter a task before adding."); // Alert the user if the new task input is empty
  } else {
    addTask(state, dispatch); // Call the addTask function with the state and dispatch as arguments
  }
};

// Function to handle marking a task as completed
export const toggleTaskCompletion = (taskId, dispatch) => {
  dispatch({ type: actionType.TOGGLE_TASK, payload: taskId });
};

// Function to handle filtering tasks based on completion status
export const filterTasks = (state) => {
  // Check the value filter is completed then Filter the tasks to only include completed tasks
  if (state.filter === "completed") {
    return state.tasks.filter((task) => task.completed);
  }
  // Check the value filter is incomplete then Filter the tasks to only include incomplete tasks
  else if (state.filter === "incomplete") {
    return state.tasks.filter((task) => !task.completed);
  }
  return state.tasks; // Return all tasks if the filter value is all
};

// Function to handle deleting a task
export const deleteTask = (taskId, dispatch) => {
  dispatch({ type: actionType.DELETE_TASK, payload: taskId });
};
