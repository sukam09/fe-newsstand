export default class LatestNewsComponent {
  constructor() {
    this.$component = document.createElement('div');
    this.$component.className = 'auto-rolling-news';

    this.render('연합뉴스', '[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출');
    return this.$component;
  }

  render(name, content) {
    const $newsName = document.createElement('span');
    const $newsContent = document.createElement('p');

    $newsName.innerText = name;
    $newsContent.innerText = content;

    this.$component.appendChild($newsName);
    this.$component.appendChild($newsContent);
  }
}
