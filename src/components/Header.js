export default class Header {
  constructor() {
    this.$header = document.createElement('header');
    this.init();

    return this.$header;
  }

  init() {
    const $headerName = document.createElement('h1');
    const $date = document.createElement('span');

    $headerName.innerText = '뉴스스탠드';
    $date.innerText = '2023.02.10 금요일';
    $date.className = 'date';

    this.$header.appendChild($headerName);
    this.$header.appendChild($date);
  }
}
