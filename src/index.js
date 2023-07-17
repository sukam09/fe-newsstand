import App from './components/App.js';
import SnackBar from './components/common/SnackBar.js';
import { TEXT } from './constants/index.js';
import { customQuerySelector } from './utils/index.js';

const $app = new App(customQuerySelector('#root'));

export const toggleDarkMode = () => {
  document.body.className = document.body.className === 'dark' ? 'light' : 'dark';
  $app.render();
};

export const toggleAlert = () => {
  const $alertModal = customQuerySelector(TEXT.ALERT_MODAL_CLASS_NAME);
  const isAlertModalOn = $alertModal.classList.contains('on');
  if (isAlertModalOn) {
    $alertModal.classList.remove('on');
    $alertModal.classList.add('off');
  } else {
    $alertModal.classList.remove('off');
    $alertModal.classList.add('on');
  }
};

export const showSnackBar = type => {
  new SnackBar(customQuerySelector(TEXT.SNACK_BAR_CLASS_NAME), { type });
};
