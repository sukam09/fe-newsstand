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

const listNavOnClick = (category, index, viewStore) => {
  if (category === index) return;
  viewStore.setState({
    category: index,
    page: 0,
  });
};

const appendListNavItems = (navList, viewStore) => {
  const { category, page, media } = viewStore.getState();

  media.forEach((categoryData, index) => {
    navList.appendChild(
      ListNavItem({
        selected: category === index,
        title: categoryData.name,
        indicator: { index: page, total: categoryData.media.length },
        onClick: () => listNavOnClick(category, index, viewStore),
        afterDelay: () => setPage(viewStore, page + 1),
      })
    );
  });
};

const ListNav = viewStore => {
  const nav = document.createElement('nav');
  const navList = document.createElement('ul');

  nav.id = 'list_nav';
  nav.classList.add('surface_alt');
  navList.id = 'list_nav_list';
  nav.appendChild(navList);
  appendListNavItems(navList, viewStore);
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

const subNavOnClick = (page, index, viewStore) => {
  if (page === index) return;
  viewStore.setState({ page: index });
};

const appendSubNavItems = (navList, viewStore) => {
  const { page, media, scrollLeft } = viewStore.getState();

  getMediaArray(media).then(mediaArray => {
    mediaArray.forEach((mediaItem, index) => {
      navList.appendChild(
        ListNavItem({
          selected: page === index,
          title: mediaItem.name,
          onClick: () => subNavOnClick(page, index, viewStore),
          afterDelay: () => setSubPage(viewStore, page + 1),
        })
      );
    });
    setSubNavMouseEvent(navList, scrollLeft);
  });
};

const ListSubNav = viewStore => {
  const nav = document.createElement('nav');
  const navList = document.createElement('ul');

  nav.id = 'list_nav';
  nav.classList.add('surface_alt');
  navList.id = 'list_nav_list';
  nav.appendChild(navList);
  appendSubNavItems(navList, viewStore);
  return nav;
};

const selectNav = (navItem, index, page, viewStore) => {
  navItem.replaceWith(
    ListNavItem({
      selected: true,
      title: navItem.querySelector('.name').innerText,
      onClick: () => subNavOnClick(page, index, viewStore),
      afterDelay: () => setSubPage(viewStore, page + 1),
    })
  );
};

const unSelectNav = (navItem, index, page, viewStore) => {
  if (!navItem.classList.contains('surface_brand_alt')) return;
  navItem.querySelector('.list_progress')?.remove();
  navItem.replaceWith(
    ListNavItem({
      selected: false,
      title: navItem.querySelector('.name').innerText,
      onClick: () => subNavOnClick(page, index, viewStore),
    })
  );
};

const updateListSubNav = (nav, viewStore) => {
  const navList = nav.querySelector('#list_nav_list');
  const { page } = viewStore.getState();

  if (!navList) return nav.replaceWith(ListSubNav(viewStore));
  navList.childNodes.forEach((navItem, index) => {
    if (index === page) return selectNav(navItem, index, page, viewStore);
    unSelectNav(navItem, index, page, viewStore);
  });
};

const updateListNav = (nav, viewAll, viewStore) => {
  if (!viewAll) return updateListSubNav(nav, viewStore);
  nav.querySelector('.list_progress')?.remove();
  nav.replaceWith(ListNav(viewStore));
};

export default updateListNav;
