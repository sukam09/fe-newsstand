export default class Icon {
  constructor({ name }) {
    this.$img = document.createElement('img');

    this.render(name);

    return this.$img;
  }

  render(name) {
    this.$img.src = `src/assets/icons/${name}.svg`;
  }
}
