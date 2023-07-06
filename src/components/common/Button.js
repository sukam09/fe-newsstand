export default class Button {
  constructor({ colors, states, icon, text = '' }) {
    this.$button = document.createElement('button');
    this.$button.className = 'news-stand-logo ';

    this.colors = colors;
    this.states = states;
    this.icon = icon;
    this.text = text;

    this.init();

    return this.$button;
  }

  init() {
    const iconSrc = `src/assets/icons/${this.icon}.svg`;

    this.$button.innerHTML = `<img src='${iconSrc}'} class='icon' />${this.text}<h1>뉴스스탠드</h1>`;
  }
}
