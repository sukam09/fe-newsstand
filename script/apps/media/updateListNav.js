import ListNav from '../../components/media/list/ListNav.js';
import ListNavItem from '../../components/media/list/ListNavItem.js';

const selectNav = (navItem, listStore) => {
  navItem.replaceWith(
    ListNavItem({
      selected: true,
      title: navItem.querySelector('.name').innerText,
      afterDelay: () => listStore.moveSubPage(1),
    })
  );
};

const unSelectNav = navItem => {
  if (!navItem.classList.contains('surface_brand_alt')) return;
  navItem.replaceWith(
    ListNavItem({
      selected: false,
      title: navItem.querySelector('.name').innerText,
    })
  );
};

const updateListNav = (nav, viewAll, navStore, listStore) => {
  const navItems = nav.querySelector('#list_nav_list')?.childNodes;

  nav.querySelectorAll('.list_progress').forEach(bar => bar.remove());
  if (viewAll || !navItems) return nav.replaceWith(ListNav(listStore, viewAll));

  const { page } = listStore.getState();
  const { subscribed } = navStore.getState();

  if (navItems.length !== subscribed.length) {
    navItems[page].remove();
    return selectNav(navItems[page], listStore);
  }
  navItems.forEach((navItem, index) => {
    if (index === page) return selectNav(navItem, listStore);
    unSelectNav(navItem);
  });
};

export default updateListNav;
