import { TEXT } from '../src/constants/index.js';
import { customQuerySelector } from '../src/utils/index.js';
import SnackBar from '../src/components/common/SnackBar.js';
import { PressStore } from './press.js';

export const toggleAlert = name => {
  const $alertModal = customQuerySelector(TEXT.ALERT_MODAL_CLASS_NAME);
  const isAlertModalOn = $alertModal.classList.contains('on');
  if (isAlertModalOn) {
    $alertModal.classList.remove('on');
    $alertModal.classList.add('off');
    $alertModal.dataset.name = name;
  } else {
    $alertModal.classList.remove('off');
    $alertModal.classList.add('on');
    $alertModal.dataset.name = '';
  }
};

export const showSnackBar = () => {
  new SnackBar(customQuerySelector(TEXT.SNACK_BAR_CLASS_NAME));
};

const pressStore = new PressStore();

export { pressStore };
