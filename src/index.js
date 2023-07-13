import App from './components/App.js';
import { customQuerySelector } from './utils/index.js';

new App(customQuerySelector('#root'));

export const toggleAlert = () => {
  const $alertModal = customQuerySelector('.alert-modal');
  const isAlertModalOn = $alertModal.classList.contains('on');
  if (isAlertModalOn) {
    $alertModal.classList.remove('on');
    $alertModal.classList.add('off');
  } else {
    $alertModal.classList.remove('off');
    $alertModal.classList.add('on');
  }
};
