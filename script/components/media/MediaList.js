import mediaData from '../../../assets/data/mediaData.js';
import ListNavItem from '../../components/ListNavItem.js';
import { replaceArrow } from '../../components/media/ArrowButton.js';
import SubToggleButton from '../../components/media/SubToggleButton.js';
import { MSG } from '../../constants.js';
import Store from '../../core/Store.js';
import { clearAllChildren } from '../../utils/utils.js';

const setPage = (store, newPage) => {
  const { category, media } = store.getState();
  const catLength = media.category.length;
  const pageLength = media.category[category].media.length;

  switch (newPage) {
    case -1:
      const newCategory = (category - 1 + catLength) % catLength;

      store.setState({
        category: newCategory,
        page: media.category[newCategory].media.length - 1,
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

const setArrowButtons = (store, viewAll) => {
  const [leftArrow, rightArrow] = replaceArrow();

  leftArrow.addEventListener('click', () => {
    viewAll
      ? setPage(store, store.getState().page - 1)
      : setSubPage(store, store.getState().page - 1);
  });
  rightArrow.addEventListener('click', () => {
    viewAll
      ? setPage(store, store.getState().page + 1)
      : setSubPage(store, store.getState().page + 1);
  });
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

  media.category.forEach((categoryData, index) => {
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

const setSubNavMouseEvent = (navList, scrollLeft) => {
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
  navList.addEventListener('DOMNodeInsertedIntoDocument', () => {
    navList.scrollLeft = scrollLeft;
  });
};

const subNavOnClick = (page, index, scrollLeft, viewStore) => {
  if (page === index) return;
  viewStore.setState({ page: index, scrollLeft });
};

const appendSubNavItems = (navList, viewStore) => {
  const { page, media, scrollLeft } = viewStore.getState();

  media.forEach((mediaItem, index) => {
    navList.appendChild(
      ListNavItem({
        selected: page === index,
        title: mediaData.getName(mediaItem),
        onClick: () =>
          subNavOnClick(page, index, navList.scrollLeft, viewStore),
        afterDelay: () => setSubPage(viewStore, page + 1),
      })
    );
  });
  setSubNavMouseEvent(navList, scrollLeft);
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

const MediaLogoImg = src => {
  const mediaLogoElement = document.createElement('img');

  mediaLogoElement.classList.add('media_logo');
  mediaLogoElement.src = src;
  return mediaLogoElement;
};

const UpdatedTime = time => {
  const updatedTimeElement = document.createElement('div');

  updatedTimeElement.classList.add('text_default', 'display_medium12');
  updatedTimeElement.innerText = `${time} 편집`;
  return updatedTimeElement;
};

const MediaInfo = (id, newsData, navStore, viewStore) => {
  const mediaInfo = document.createElement('div');

  mediaInfo.classList.add('media_info');
  mediaInfo.appendChild(MediaLogoImg(mediaData.getLogoSrc(id)));
  mediaInfo.appendChild(UpdatedTime(newsData.updated));
  mediaInfo.appendChild(SubToggleButton(id, navStore, viewStore, false));
  return mediaInfo;
};

const NewsList = (mediaId, newsData) => {
  const newsList = document.createElement('ul');
  newsList.classList.add('sub_news');

  newsList.innerHTML =
    newsData.news.reduce(
      (fragment, title) =>
        (fragment += `<li><a class="pointer text_bold hover_medium16">${title}</a></li>`)
    ) +
    `<li class="text_weak display_medium14">
      ${mediaData.getName(mediaId)} ${MSG.MEDIA_EDITED}
    </li>`;
  return newsList;
};

const NewsContent = (mediaId, newsData) => {
  const news = document.createElement('div');

  news.classList.add('news');
  news.innerHTML = `
  <section class="thumbnail_news pointer hover_medium16 text_strong">
    <div class="thumbnail">
      <img class="thumbnail" src="https://picsum.photos/600/400" alt="기사 사진">
    </div>
    <h2 class="title"><a>${newsData.thumbnailNews}</a></h2>
  </section>`;
  news.appendChild(NewsList(mediaId, newsData));
  return news;
};

const ListContent = (navStore, viewStore, viewAll) => {
  const listContent = document.createElement('div');
  const { category, page, media } = viewStore.getState();
  const mediaId = viewAll ? media.category[category].media[page] : media[page];
  const newsData = mediaData.getNews(mediaId);

  listContent.id = 'list_view';
  if (mediaId === undefined) return listContent;
  listContent.appendChild(MediaInfo(mediaId, newsData, navStore, viewStore));
  listContent.appendChild(NewsContent(mediaId, newsData));
  return listContent;
};

const MediaList = (navStore, mediaData) => {
  const viewAll = navStore.getState().media === 'all';
  const viewStore = new Store({
    category: 0,
    page: 0,
    media: viewAll ? mediaData.list : mediaData.subscribed,
    scrollLeft: 0,
  });
  const mediaList = document.createElement('div');

  const draw = () => {
    const nav = viewAll ? ListNav(viewStore) : ListSubNav(viewStore);
    clearAllChildren(mediaList);
    mediaList.appendChild(nav);
    mediaList.appendChild(ListContent(navStore, viewStore, viewAll));
  };

  setArrowButtons(viewStore, viewAll);
  viewStore.subscribe(draw);
  mediaList.id = 'list_view_wrapper';
  draw();
  return mediaList;
};

export default MediaList;
