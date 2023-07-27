import { THEME } from "../constants/index.js";
import { themeStore, useSelector } from "../store/index.js";

export function setTheme() {
  const theme = useSelector({
    store: themeStore,
  });

  if (theme === THEME.DARK) {
    document.documentElement.classList.add(THEME.DARK);
  } else {
    document.documentElement.classList.remove(THEME.DARK);
  }
}

export function getReplacedSrcByTheme(src, theme) {
  return src.replace(/(light|dark)/, theme);
}
