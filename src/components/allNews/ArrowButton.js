export default class ArrowButton {
  constructor({ name }) {
    this.$button = document.createElement('button');
    this.$button.className = name === 'LeftButton' ? 'left-button' : 'right-button';
    this.render(name);

    return this.$button;
  }

  render(name) {
    const buttonHTML = `<img src=src/assets/buttons/${name}.svg>`;
    this.$button.innerHTML = buttonHTML;
  }
}
