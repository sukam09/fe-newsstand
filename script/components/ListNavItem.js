import NavPageIndicator from './NavPageIndicator.js';
import ListProgressBar from './Progress.js';

const ListNavItem = ({ title, selected, indicator, onClick, afterDelay }) => {
  const listNavItem = document.createElement('li');
  const listNavItemContent = document.createElement('div');
  const listNavItemName = document.createElement('div');
  let mouse = { x: null, y: null };

  listNavItem.classList.add('list_view_select');
  listNavItemContent.classList.add('list_view_select_content', 'pointer');
  listNavItemName.classList.add('name');
  listNavItemName.innerText = title;
  listNavItemContent.addEventListener('mousedown', e => {
    mouse = { x: e.clientX, y: e.clientY };
  });
  listNavItemContent.addEventListener('mouseup', e => {
    if (mouse.x !== e.clientX || mouse.y !== e.clientY) return;
    onClick();
  });
  listNavItemContent.appendChild(listNavItemName);
  if (selected) {
    listNavItemName.classList.add('selected_bold14');
    listNavItem.classList.add('surface_brand_alt');
    listNavItemContent.id = 'selected_nav_item';
    listNavItemContent.classList.add('text_white_default');
    listNavItemContent.appendChild(NavPageIndicator(indicator));
    listNavItem.appendChild(ListProgressBar(afterDelay));
  } else {
    listNavItemContent.classList.add('hover_medium14', 'text_weak');
  }
  listNavItem.appendChild(listNavItemContent);
  return listNavItem;
};

export default ListNavItem;
