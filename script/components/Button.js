import Store from '../core/Store.js';
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
  buttonElement.addEventListener('click', once ? onClickOnce : onClick);
  return buttonElement;
};

const newSubButton = (id, navStore, withText = true) => {
  const store = new Store({
    id,
    subscribed,
  });
  const subscribed = navStore.getState().subscribed.includes(id);
  const subButtonData = {
    icon: 'plus',
    isWhite: true,
    text: BUTTON.SUBSCRIBE,
    once: true,
  };
  const unsubButtonData = {
    icon: 'close',
    isWhite: false,
    text: withText ? BUTTON.UNSUBSCRIBE : null,
  };
  const buttonData = subscribed ? unsubButtonData : subButtonData;

  const draw = () => {
    return Button({
      ...buttonData,
      onClick: () => {
        store.setState({ subscribed: !subscribed });
      },
    });
  };

  store.subscribe(draw);
  return draw();
};

export default Button;
