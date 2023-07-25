import { HEADLINE } from '../../constants.js';
import { getHeadlineNews } from '../../fetch/getNewsData.js';
import HeadlineStore from '../../store/HeadlineStore.js';

export const rollingNewsTitle = (text = '') => {
  return `<div class="news_title text_default pointer hover_medium14">
    <a>${text}</a>
  </div>`;
};

export const updateNewsContent = (titleWrapper, newsData, currentIndex) => {
  const newsTitles = titleWrapper.querySelectorAll('.news_title');

  newsTitles.forEach((newsTitle, index) => {
    newsTitle.outerHTML = rollingNewsTitle(
      newsData[(currentIndex + index) % newsData.length]
    );
  });
};

const initHeadline = () => {
  const titleWrappers = document.querySelectorAll('.news_title_wrapper');

  titleWrappers.forEach(async (titleWrapper, index) => {
    const mediaTitle = titleWrapper.parentElement.querySelector('h2');
    const newsData = await getHeadlineNews(index);
    const headlineStore = new HeadlineStore(newsData);

    mediaTitle.innerText = newsData.media;
    titleWrapper.innerHTML = rollingNewsTitle(newsData.news[0]);
    setTimeout(() => {
      headlineStore.startLoop(titleWrapper);
    }, HEADLINE.DELAY * index);
  });
};

const headlineApp = () => {
  initHeadline();
};

export default headlineApp;
