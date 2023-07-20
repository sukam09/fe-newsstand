import { THEME } from '../../constants.js';

const setTheme = theme => {
  if (theme === 'dark') {
    document.documentElement.setAttribute(THEME.ATTR, THEME.DARK);
  } else {
    document.documentElement.removeAttribute(THEME.ATTR);
  }
};

const toggleMode = () => {
  const isDark =
    document.documentElement.getAttribute(THEME.ATTR) === THEME.DARK;

  setTheme(isDark ? THEME.LIGHT : THEME.DARK);
};

const themeModeApp = () => {
  const themeToggle = document.querySelector('#theme_toggle');

  setTheme();
  themeToggle.addEventListener('click', toggleMode);
};

export default themeModeApp;
