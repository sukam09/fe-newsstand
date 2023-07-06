export default class Icon {
  constructor({ name }) {
    this.$img = document.createElement('img');

    this.init(name);

    return this.$img;
  }

  init(name) {
    this.$img.src = `src/assets/icons/${name}.svg`;
  }
}
