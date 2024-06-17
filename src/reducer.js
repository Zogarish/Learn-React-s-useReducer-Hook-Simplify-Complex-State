// Define the initial state for the application
export const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [], // Initialize the tasks array from local storage or an empty array
  newTask: "", // Initialize the new task input value
  filter: "all", // Initialize the filter value to "all"
};

// Create a reducer function to handle state updates based on actions
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const updatedTasks = [...state.tasks, action.payload]; // Add the new task to the tasks array
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update the tasks in local storage
      return {
        ...state,
        tasks: updatedTasks,
        newTask: "",
      }; // Return the updated state with the new tasks array and an empty new task
    case "TOGGLE_TASK":
      const toggledTasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      ); // Toggle the completed status of the task with the matching id
      localStorage.setItem("tasks", JSON.stringify(toggledTasks)); // Update the tasks in local storage
      return {
        ...state,
        tasks: toggledTasks,
      }; // Return the updated state with the toggled tasks array
    case "DELETE_TASK":
      const deletedTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      ); // Filter out the task with the matching id
      localStorage.setItem("tasks", JSON.stringify(deletedTasks)); // Update the tasks in local storage
      return {
        ...state,
        tasks: deletedTasks,
      }; // Return the updated state with the filtered tasks array
    case "SET_NEW_TASK":
      return {
        ...state,
        newTask: action.payload,
      }; // Return the updated state with the new task value
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      }; // Return the updated state with the new filter value
    default:
      return state; // Return the current state if the action type is not recognized
  }
};

// Define the action types for the reducer
export const actionType = {
  ADD_TASK: "ADD_TASK",
  TOGGLE_TASK: "TOGGLE_TASK",
  DELETE_TASK: "DELETE_TASK",
  SET_NEW_TASK: "SET_NEW_TASK",
  SET_FILTER: "SET_FILTER",
};
