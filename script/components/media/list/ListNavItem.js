import ListProgressBar from '../../Progress.js';
import NavPageIndicator from './NavPageIndicator.js';

const navItemName = (selected, title) => {
  return `<div class="name ${
    selected ? 'selected_bold14' : ''
  }">${title}</div>`;
};

const ListNavContent = (selected, title, indicator) => {
  const listNavContent = document.createElement('div');
  let mouse = { x: null, y: null };

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

const addProgressBar = (element, afterDelay) => {
  const progressBar = ListProgressBar(afterDelay);
  const callback = (mutationList, observer) => {
    mutationList.forEach(mutation => {
      const removedNodes = Array.from(mutation.removedNodes);

      if (!removedNodes.includes(progressBar)) return;
      progressBar.cancelLoop();
      observer.disconnect();
    });
  };
  const observer = new MutationObserver(callback);

  element.appendChild(progressBar);
  observer.observe(element, { childList: true });
};

const ListNavItem = ({ title, selected, indicator, afterDelay }) => {
  const listNavItem = document.createElement('li');
  const listNavContent = ListNavContent(selected, title, indicator);

  listNavItem.classList.add('list_view_select');
  if (selected) {
    listNavItem.classList.add('surface_brand_alt');
    addProgressBar(listNavItem, afterDelay);
  }
  listNavItem.appendChild(listNavContent);
  return listNavItem;
};

export default ListNavItem;
