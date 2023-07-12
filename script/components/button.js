import { BUTTON } from '../constants.js';
import Icon from './Icon.js';

const Button = ({ icon, isWhite, text, onClick }) => {
  const buttonElement = document.createElement('button');
  const surfaceClass = isWhite ? 'surface_default' : 'surface_alt';

  buttonElement.className = `button border_default ${surfaceClass}`;
  buttonElement.innerHTML = Icon[icon];
  if (text) {
    buttonElement.classList.add('text_button');
    buttonElement.appendChild(document.createTextNode(text));
  }
  buttonElement.addEventListener('click', onClick);

  return buttonElement;
};

const UnSubButton = ({ withText, onClick }) => {
  return withText
    ? Button({
        icon: 'close',
        isWhite: false,
        text: BUTTON.UNSUBSCRIBE,
        onClick,
      })
    : Button({ icon: 'close', isWhite: false, onClick });
};

const SubButton = (isSub, withText = true, onClick) => {
  const subElement = document.createElement('div');
  subElement.className = 'media_hover surface_alt';
  const button = isSub
    ? Button({ icon: 'plus', isWhite: true, text: BUTTON.SUBSCRIBE, onClick })
    : UnSubButton({ withText, onClick });
  subElement.appendChild(button);

  return subElement;
};

export default Button;
export { SubButton };
