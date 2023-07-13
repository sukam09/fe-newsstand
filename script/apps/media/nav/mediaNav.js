import Icon from '../../../components/Icon.js';

const MediaSelectInput = ({ id, text, handler, checked }) => {
  const inputWrapper = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');

  if (checked) input.defaultChecked = true;
  input.type = 'radio';
  input.name = 'media_select';
  input.id = id;
  input.classList.add('media_select');
  label.htmlFor = id;
  label.classList.add('text_weak', 'available_medium16');
  label.innerText = text;
  input.addEventListener('change', handler);
  inputWrapper.appendChild(input);
  inputWrapper.appendChild(label);
  return inputWrapper;
};

const MediaSelectWrapper = data => {
  const mediaSelectWrapper = document.createElement('div');
  mediaSelectWrapper.classList.add('media_select_wrapper');

  data.forEach(selectData => {
    mediaSelectWrapper.appendChild(MediaSelectInput(selectData));
  });
  return mediaSelectWrapper;
};

const ViewSelectInput = ({ id, icon, handler, checked }) => {
  const inputWrapper = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');

  if (checked) input.defaultChecked = true;
  input.type = 'radio';
  input.name = 'view_select';
  input.id = id;
  input.classList.add('view_select');
  label.htmlFor = id;
  label.classList.add('text_weak', 'available_medium16');
  label.innerHTML = Icon[icon];
  input.addEventListener('change', handler);
  inputWrapper.appendChild(input);
  inputWrapper.appendChild(label);
  return inputWrapper;
};

const ViewSelect = data => {
  const viewSelectWrapper = document.createElement('div');
  viewSelectWrapper.classList.add('view_select_wrapper');

  data.forEach(selectData => {
    viewSelectWrapper.appendChild(ViewSelectInput(selectData));
  });

  return viewSelectWrapper;
};

const addMediaNav = mediaWrapper => {
  const mediaViewNav = document.createElement('nav');
  const mediaSelect = MediaSelectWrapper(mediaWrapper.mediaSelectData);
  const viewSelect = ViewSelect(mediaWrapper.viewSelectData);

  mediaViewNav.id = 'media_view_nav';
  mediaViewNav.appendChild(mediaSelect);
  mediaViewNav.appendChild(viewSelect);
  mediaWrapper.appendChild(mediaViewNav);
};

export default addMediaNav;
