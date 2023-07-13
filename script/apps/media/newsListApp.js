import mediaData from '../../../assets/data/mediaData.js';
import { SubButton } from '../../components/Button.js';
import { SUB_MEDIA } from '../../constants.js';
import { createNewArrow, shuffleArray } from '../../utils/utils.js';

const createMediaArray = () => {
  const mediaArray = mediaData.category;

  mediaArray.forEach(category => {
    shuffleArray(category.media);
  });
  return mediaArray;
};

const updatePage = listData => {
  const listView = document.querySelector('#list_view');

  listView.replaceWith(
    createListContent(
      listData.categoryData[listData.category].media[listData.page]
    )
  );
};

const setPage = (listData, move) => {
  listData.page += move;

  if (listData.page === -1) {
    listData.category = (listData.category - 1) % listData.categoryData.length;
    listData.page = listData.categoryData[listData.category].media.length - 1;
  }
  if (listData.page === listData.categoryData[listData.category].media.length) {
    listData.category = (listData.category + 1) % listData.categoryData.length;
    listData.page = 0;
  }
  updatePage(listData);
};

const createListNav = categoryData => {
  const nav = document.createElement('nav');

  nav.id = 'list_nav';
  nav.classList.add('surface_alt');
  const navList = document.createElement('ul');
  navList.id = 'list_nav_list';
  nav.appendChild(navList);
  categoryData.forEach(category => {
    const navItem = document.createElement('li');
    navItem.classList.add(
      'list_view_select',
      'pointer',
      'hover_medium14',
      'text_weak'
    );
    const navItemName = document.createElement('div');
    navItemName.classList.add('name');
    navItemName.innerText = category.name;
    navItem.appendChild(navItemName);
    navList.appendChild(navItem);
  });

  return nav;
};

const createListContent = mediaId => {
  const listContent = document.createElement('div');
  // 임시 데이터
  const newsData = mediaData.getNews(mediaId);

  const mediaInfo = document.createElement('div');
  mediaInfo.classList.add('media_info');
  const mediaLogo = document.createElement('img');
  mediaLogo.classList.add('media_logo');
  mediaLogo.src = mediaData.getLogoSrc(mediaId);
  mediaLogo.alt = mediaData.getName(mediaId);
  const updatedTime = document.createElement('div');

  listContent.id = 'list_view';
  updatedTime.classList.add('text_default', 'display_medium12');
  updatedTime.innerText = `${newsData.updated} 편집`;
  mediaInfo.appendChild(mediaLogo);
  mediaInfo.appendChild(updatedTime);
  mediaInfo.appendChild(
    SubButton({ isSub: SUB_MEDIA.includes(mediaId), withText: false })
  );

  const news = document.createElement('div');
  news.classList.add('news');
  const thumbnailNewsSection = document.createElement('section');
  thumbnailNewsSection.classList.add(
    'thumbnail_news',
    'pointer',
    'hover_medium16',
    'text_strong'
  );
  const thumbnailNewsImage = document.createElement('img');
  thumbnailNewsImage.classList.add('thumbnail');
  thumbnailNewsImage.alt = '기사 제목';
  const thumbnailNewsTitle = document.createElement('h2');
  thumbnailNewsTitle.classList.add('title');
  thumbnailNewsTitle.innerHTML = `<a>${newsData.thumbnailNews}</a>`;
  thumbnailNewsSection.appendChild(thumbnailNewsImage);
  thumbnailNewsSection.appendChild(thumbnailNewsTitle);
  news.appendChild(thumbnailNewsSection);

  const newsList = document.createElement('ul');
  newsList.classList.add('sub_news');
  newsData.news.forEach(title => {
    const newsItem = document.createElement('li');
    const newsLink = document.createElement('a');
    newsLink.classList.add('pointer', 'text_bold', 'hover_medium16');
    newsLink.innerText = title;
    newsItem.appendChild(newsLink);
    newsList.appendChild(newsItem);
  });
  const notice = document.createElement('li');
  notice.classList.add('text_weak', 'display_medium14');
  notice.innerText = `${mediaData.getName(
    mediaId
  )}에서 직접 편집한 뉴스입니다.`;
  newsList.appendChild(notice);
  news.appendChild(newsList);

  listContent.appendChild(mediaInfo);
  listContent.appendChild(news);

  return listContent;
};

const createListElement = categoryData => {
  const listElement = document.createElement('div');

  listElement.id = 'list_view_wrapper';
  listElement.appendChild(createListNav(categoryData));
  listElement.appendChild(createListContent(categoryData[0].media[0]));
  return listElement;
};

const setArrow = listData => {
  const [leftArrow, rightArrow] = createNewArrow();

  leftArrow.addEventListener('click', () => {
    setPage(listData, -1);
  });
  rightArrow.addEventListener('click', () => {
    setPage(listData, 1);
  });
};

// initGrid와 거의 동일 (추후 통합)
const initList = categoryData => {
  const mediaView = document.querySelector('#media_view');

  Array.from(mediaView.childNodes).forEach(child => child.remove());
  mediaView.appendChild(createListElement(categoryData));
};

const listApp = () => {
  const listData = {
    category: 0,
    page: 0,
    categoryData: createMediaArray(),
  };

  initList(listData.categoryData);
  updatePage(listData);
  setArrow(listData);
};

export default listApp;
