import ListNavItem from '../../components/ListNavItem.js';
import { getMediaArray } from '../../fetch/getNewsData.js';

const setPage = (store, newPage) => {
  const { category, media } = store.getState();
  const catLength = media.length;
  const pageLength = media[category].media.length;

  switch (newPage) {
    case -1:
      const newCategory = (category - 1 + catLength) % catLength;

      store.setState({
        category: newCategory,
        page: media[newCategory].media.length - 1,
      });
      break;
    case pageLength:
      store.setState({
        category: (category + 1) % catLength,
        page: 0,
      });
      break;
    default:
      store.setState({ page: newPage });
  }
};

const setSubPage = (store, newPage) => {
  const { media } = store.getState();
  const pageLength = media.length;

  switch (newPage) {
    case -1:
      store.setState({ page: pageLength - 1 });
      break;
    case pageLength:
      store.setState({ page: 0 });
      break;
    default:
      store.setState({ page: newPage });
  }
};

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
        afterDelay: () => setPage(listStore, page + 1),
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

  navList.addEventListener('mousedown', e => {
    prevX = e.clientX;
  });
  navList.addEventListener('mousemove', e => {
    if (!prevX) return;
    navList.scrollLeft -= e.clientX - prevX;
    prevX = e.clientX;
  });
  navList.addEventListener('mouseup', () => {
    prevX = null;
  });
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
          afterDelay: () => setSubPage(listStore, page + 1),
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
      afterDelay: () => setSubPage(listStore, page + 1),
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
