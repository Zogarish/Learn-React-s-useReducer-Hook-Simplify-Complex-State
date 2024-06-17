import { actionType } from "./reducer"; // Import the actionType from the reducer file

// Function to handle adding a new task
export const addTask = (state, dispatch) => {
  // Check if the new task input is not empty by trimming the value removing any white spaces
  if (state.newTask.trim() !== "") {
    // Create a new task object with an id, text, and completed status
    const task = {
      id: Date.now(), // Use the current date and time as the id
      text: state.newTask, // Set the text of the task to the value of the new task input
      completed: false, // Set the completed status of the task to false
    };
    dispatch({ type: actionType.ADD_TASK, payload: task }); // Update the tasks state with the new task
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
