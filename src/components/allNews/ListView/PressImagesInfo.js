export default class PressImagesInfo {
  constructor(imgSrc, text) {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "press-imageInfo";

    this.imgSrc = imgSrc;
    this.text = text;
    this.render();

    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(this.createPressImage(this.imgSrc));
    this.$wrapper.appendChild(this.createPressImageTitle(this.text));
  }

  createPressImage(imgSrc) {
    const $pressImg = document.createElement("img");
    $pressImg.classList.add("pressImage");

    $pressImg.src = imgSrc;

    return $pressImg;
  }

  createPressImageTitle(text) {
    const $title = document.createElement("span");
    $title.classList.add("pressImage-title");

    $title.innerText = text;

    return $title;
  }
}
