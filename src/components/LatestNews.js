export default class LatestNews {
  constructor() {
    this.$latestNews = document.createElement('div');
    this.$latestNews.className = 'news-wrapper';

    this.init();

    return this.$latestNews;
  }
  init() {
    const $newsName = document.createElement('span');
    const $newsContent = document.createElement('p');

    $newsName.innerText = '연합뉴스';
    $newsContent.innerText = '[1보] !';

    this.$latestNews.appendChild($newsName);
    this.$latestNews.appendChild($newsContent);
  }
}
