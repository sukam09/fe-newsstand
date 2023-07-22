import NavPageIndicator from './NavPageIndicator.js';
import ListProgressBar from './Progress.js';

const addMouseEvents = (listNavItem, mouse, onClick) => {
  listNavItem.addEventListener('mousedown', ({ clientX, clientY }) => {
    mouse = { x: clientX, y: clientY };
  });
  listNavItem.addEventListener('mouseup', ({ clientX, clientY }) => {
    if (mouse.x !== clientX || mouse.y !== clientY) return;
    onClick();
  });
};

const navItemName = (selected, title) => {
  return `<div class="name ${
    selected ? 'selected_bold14' : ''
  }">${title}</div>`;
};

const ListNavContent = (selected, title, indicator, onClick) => {
  const listNavContent = document.createElement('div');
  let mouse = { x: null, y: null };

  addMouseEvents(listNavContent, mouse, onClick);
  listNavContent.classList.add('list_view_select_content', 'pointer');
  listNavContent.insertAdjacentHTML('beforeend', navItemName(selected, title));
  if (selected) {
    listNavContent.id = 'selected_nav_item';
    listNavContent.classList.add('text_white_default');
    listNavContent.appendChild(NavPageIndicator(indicator));
  } else {
    listNavContent.classList.add('hover_medium14', 'text_weak');
  }
  return listNavContent;
};

const ListNavItem = ({ title, selected, indicator, onClick, afterDelay }) => {
  const listNavItem = document.createElement('li');
  const listNavContent = ListNavContent(selected, title, indicator, onClick);

  listNavItem.classList.add('list_view_select');
  if (selected) {
    listNavItem.classList.add('surface_brand_alt');
    listNavItem.appendChild(ListProgressBar(afterDelay));
  }
  listNavItem.appendChild(listNavContent);
  return listNavItem;
};

export default ListNavItem;
