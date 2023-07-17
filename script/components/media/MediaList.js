import mediaData from '../../../assets/data/mediaData.js';
import ListNavItem from '../ListNavItem.js';
import SubButton from './SubButton.js';

const MediaLogoImg = (src, name) => {
  const mediaLogoElement = document.createElement('img');

  mediaLogoElement.classList.add('media_logo');
  mediaLogoElement.src = src;
  mediaLogoElement.alt = name;
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
  mediaInfo.appendChild(MediaLogoImg(mediaData.getLogoSrc(id), newsData.name));
  mediaInfo.appendChild(UpdatedTime(newsData.updated));
  mediaInfo.appendChild(SubButton(id));
  return mediaInfo;
};

const ListNav = (listData, setPage) => {
  const nav = document.createElement('nav');
  const navItemList = document.createElement('ul');

  nav.id = 'list_nav';
  nav.classList.add('surface_alt');
  navItemList.id = 'list_nav_list';
  nav.appendChild(navItemList);
  listData.categoryData.forEach((category, index) => {
    navItemList.appendChild(
      ListNavItem({
        selected: listData.category === index,
        indicator: {
          index: listData.page,
          total: listData.categoryData[index].media.length,
        },
        title: category.name,
        onClick: () => {
          if (listData.category === index) return;
          listData.category = index;
          setPage(listData, 0);
        },
        afterDelay: () => {
          setPage(listData, listData.page + 1);
        },
      })
    );
  });
  return nav;
};

const ThumbnailNewsImage = src => {
  const thumbnailNewsImageWrapper = document.createElement('div');
  const thumbnailNewsImage = document.createElement('img');

  thumbnailNewsImageWrapper.classList.add('thumbnail');
  thumbnailNewsImage.classList.add('thumbnail');
  thumbnailNewsImage.src = src;
  thumbnailNewsImage.alt = '기사 이미지';
  thumbnailNewsImageWrapper.appendChild(thumbnailNewsImage);
  return thumbnailNewsImageWrapper;
};

const ThumbnailNewsTitle = title => {
  const thumbnailNewsTitle = document.createElement('h2');
  thumbnailNewsTitle.classList.add('title');
  const thumbnailNewsTitleLink = document.createElement('a');

  thumbnailNewsTitleLink.innerText = title;
  thumbnailNewsTitle.appendChild(thumbnailNewsTitleLink);
  return thumbnailNewsTitle;
};

const ThumbnailNewsArea = title => {
  const thumbnailNewsArea = document.createElement('section');
  thumbnailNewsArea.classList.add(
    'thumbnail_news',
    'pointer',
    'hover_medium16',
    'text_strong'
  );

  thumbnailNewsArea.appendChild(
    // 임시 이미지
    ThumbnailNewsImage('https://picsum.photos/300/200')
  );
  thumbnailNewsArea.appendChild(ThumbnailNewsTitle(title));
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
    const newsLink = document.createElement('a');

    newsLink.classList.add('pointer', 'text_bold', 'hover_medium16');
    newsLink.innerText = title;
    newsItem.appendChild(newsLink);
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

const ListContent = mediaId => {
  const listContent = document.createElement('div');
  const newsData = mediaData.getNews(mediaId);

  listContent.id = 'list_view';
  listContent.appendChild(MediaInfo(mediaId, mediaData.getNews(mediaId)));
  listContent.appendChild(NewsContent(mediaId, newsData));
  return listContent;
};

const MediaList = (listData, setPage) => {
  const mediaList = document.createElement('div');
  const mediaId = listData.categoryData[listData.category].media[listData.page];

  mediaList.id = 'list_view_wrapper';
  mediaList.appendChild(ListNav(listData, setPage));
  mediaList.appendChild(ListContent(mediaId));
  return mediaList;
};

export default MediaList;
