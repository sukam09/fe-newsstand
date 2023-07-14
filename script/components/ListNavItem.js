import NavPageIndicator from './NavPageIndicator.js';
import ListProgressBar from './Progress.js';

const ListNavItem = ({ title, selected, indicator, onClick }) => {
  const listNavItem = document.createElement('li');
  const listNavItemContent = document.createElement('div');
  const listNavItemName = document.createElement('div');

  listNavItem.classList.add('list_view_select');
  listNavItemContent.classList.add('list_view_select_content', 'pointer');
  listNavItemName.classList.add('name', 'selected_bold14');
  listNavItemName.innerText = title;
  listNavItemContent.addEventListener('click', onClick);
  listNavItemContent.appendChild(listNavItemName);
  if (selected) {
    listNavItem.classList.add('surface_brand_alt');
    listNavItemContent.id = 'selected_nav_item';
    listNavItemContent.classList.add('text_white_default');
    listNavItemContent.appendChild(NavPageIndicator(indicator));
    listNavItem.appendChild(ListProgressBar({ progress: 0.5 }));
  } else {
    listNavItemContent.classList.add('hover_medium14', 'text_weak');
  }
  listNavItem.appendChild(listNavItemContent);
  return listNavItem;
};

export default ListNavItem;
