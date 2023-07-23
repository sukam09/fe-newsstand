import updateListNav from '../../apps/media/updateListNav.js';
import { replaceArrow } from '../../components/media/ArrowButton.js';
import SubToggleButton from '../../components/media/SubToggleButton.js';
import { MSG } from '../../constants.js';
import Store from '../../core/Store.js';
import { getMediaLogo, getNewsData } from '../../fetch/getNewsData.js';

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

const MediaLogoImg = id => {
  const mediaLogoElement = document.createElement('img');

  mediaLogoElement.classList.add('media_logo');
  mediaLogoElement.src = getMediaLogo(id);
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
  mediaInfo.appendChild(MediaLogoImg(id));
  mediaInfo.appendChild(UpdatedTime(newsData.updated));
  mediaInfo.appendChild(
    SubToggleButton({ id, navStore, viewStore, withText: false })
  );
  return mediaInfo;
};

const NewsList = (name, newsData) => {
  const newsList = document.createElement('ul');

  newsList.classList.add('sub_news');
  newsList.innerHTML =
    newsData.news.reduce(
      (fragment, title) =>
        (fragment += `<li>
          <a class="pointer text_bold hover_medium16">${title}</a>
        </li>`)
    ) +
    `<li class="text_weak display_medium14">
      ${name} ${MSG.MEDIA_EDITED}
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
  getNewsData(mediaId).then(({ name }) => {
    news.appendChild(NewsList(name, newsData));
  });
  return news;
};

const ListContent = (navStore, viewStore, viewAll) => {
  const listContent = document.createElement('div');
  const { category, page, media } = viewStore.getState();
  const mediaId = viewAll ? media[category].media[page] : media[page];

  getNewsData(mediaId).then(newsData => {
    listContent.id = 'list_view';
    if (mediaId === undefined) return listContent;
    listContent.appendChild(MediaInfo(mediaId, newsData, navStore, viewStore));
    listContent.appendChild(NewsContent(mediaId, newsData));
  });
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

  const render = () => {
    const nav = mediaList.querySelector('#list_nav');
    const listContent = mediaList.querySelector('#list_view');

    updateListNav(nav, viewAll, viewStore);
    listContent.replaceWith(ListContent(navStore, viewStore, viewAll));
  };

  mediaList.innerHTML = `
    <nav id="list_nav" class="surface_alt"></nav>
    <div id="list_view"></div>`;
  setArrowButtons(viewStore, viewAll);
  mediaList.id = 'list_view_wrapper';
  viewStore.subscribe(render);
  render();
  return mediaList;
};

export default MediaList;
