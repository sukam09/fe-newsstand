import { store } from "../store/index.js";

export const setTheme = () => {
  const theme = store.getState().theme;

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
