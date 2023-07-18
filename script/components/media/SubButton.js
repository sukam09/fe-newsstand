import { BUTTON, MSG, SUB_MEDIA } from '../../constants.js';
import Button from '../Button.js';
import SnackBar from '../SnackBar.js';

const SubButton = (id, action, withText = true) => {
  if (SUB_MEDIA.includes(id)) {
    return Button({
      icon: 'close',
      isWhite: false,
      text: withText ? BUTTON.UNSUBSCRIBE : null,
      onClick: () => {
        console.log(`${id} unsubscribe alert`);
      },
    });
  }
  return Button({
    icon: 'plus',
    isWhite: true,
    text: BUTTON.SUBSCRIBE,
    once: true,
    onClick: () => {
      document
        .querySelector('#media_view')
        .appendChild(SnackBar(MSG.SUBSCRIBE, action));
    },
  });
};

export const SubButtonArea = (id, action) => {
  const subButtonArea = document.createElement('div');

  subButtonArea.classList.add('media_hover', 'surface_alt');
  subButtonArea.appendChild(SubButton(id, action));
  return subButtonArea;
};

export default SubButton;
