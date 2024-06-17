export const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  newTask: "",
  filter: "all",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const updatedTasks = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return {
        ...state,
        tasks: updatedTasks,
        newTask: "",
      };
    case "TOGGLE_TASK":
      const toggledTasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(toggledTasks));
      return {
        ...state,
        tasks: toggledTasks,
      };
    case "DELETE_TASK":
      const deletedTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem("tasks", JSON.stringify(deletedTasks));
      return {
        ...state,
        tasks: deletedTasks,
      };
    case "SET_NEW_TASK":
      return {
        ...state,
        newTask: action.payload,
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export const actionType = {
  ADD_TASK: "ADD_TASK",
  TOGGLE_TASK: "TOGGLE_TASK",
  DELETE_TASK: "DELETE_TASK",
  SET_NEW_TASK: "SET_NEW_TASK",
  SET_FILTER: "SET_FILTER",
};
