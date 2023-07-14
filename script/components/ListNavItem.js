import NavPageIndicator from './NavPageIndicator.js';

const ListNavItem = ({ title, selected, indicator, onClick }) => {
  const listNavItem = document.createElement('li');

  listNavItem.classList.add('list_view_select', 'pointer');
  const listNavItemName = document.createElement('div');
  listNavItemName.classList.add('name', 'selected_bold14');
  listNavItemName.innerText = title;
  listNavItem.addEventListener('click', onClick);
  listNavItem.appendChild(listNavItemName);
  if (selected) {
    listNavItem.id = 'selected_nav_item';
    listNavItem.classList.add('surface_brand_alt', 'text_white_default');
    listNavItem.appendChild(NavPageIndicator(indicator));
  } else {
    listNavItem.classList.add('hover_medium14', 'text_weak');
  }
  return listNavItem;
};

export default ListNavItem;
