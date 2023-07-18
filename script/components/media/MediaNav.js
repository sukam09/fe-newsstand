const RadioInput = (store, state, selected, name) => {
  const inputElement = document.createElement('input');

  inputElement.type = 'radio';
  inputElement.id = `${name}_select_${state}`;
  inputElement.name = `${name}_select`;
  inputElement.className = `${name}_select`;
  inputElement.defaultChecked = selected;
  inputElement.addEventListener('change', () => {
    const newState = { [name]: state };

    if (name === 'media') newState.view = store.getState().defaultView[state];
    store.setState(newState);
  });
  return inputElement;
};

const RadioLabel = (id, innerHTML) => {
  const labelElement = document.createElement('label');

  labelElement.htmlFor = id;
  labelElement.classList.add('text_weak', 'available_medium16');
  labelElement.innerHTML = innerHTML;
  return labelElement;
};

const RadioInputWrapper = (store, state, selected, name) => {
  const radioInputWrapper = document.createElement('div');

  radioInputWrapper.appendChild(RadioInput(store, state.name, selected, name));
  radioInputWrapper.appendChild(
    RadioLabel(`${name}_select_${state.name}`, state.innerHTML)
  );
  return radioInputWrapper;
};

const NavSelector = (store, states, selected, name) => {
  const navSelector = document.createElement('div');

  navSelector.classList.add(`${name}_select_wrapper`);
  states.forEach(state => {
    navSelector.appendChild(
      RadioInputWrapper(store, state, state.name === selected, name)
    );
  });
  return navSelector;
};

const MediaNav = store => {
  const state = store.getState();
  const mediaViewNav = document.createElement('nav');

  mediaViewNav.id = 'media_view_nav';
  mediaViewNav.appendChild(
    NavSelector(store, state.data.media, state.media, 'media')
  );
  mediaViewNav.appendChild(
    NavSelector(store, state.data.view, state.view, 'view')
  );
  return mediaViewNav;
};

export default MediaNav;
