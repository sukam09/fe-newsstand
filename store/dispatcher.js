import { store } from "./store.js";

export const dispatcher = (action) => {
  switch (action.type) {
    case "FETCH_SUBSCRIPTIONS_SUCCESS":
      store.subscriptions = action.subscriptions;
      break;
    case "TOGGLE_SUBSCRIPTIONS":
      const { name, value } = action;
      store.subscriptions.find((item) => item.name === name).subscribe = value;
      break;
    case "CHANGE_MODE":
      store.isDarkMode = action.mode;
      break;
    default:
      break;
  }
};
