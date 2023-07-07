import Icon from './Icon.js';

export default class Button {
  constructor({ colors, states, icon, text = '' }) {
    this.$button = document.createElement('button');
    this.$button.className = 'news-stand-logo ';

    this.colors = colors;
    this.states = states;
    this.icon = icon;
    this.text = text;

    this.render();

    return this.$button;
  }

  render() {
    const $iconImg = new Icon({ name: this.icon });

    this.$button.innerHTML = `${$iconImg.outerHTML} ${this.text}`;
  }
}
