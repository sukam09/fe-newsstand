const RadioInput = (viewStore, state, selected, name) => {
  const inputElement = document.createElement('input');

  inputElement.type = 'radio';
  inputElement.id = `${name}_select_${state}`;
  inputElement.name = `${name}_select`;
  inputElement.className = `${name}_select`;
  inputElement.defaultChecked = selected;
  inputElement.addEventListener('change', () => {
    const newState = { [name]: state };

    if (name === 'media')
      newState.view = viewStore.getState().defaultView[state];
    viewStore.setState(newState);
  });
  return inputElement;
};

const RadioInputWrapper = (viewStore, state, selected, name) => {
  const radioInputWrapper = document.createElement('div');

  radioInputWrapper.appendChild(
    RadioInput(viewStore, state.name, selected, name)
  );
  radioInputWrapper.insertAdjacentHTML(
    'beforeend',
    `<label for="${name}_select_${state.name}" class="text_weak available_medium16">${state.innerHTML}</label>`
  );
  return radioInputWrapper;
};

const NavSelector = (viewStore, states, selectedName, name) => {
  const navSelector = document.createElement('div');

  navSelector.classList.add(`${name}_select_wrapper`);
  states.forEach(state => {
    navSelector.appendChild(
      RadioInputWrapper(viewStore, state, state.name === selectedName, name)
    );
  });
  return navSelector;
};

const MediaNav = viewStore => {
  const state = viewStore.getState();
  const mediaViewNav = document.createElement('nav');

  mediaViewNav.id = 'media_view_nav';
  mediaViewNav.appendChild(
    NavSelector(viewStore, state.data.media, state.media, 'media')
  );
  mediaViewNav.appendChild(
    NavSelector(viewStore, state.data.view, state.view, 'view')
  );
  return mediaViewNav;
};

export default MediaNav;
