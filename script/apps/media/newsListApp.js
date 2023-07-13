import media_data from '../../../assets/data/media_data.js';
import { SubButton } from '../../components/Button.js';
import { SUB_MEDIA } from '../../constants.js';

const createListNav = () => {
  const nav = document.createElement('nav');
  // 임시 데이터
  const navData = [
    '종합/경제',
    '방송/통신',
    'IT',
    '영자지',
    '스포츠/연예',
    '매거진/전문지',
    '지역',
  ];

  nav.id = 'list_nav';
  nav.classList.add('surface_alt');
  const navList = document.createElement('ul');
  navList.id = 'list_nav_list';
  nav.appendChild(navList);
  navData.forEach(name => {
    const navItem = document.createElement('li');
    navItem.classList.add(
      'list_view_select',
      'pointer',
      'hover_medium14',
      'text_weak'
    );
    const navItemName = document.createElement('div');
    navItemName.classList.add('name');
    navItemName.innerText = name;
    navItem.appendChild(navItemName);
    navList.appendChild(navItem);
  });

  return nav;
};

const createListContent = () => {
  const listContent = document.createElement('div');
  // 임시 데이터
  const listData = {
    id: 2,
    updated: '2023.02.10. 18:53 편집',
    thumbnailNews: {
      id: 1,
      title: '봇물처럼 터지는 공공요금 인상…꼭 지금이어야 하나',
    },
    newsList: [
      '뉴스 제목',
      '뉴스 제목2',
      '뉴스 제목3',
      '뉴스 제목4',
      '뉴스 제목5',
      '뉴스 제목6',
    ],
  };

  listContent.classList.add('list_view');

  const mediaInfo = document.createElement('div');
  mediaInfo.classList.add('media_info');
  const mediaLogo = document.createElement('img');
  mediaLogo.classList.add('media_logo');
  mediaLogo.src = `assets/images/logo/light/${media_data[listData.id].src}`;
  mediaLogo.alt = media_data[listData.id].name;
  const updatedTime = document.createElement('div');
  updatedTime.classList.add('text_default', 'display_medium12');
  updatedTime.innerText = listData.updated;
  mediaInfo.appendChild(mediaLogo);
  mediaInfo.appendChild(updatedTime);
  mediaInfo.appendChild(
    SubButton({ isSub: SUB_MEDIA.includes(listData.id), withText: false })
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
  thumbnailNewsTitle.innerHTML = `<a>${listData.thumbnailNews.title}</a>`;
  thumbnailNewsSection.appendChild(thumbnailNewsImage);
  thumbnailNewsSection.appendChild(thumbnailNewsTitle);
  news.appendChild(thumbnailNewsSection);

  const newsList = document.createElement('ul');
  newsList.classList.add('sub_news');
  listData.newsList.forEach(title => {
    const newsItem = document.createElement('li');
    const newsLink = document.createElement('a');
    newsLink.classList.add('pointer', 'text_bold', 'hover_medium16');
    newsLink.innerText = title;
    newsItem.appendChild(newsLink);
    newsList.appendChild(newsItem);
  });
  const notice = document.createElement('li');
  notice.classList.add('text_weak', 'display_medium14');
  notice.innerText = '***에서 직접 편집한 뉴스입니다.';
  newsList.appendChild(notice);
  news.appendChild(newsList);

  listContent.appendChild(mediaInfo);
  listContent.appendChild(news);

  return listContent;
};

const createListElement = () => {
  const listElement = document.createElement('div');

  listElement.id = 'list_view_wrapper';
  listElement.appendChild(createListNav());
  listElement.appendChild(createListContent());
  return listElement;
};

const setArrow = () => {
  //
};

// initGrid와 거의 동일 (추후 통합)
const initList = () => {
  const mediaView = document.querySelector('#media_view');

  Array.from(mediaView.childNodes).forEach(child => child.remove());
  mediaView.appendChild(createListElement());
};

const listApp = () => {
  initList();
  // setList();
  setArrow();
};

export default listApp;
