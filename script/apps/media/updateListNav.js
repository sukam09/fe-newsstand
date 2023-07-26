import ListNavItem from '../../components/ListNavItem.js';
import { getMediaArray } from '../../fetch/getNewsData.js';

const listNavOnClick = (category, index, listStore) => {
  if (category === index) return;
  listStore.setState({
    category: index,
    page: 0,
  });
};

const appendListNavItems = (navList, listStore) => {
  const { category, page, media } = listStore.getState();

  media.forEach((categoryData, index) => {
    navList.appendChild(
      ListNavItem({
        selected: category === index,
        title: categoryData.name,
        indicator: { index: page, total: categoryData.media.length },
        onClick: () => listNavOnClick(category, index, listStore),
        afterDelay: () => listStore.movePage(1),
      })
    );
  });
};

const ListNav = listStore => {
  const nav = document.createElement('nav');
  const navList = document.createElement('ul');

  nav.id = 'list_nav';
  nav.classList.add('surface_alt');
  navList.id = 'list_nav_list';
  nav.appendChild(navList);
  appendListNavItems(navList, listStore);
  return nav;
};

const setSubNavMouseEvent = navList => {
  let prevX;

  const mouseDown = e => {
    prevX = e.clientX;
  };
  const mouseMove = e => {
    if (!prevX || e.buttons === 0) return;
    navList.scrollLeft -= e.clientX - prevX;
    prevX = e.clientX;
  };

  document.eventManager.register('mousedown', navList, mouseDown, 'view');
  document.eventManager.register('mousemove', document, mouseMove, 'view');
};

const subNavOnClick = (page, index, listStore) => {
  if (page === index) return;
  listStore.setState({ page: index });
};

const appendSubNavItems = (navList, listStore) => {
  const { page, media, scrollLeft } = listStore.getState();

  getMediaArray(media).then(mediaArray => {
    mediaArray.forEach((mediaItem, index) => {
      navList.appendChild(
        ListNavItem({
          selected: page === index,
          title: mediaItem.name,
          onClick: () => subNavOnClick(page, index, listStore),
          afterDelay: () => listStore.moveSubPage(1),
        })
      );
    });
    setSubNavMouseEvent(navList, scrollLeft);
  });
};

const ListSubNav = listStore => {
  const nav = document.createElement('nav');
  const navList = document.createElement('ul');

  nav.id = 'list_nav';
  nav.classList.add('surface_alt');
  navList.id = 'list_nav_list';
  nav.appendChild(navList);
  appendSubNavItems(navList, listStore);
  return nav;
};

const selectNav = (navItem, index, page, listStore) => {
  navItem.replaceWith(
    ListNavItem({
      selected: true,
      title: navItem.querySelector('.name').innerText,
      onClick: () => subNavOnClick(page, index, listStore),
      afterDelay: () => listStore.moveSubPage(1),
    })
  );
};

const unSelectNav = (navItem, index, page, listStore) => {
  if (!navItem.classList.contains('surface_brand_alt')) return;
  navItem.querySelector('.list_progress')?.remove();
  navItem.replaceWith(
    ListNavItem({
      selected: false,
      title: navItem.querySelector('.name').innerText,
      onClick: () => subNavOnClick(page, index, listStore),
    })
  );
};

const updateListSubNav = (nav, navStore, listStore) => {
  const navItems = nav.querySelector('#list_nav_list')?.childNodes;
  const { page } = listStore.getState();
  const { subscribed } = navStore.getState();

  if (navItems?.length !== subscribed.length) {
    return nav.replaceWith(ListSubNav(listStore));
  }
  navItems.forEach((navItem, index) => {
    if (index === page) return selectNav(navItem, index, page, listStore);
    unSelectNav(navItem, index, page, listStore);
  });
};

const updateListNav = (nav, viewAll, navStore, listStore) => {
  if (!viewAll) return updateListSubNav(nav, navStore, listStore);
  nav.querySelector('.list_progress')?.remove();
  nav.replaceWith(ListNav(listStore));
};

export default updateListNav;
