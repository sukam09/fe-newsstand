import NavPageIndicator from './NavPageIndicator.js';
import ListProgressBar from './Progress.js';

const addMouseEvents = (listNavItem, mouse, onClick) => {
  document.eventManager.register(
    'mousedown',
    listNavItem,
    ({ clientX, clientY }) => {
      mouse = { x: clientX, y: clientY };
    }
  );
  document.eventManager.register(
    'mouseup',
    listNavItem,
    ({ clientX, clientY }) => {
      if (Math.abs(mouse.x - clientX) > 5 || Math.abs(mouse.y - clientY) > 5)
        return;
      onClick();
    }
  );
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

const addProgressBar = (element, afterDelay) => {
  const progressBar = ListProgressBar(afterDelay);
  const callback = (mutationList, observer) => {
    mutationList.forEach(mutation => {
      if (mutation.removedNodes[0] !== progressBar) return;
      observer.disconnect();
      progressBar.cancelLoop();
    });
  };
  const observer = new MutationObserver(callback);

  element.appendChild(progressBar);
  observer.observe(element, { childList: true });
};

const ListNavItem = ({ title, selected, indicator, onClick, afterDelay }) => {
  const listNavItem = document.createElement('li');
  const listNavContent = ListNavContent(selected, title, indicator, onClick);

  listNavItem.classList.add('list_view_select');
  if (selected) {
    listNavItem.classList.add('surface_brand_alt');
    addProgressBar(listNavItem, afterDelay);
  }
  listNavItem.appendChild(listNavContent);
  return listNavItem;
};

export default ListNavItem;
