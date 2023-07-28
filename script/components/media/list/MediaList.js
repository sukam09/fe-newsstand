import updateListNav from '../../../apps/media/updateListNav.js';
import { MSG } from '../../../constants.js';
import { getNewsData } from '../../../fetch/getNewsData.js';
import ListStore from '../../../store/ListStore.js';
import { setMediaLogo } from '../../../utils/utils.js';
import Button from '../../Button.js';
import { replaceArrow } from '../ArrowButton.js';

const setArrowButtons = (store, viewAll, left, right) => {
  const movePage = move => {
    viewAll ? store.movePage(move) : store.moveSubPage(move);
  };

  document.eventManager.register('click', left, () => movePage(-1), 'view');
  document.eventManager.register('click', right, () => movePage(1), 'view');
};

const MediaLogoImg = (themeStore, id) => {
  const mediaLogoImg = document.createElement('img');

  themeStore.subscribe(
    state => setMediaLogo(mediaLogoImg, id, state.theme),
    'view'
  );
  mediaLogoImg.classList.add('media_logo');
  setMediaLogo(mediaLogoImg, id, themeStore.getState().theme);
  return mediaLogoImg;
};

const UpdatedTime = time => {
  const updatedTimeElement = document.createElement('div');

  updatedTimeElement.classList.add('text_default', 'display_medium12');
  updatedTimeElement.innerText = `${time} 편집`;
  return updatedTimeElement;
};

const MediaInfo = (themeStore, id, newsData, navStore, viewStore) => {
  const mediaInfo = document.createElement('div');

  mediaInfo.classList.add('media_info');
  mediaInfo.appendChild(MediaLogoImg(themeStore, id));
  mediaInfo.appendChild(UpdatedTime(newsData.updated));
  mediaInfo.appendChild(
    Button(
      navStore.buttonData({
        id,
        name: newsData.name,
        viewStore,
        withText: false,
      })
    )
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
        </li>`),
      ''
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
      <img class="thumbnail" src=${newsData.thumbnailSrc} alt="기사 사진">
    </div>
    <h2 class="title"><a>${newsData.thumbnailNews}</a></h2>
  </section>`;
  getNewsData(mediaId).then(({ name }) => {
    news.appendChild(NewsList(name, newsData));
  });
  return news;
};

const ListContent = (themeStore, navStore, viewStore, viewAll) => {
  const listContent = document.createElement('div');
  const { category, page, media } = viewStore.getState();
  const mediaId = viewAll ? media[category].media[page] : media[page];

  getNewsData(mediaId).then(newsData => {
    listContent.id = 'list_view';
    if (mediaId === undefined) return listContent;
    listContent.appendChild(
      MediaInfo(themeStore, mediaId, newsData, navStore, viewStore)
    );
    listContent.appendChild(NewsContent(mediaId, newsData));
  });
  return listContent;
};

const MediaList = (themeStore, navStore, viewData) => {
  const viewAll = navStore.getState().media === 'all';
  const listStore = new ListStore(viewData, viewAll);
  const mediaList = document.createElement('div');
  const [leftArrow, rightArrow] = replaceArrow();

  const render = () => {
    const nav = mediaList.querySelector('#list_nav');
    const listContent = mediaList.querySelector('#list_view');

    updateListNav(nav, viewAll, navStore, listStore);
    listContent.replaceWith(
      ListContent(themeStore, navStore, listStore, viewAll)
    );
    if (listStore.getState().media.length === 1) {
      leftArrow.style.display = 'none';
      rightArrow.style.display = 'none';
    }
  };

  mediaList.innerHTML = `
    <nav id="list_nav" class="surface_alt"></nav>
    <div id="list_view"></div>`;
  setArrowButtons(listStore, viewAll, leftArrow, rightArrow);
  mediaList.id = 'list_view_wrapper';
  listStore.subscribe(render);
  render();
  return mediaList;
};

export default MediaList;
