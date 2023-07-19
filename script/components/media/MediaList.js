import mediaData from '../../../assets/data/mediaData.js';
import ListNavItem from '../../components/ListNavItem.js';
import Arrow from '../../components/media/Arrow.js';
import SubButton from '../../components/media/SubButton.js';
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

const replaceArrow = store => {
  const leftArrow = Arrow('left');
  const rightArrow = Arrow('right');

  document.querySelector('#left_arrow').replaceWith(leftArrow);
  document.querySelector('#right_arrow').replaceWith(rightArrow);
  leftArrow.addEventListener('click', () => {
    setPage(store, store.getState().page - 1);
  });
  rightArrow.addEventListener('click', () => {
    setPage(store, store.getState().page + 1);
  });
  return [leftArrow, rightArrow];
};

const replaceSubArrow = store => {
  const leftArrow = Arrow('left');
  const rightArrow = Arrow('right');

  document.querySelector('#left_arrow').replaceWith(leftArrow);
  document.querySelector('#right_arrow').replaceWith(rightArrow);
  leftArrow.addEventListener('click', () => {
    setSubPage(store, store.getState().page - 1);
  });
  rightArrow.addEventListener('click', () => {
    setSubPage(store, store.getState().page + 1);
  });
  return [leftArrow, rightArrow];
};

const ListNav = (navStore, store) => {
  const { category, page, media } = store.getState();
  const nav = document.createElement('nav');
  const navItemList = document.createElement('ul');

  nav.id = 'list_nav';
  nav.classList.add('surface_alt');
  navItemList.id = 'list_nav_list';
  nav.appendChild(navItemList);
  media.category.forEach((categoryData, index) => {
    navItemList.appendChild(
      ListNavItem({
        selected: category === index,
        indicator: {
          index: page,
          total: categoryData.media.length,
        },
        title: categoryData.name,
        onClick: () => {
          if (category === index) return;
          store.setState({
            category: index,
            page: 0,
          });
        },
        afterDelay: () => {
          setPage(store, page + 1);
        },
      })
    );
  });
  return nav;
};

const setSubNavMouseEvent = (navItemList, scrollLeft) => {
  let prevX;

  navItemList.addEventListener('mousedown', e => {
    prevX = e.clientX;
  });
  navItemList.addEventListener('mousemove', e => {
    if (!prevX) return;
    navItemList.scrollLeft -= e.clientX - prevX;
    prevX = e.clientX;
  });
  navItemList.addEventListener('mouseup', () => {
    prevX = null;
  });
  navItemList.addEventListener('DOMNodeInsertedIntoDocument', () => {
    navItemList.scrollLeft = scrollLeft;
  });
};

const ListSubNav = store => {
  const { page, media, scrollLeft } = store.getState();
  const nav = document.createElement('nav');
  const navItemList = document.createElement('ul');

  nav.id = 'list_nav';
  nav.classList.add('surface_alt');
  navItemList.id = 'list_nav_list';
  nav.appendChild(navItemList);
  media.forEach((mediaItem, index) => {
    navItemList.appendChild(
      ListNavItem({
        selected: page === index,
        title: mediaData.getName(mediaItem),
        onClick: () => {
          if (page === index) return;
          store.setState({ page: index, scrollLeft: navItemList.scrollLeft });
        },
        afterDelay: () => {
          setSubPage(store, page + 1, navItemList.scrollLeft);
        },
      })
    );
  });
  setSubNavMouseEvent(navItemList, scrollLeft);
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

const MediaInfo = (id, newsData) => {
  const mediaInfo = document.createElement('div');

  mediaInfo.classList.add('media_info');
  mediaInfo.appendChild(MediaLogoImg(mediaData.getLogoSrc(id)));
  mediaInfo.appendChild(UpdatedTime(newsData.updated));
  mediaInfo.appendChild(
    SubButton(
      id,
      () => {
        console.log(`${id} unsubscribe`);
      },
      false
    )
  );
  return mediaInfo;
};

const ThumbnailNewsArea = title => {
  const thumbnailNewsArea = document.createElement('section');
  thumbnailNewsArea.classList.add(
    'thumbnail_news',
    'pointer',
    'hover_medium16',
    'text_strong'
  );

  thumbnailNewsArea.innerHTML = `
  <div class="thumbnail">
    <img class="thumbnail" src="https://picsum.photos/300/200" alt="기사 이미지">
  </div>
  <h2 class="title">
    <a>${title}</a>
  </h2>
  `;
  return thumbnailNewsArea;
};

const Notice = title => {
  const notice = document.createElement('li');

  notice.classList.add('text_weak', 'display_medium14');
  notice.innerText = `
  ${title} 언론사에서 직접 편집한 뉴스입니다.`;
  return notice;
};

const NewsList = (mediaId, newsData) => {
  const newsList = document.createElement('ul');
  newsList.classList.add('sub_news');

  newsData.news.forEach(title => {
    const newsItem = document.createElement('li');

    newsItem.innerHTML = `<a class="pointer text_bold hover_medium16">${title}</a>`;
    newsList.appendChild(newsItem);
  });
  newsList.appendChild(Notice(mediaData.getName(mediaId)));
  return newsList;
};

const NewsContent = (mediaId, newsData) => {
  const news = document.createElement('div');

  news.classList.add('news');
  news.appendChild(ThumbnailNewsArea(newsData.thumbnailNews));
  news.appendChild(NewsList(mediaId, newsData));
  return news;
};

const ListContent = (store, viewAll) => {
  const listContent = document.createElement('div');
  const { category, page, media } = store.getState();
  const mediaId = viewAll ? media.category[category].media[page] : media[page];
  const newsData = mediaData.getNews(mediaId);

  listContent.id = 'list_view';
  listContent.appendChild(MediaInfo(mediaId, newsData));
  listContent.appendChild(NewsContent(mediaId, newsData));
  return listContent;
};

const MediaList = (navStore, mediaData) => {
  const viewAll = navStore.getState().media === 'all';
  const store = new Store({
    category: 0,
    page: 0,
    media: viewAll ? mediaData.list : mediaData.subscribed,
    scrollLeft: 0,
  });
  const mediaList = document.createElement('div');

  const draw = () => {
    const nav = viewAll ? ListNav(navStore, store) : ListSubNav(store);
    clearAllChildren(mediaList);
    mediaList.appendChild(nav);
    mediaList.appendChild(ListContent(store, viewAll));
  };

  viewAll ? replaceArrow(store) : replaceSubArrow(store);
  store.subscribe(draw);
  mediaList.id = 'list_view_wrapper';
  draw();
  return mediaList;
};

export default MediaList;
