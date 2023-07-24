import { THEME } from "../constants/index.js";
import { store, useSelector } from "../store/index.js";

export function setTheme() {
  const theme = useSelector({
    store,
    selector: (state) => state.theme.currentTheme,
  });

  if (theme === THEME.DARK) {
    document.documentElement.classList.add(THEME.DARK);
  } else {
    document.documentElement.classList.remove(THEME.DARK);
  }
}
