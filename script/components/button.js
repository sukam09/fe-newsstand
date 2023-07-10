import Icon from './icon.js';

const Button = (icon, isWhite, text, onClick) => {
  const buttonElement = document.createElement('button');

  buttonElement.className = `button border_default`;
  buttonElement.classList.add(isWhite ? 'surface_default' : 'surface_alt');
  buttonElement.innerHTML = Icon[icon];
  if (text) {
    buttonElement.classList.add('text_button');
    buttonElement.innerHTML += text;
  }
  buttonElement.addEventListener('click', onClick);

  return buttonElement;
};

const subButton = isSub => {
  const subElement = document.createElement('div');
  subElement.className = 'media_hover  surface_alt';
  const button = isSub
    ? Button('plus', 'white', '구독하기')
    : Button('close', 'gray', '해지하기');
  subElement.appendChild(button);
  return subElement;
};

export default Button;
export { subButton };
