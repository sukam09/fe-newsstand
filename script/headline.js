import NewsTitle from './components/NewsTitle.js';
import { HEADLINE, HEADLINE_DATA } from './constants.js';

const startRolling = newsTitleWrapper => {
  const newsTitle = newsTitleWrapper.querySelector('.news_title');

  newsTitleWrapper.classList.add('rolling');
  newsTitleWrapper.insertBefore(NewsTitle(), newsTitle);
};

const updateNewsContent = (newsTitleWrapper, newsData) => {
  const newsTitles = newsTitleWrapper.querySelectorAll('.news_title');

  newsTitles.forEach((newsTitle, index) => {
    newsTitle.replaceWith(
      NewsTitle(newsData.news[(newsData.index + index) % newsData.news.length])
    );
  });
};

const startLoop = (newsTitleWrapper, index) => {
  const newsLoopData = {
    index: 0,
    news: HEADLINE_DATA.NEWS[index],
    loop: null,
  };

  const updateNews = () => {
    if (!newsTitleWrapper.classList.contains('rolling')) {
      startRolling(newsTitleWrapper);
    }
    updateNewsContent(newsTitleWrapper, newsLoopData);
    newsLoopData.index = (newsLoopData.index + 1) % newsLoopData.news.length;
  };

  newsLoopData.loop = setInterval(updateNews, HEADLINE.INTERVAL);
  newsTitleWrapper.addEventListener('mouseenter', () => {
    clearInterval(newsLoopData.loop);
  });
  newsTitleWrapper.addEventListener('mouseleave', () => {
    newsLoopData.loop = setInterval(updateNews, HEADLINE.INTERVAL);
  });
};

const initHeadline = () => {
  const newsTitleWrappers = document.querySelectorAll('.news_title_wrapper');

  newsTitleWrappers.forEach((newsTitleWrapper, index) => {
    newsTitleWrapper.appendChild(NewsTitle(HEADLINE_DATA.NEWS[index][0]));
    setTimeout(() => {
      startLoop(newsTitleWrapper, index);
    }, HEADLINE.DELAY * index);
  });
};

const headlineApp = () => {
  initHeadline();
};

export default headlineApp;
