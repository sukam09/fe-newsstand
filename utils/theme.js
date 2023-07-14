import { useSelector } from "../store/index.js";

export const setTheme = () => {
  const theme = useSelector((state) => state.theme.currentTheme);

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
