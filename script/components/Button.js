import Icon from './Icon.js';

const Button = ({ icon, isWhite, text, once, onClick }) => {
  const buttonElement = document.createElement('button');
  const surfaceClass = isWhite ? 'surface_default' : 'surface_alt';
  const onClickOnce = e => {
    onClick(e);
    buttonElement.removeEventListener('click', onClickOnce);
  };

  buttonElement.className = `button border_default ${surfaceClass}`;
  buttonElement.innerHTML = Icon[icon];
  if (text) {
    buttonElement.classList.add('text_button');
    buttonElement.appendChild(document.createTextNode(text));
  }
  document.eventManager.register(
    'click',
    buttonElement,
    once ? onClickOnce : () => onClick(buttonElement)
  );
  return buttonElement;
};
export default Button;
