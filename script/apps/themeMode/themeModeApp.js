import { THEME } from '../../constants.js';

const toggleMode = themeStore => {
  const newTheme =
    themeStore.getState().theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;

  themeStore.setState({ theme: newTheme });
};

const themeModeApp = themeStore => {
  const themeToggle = document.querySelector('#theme_toggle');
  const setTheme = state => {
    if (state.theme === THEME.DARK) {
      document.documentElement.setAttribute(THEME.ATTR, THEME.DARK);
    } else {
      document.documentElement.removeAttribute(THEME.ATTR);
    }
  };

  setTheme(themeStore.getState());
  themeStore.subscribe(setTheme);
  document.eventManager.register('click', themeToggle, () =>
    toggleMode(themeStore)
  );
};

export default themeModeApp;
