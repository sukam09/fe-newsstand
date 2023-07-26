import Icon from './Icon.js';

const Button = ({ icon, isWhite, text, once, onClick }) => {
  const buttonElement = document.createElement('button');
  const surfaceClass = isWhite ? 'surface_default' : 'surface_alt';
  let clicked = false;

  const onClickOnce = () => {
    if (once && clicked) return;
    clicked = true;
    onClick(buttonElement);
  };

  buttonElement.className = `button border_default ${surfaceClass}`;
  buttonElement.innerHTML = Icon[icon];
  if (text) {
    buttonElement.classList.add('text_button');
    buttonElement.appendChild(document.createTextNode(text));
  }
  document.eventManager.register('click', buttonElement, onClickOnce, 'button');
  return buttonElement;
};
export default Button;
