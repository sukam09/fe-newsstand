import { getMediaArray } from '../../../fetch/getNewsData.js';
import ListNavItem from './ListNavItem.js';

const clickNav = (target, listStore, navList, viewAll) => {
  const navItem = target.closest('.list_view_select');

  if (!navItem) return;

  const { category, page } = listStore.getState();
  const index = Array.from(navList.childNodes).indexOf(navItem);

  if (viewAll && index === category) return;
  if (!viewAll && index === page) return;
  listStore.setState(viewAll ? { category: index, page: 0 } : { page: index });
};

const addListNavEvent = (navList, listStore) => {
  document.eventManager.register(
    'click',
    navList,
    ({ target }) => clickNav(target, listStore, navList, true),
    'view'
  );
};

const appendListNavItems = (navList, listStore) => {
  const { category, page, media } = listStore.getState();

  media.forEach((categoryData, index) => {
    navList.appendChild(
      ListNavItem({
        selected: category === index,
        title: categoryData.name,
        indicator: { index: page, total: categoryData.media.length },
        afterDelay: () => listStore.movePage(1),
      })
    );
  });
  addListNavEvent(navList, listStore);
};

const addSubListNavEvent = (navList, listStore) => {
  const mouse = { x: null, y: null };
  let prevX = null;

  const mouseDown = ({ clientX, clientY }) => {
    prevX = clientX;
    mouse.x = clientX;
    mouse.y = clientY;
  };
  const mouseMove = e => {
    if (prevX === null || e.buttons === 0) return;
    navList.scrollLeft += prevX - e.clientX;
    prevX = e.clientX;
  };
  const mouseUp = ({ clientX: x, clientY: y, target }) => {
    prevX = null;
    if (Math.abs(mouse.x - x) > 5 || Math.abs(mouse.y - y) > 5) return;
    clickNav(target, listStore, navList, false);
  };

  document.eventManager.register('mousedown', navList, mouseDown, 'view');
  document.eventManager.register('mousemove', document, mouseMove, 'view');
  document.eventManager.register('mouseup', document, mouseUp, 'view');
};

const appendSubListNavItems = (navList, listStore) => {
  const { page, media } = listStore.getState();

  getMediaArray(media).then(mediaArray => {
    mediaArray.forEach((mediaItem, index) => {
      navList.appendChild(
        ListNavItem({
          selected: page === index,
          title: mediaItem.name,
          afterDelay: () => listStore.moveSubPage(1),
        })
      );
    });
  });
  addSubListNavEvent(navList, listStore);
};

const ListNav = (listStore, viewAll) => {
  const nav = document.createElement('nav');
  const navList = document.createElement('ul');

  nav.id = 'list_nav';
  nav.classList.add('surface_alt');
  navList.id = 'list_nav_list';
  nav.appendChild(navList);
  viewAll
    ? appendListNavItems(navList, listStore)
    : appendSubListNavItems(navList, listStore);

  return nav;
};

export default ListNav;
