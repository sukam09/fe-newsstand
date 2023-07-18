import { TEXT } from '../src/constants/index.js';
import { customQuerySelector } from '../src/utils/index.js';
import SnackBar from '../src/components/common/SnackBar.js';

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
