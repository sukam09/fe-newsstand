const RadioInput = (navStore, state, selected, name) => {
  const inputElement = document.createElement('input');

  inputElement.type = 'radio';
  inputElement.id = `${name}_select_${state}`;
  inputElement.name = `${name}_select`;
  inputElement.className = `${name}_select`;
  inputElement.defaultChecked = selected;
  document.eventManager.register(
    'change',
    inputElement,
    () => navStore.setView(name, state),
    'view'
  );
  return inputElement;
};

const RadioInputWrapper = (navStore, state, selected, name) => {
  const radioInputWrapper = document.createElement('div');

  radioInputWrapper.appendChild(
    RadioInput(navStore, state.name, selected, name)
  );
  radioInputWrapper.insertAdjacentHTML(
    'beforeend',
    `<label for="${name}_select_${state.name}" class="text_weak available_medium16">${state.innerHTML}</label>`
  );
  return radioInputWrapper;
};

const NavSelector = (navStore, states, selectedName, name) => {
  const navSelector = document.createElement('div');

  navSelector.classList.add(`${name}_select_wrapper`);
  states.forEach(state => {
    navSelector.appendChild(
      RadioInputWrapper(navStore, state, state.name === selectedName, name)
    );
  });
  return navSelector;
};

const MediaNav = navStore => {
  const { data, media, view, subscribed } = navStore.getState();
  const mediaViewNav = document.createElement('nav');

  mediaViewNav.id = 'media_view_nav';
  mediaViewNav.appendChild(NavSelector(navStore, data.media, media, 'media'));
  if (media === 'subscribed' && subscribed.length === 0) return mediaViewNav;
  mediaViewNav.appendChild(NavSelector(navStore, data.view, view, 'view'));
  return mediaViewNav;
};

export default MediaNav;
