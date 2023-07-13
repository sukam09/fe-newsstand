import { clearAllChildren } from '../utils/utils.js';
import Icon from './Icon.js';

const MediaSelectInput = (id, text, handler) => {
  const inputWrapper = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');

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

const mediaSelectHandler = event => {
  console.log(event.target.checked);
  if (!event.target.checked) return;
};

const MediaSelectWrapper = appData => {
  const mediaSelectWrapper = document.createElement('div');
  mediaSelectWrapper.classList.add('media_select_wrapper');
  const mediaSelectData = [
    {
      className: 'media_select_all',
      text: '전체 언론사',
      handler: wrapper => {
        clearAllChildren(wrapper);
      },
    },
    {
      className: 'media_select_subscribed',
      text: '내가 구독한 언론사',
    },
  ];

  mediaSelectWrapper.appendChild(
    MediaSelectInput('media_select_all', '전체 언론사', mediaSelectHandler)
  );
  mediaSelectWrapper.appendChild(
    MediaSelectInput(
      'media_select_subscribed',
      '내가 구독한 언론사',
      mediaSelectHandler
    )
  );
  return mediaSelectWrapper;
};

const ViewSelectInput = (id, icon, handler) => {
  const inputWrapper = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');

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

const ViewSelect = appData => {
  const viewSelectWrapper = document.createElement('div');
  viewSelectWrapper.classList.add('view_select_wrapper');

  viewSelectWrapper.appendChild(ViewSelectInput('view_list', 'listView'));
  viewSelectWrapper.appendChild(ViewSelectInput('view_grid', 'gridView'));

  return viewSelectWrapper;
};

const MediaViewNav = appData => {
  const mediaViewNav = document.createElement('nav');
  const mediaSelect = MediaSelectWrapper(appData);
  const viewSelect = ViewSelect(appData);

  mediaViewNav.id = 'media_view_nav';
  mediaViewNav.appendChild(mediaSelect);
  mediaViewNav.appendChild(viewSelect);
  return mediaViewNav;
};

export default MediaViewNav;
