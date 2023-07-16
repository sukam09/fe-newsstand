import { SNACKBAR_DELAY } from '../constants';

const SnackBar = msg => {
  const snackBar = document.createElement('div');

  snackBar.className =
    'snack_bar surface_brand_default text_white_default shadow';
  snackBar.innerHTML = msg;
  setTimeout(() => {
    snackBar.remove();
  }, SNACKBAR_DELAY);
  return snackBar;
};

export default SnackBar;
