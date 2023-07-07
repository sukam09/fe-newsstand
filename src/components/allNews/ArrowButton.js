export default class ArrowButton {
  constructor({ name, isVisible, action }) {
    this.$button = document.createElement('button');
    this.$button.className = name === 'LeftButton' ? 'left-button' : 'right-button';
    this.$button.addEventListener('click', action);
    this.$button.style.visibility = isVisible ? 'visible' : 'hidden';
    this.render(name);

    return this.$button;
  }

  render(name) {
    const buttonHTML = `<img src=src/assets/buttons/${name}.svg>`;
    this.$button.innerHTML = buttonHTML;
  }
}
