import { SNACKBAR_DELAY } from '../constants.js';

const SnackBar = (msg, action) => {
  const snackBar = document.createElement('div');

  snackBar.classList.add(
    'snack_bar',
    'surface_brand_default',
    'text_white_default',
    'shadow',
    'fade_in'
  );
  snackBar.innerText = msg;
  setTimeout(() => {
    if (!snackBar.parentNode) return;
    snackBar.remove();
    if (action) action();
  }, SNACKBAR_DELAY);
  return snackBar;
};

export default SnackBar;
