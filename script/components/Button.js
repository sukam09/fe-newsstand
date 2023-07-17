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

export default Button;
