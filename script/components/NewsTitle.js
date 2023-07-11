import { NEWSDATA } from '../constants.js';

const NewsTitle = text => {
  const newsTitle = document.createElement('div');
  const anchor = document.createElement('a');

  newsTitle.className = 'news_title text_default pointer hover_medium14';
  anchor.innerHTML = text;
  newsTitle.appendChild(anchor);
  return newsTitle;
};

export default NewsTitle;
