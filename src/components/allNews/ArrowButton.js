export default class ArrowButton {
  constructor({ name }) {
    this.$button = document.createElement('button');

    this.init(name);

    return this.$button;
  }

  init(name) {
    const buttonHTML = `<img src=src/assets/buttons/${name}.svg>`;
    this.$button.innerHTML = buttonHTML;
  }
}
