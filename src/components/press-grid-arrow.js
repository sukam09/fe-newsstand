import { HEADER_CLASS, NUMBER, MODE, ATTRIBUTE } from '../constants/press-grid.js';
import { getSliceIds } from '../utils/shuffle.js';
import { Store } from '../utils/store.js';

class GridArrowStore extends Store {
  constructor(pressData, pressList) {
    super();
    this.state = {
      page: 0,
    };
    this.pressData = pressData;
    this.pressList = pressList;

    this.setupEvent();
    this.setupIcon();
    this.render();
  }

  initArrow() {
    this.subscribe(this.render.bind(this));
  }

  render() {
    this.renderLogo();
    this.renderArrow();
  }

  setupEvent() {
    this.arrowLeft = document.querySelector(`.${HEADER_CLASS.ARROW_LOGO_LEFT}`);
    this.arrowRight = document.querySelector(`.${HEADER_CLASS.ARROW_LOGO_RIGHT}`);
    this.arrowNumber = Math.ceil(this.pressList.length / NUMBER.GRID_LENGTH);

    this.arrowLeft.addEventListener('click', () => this.setState({ page: this.state.page + NUMBER.MINUS }));
    this.arrowRight.addEventListener('click', () => this.setState({ page: this.state.page + NUMBER.PLUS }));
  }

  renderLogo() {
    this.sliceIds = getSliceIds(this.pressList, this.state.page, NUMBER.GRID_LENGTH);
    this.sliceIds.forEach((sliceId, idx) => {
      this.selectPress = this.pressData.find((data) => data.id === sliceId);
      this.logoWapper = document.querySelector(`.${HEADER_CLASS.IMG}${idx}`);
      this.logoWapper.setAttribute(ATTRIBUTE.PRESS_ID, sliceId);
      this.logoWapper.src = this.selectPress.lightSrc;
    });
  }

  renderArrow() {
    this.showLeftArrow = this.state.page > NUMBER.PAGE_MIN;
    this.showRightArrow = this.state.page < NUMBER.PAGE_MAX;

    this.arrowLeft.classList.toggle(HEADER_CLASS.NONE, !(this.arrowNumber > NUMBER.ARROW_MIN && this.showLeftArrow));
    this.arrowRight.classList.toggle(HEADER_CLASS.NONE, !(this.arrowNumber > NUMBER.ARROW_MIN && this.showRightArrow));
  }

  setupIcon() {
    this.modeImg = document.querySelector(`.${HEADER_CLASS.MODE_IMG}`);
    this.modeImg.addEventListener('click', this.renderMode.bind(this));
  }

  renderMode() {
    this.pressLogos = document.querySelectorAll(`.${HEADER_CLASS.LOGO_WRAPPER_GRID} ${HEADER_CLASS.IMG}`);
    this.pressLogos.forEach((logo) => this.changeSrc(logo));
  }

  changeSrc(logo) {
    this.isLightMode = logo.src.includes(MODE.LIGHT_LOGO);
    this.isDarkMode = logo.src.includes(MODE.DARK_LOGO);

    if (this.isLightMode || this.isDarkMode) {
      this.newLogoSrc = this.isLightMode
        ? logo.src.replace(MODE.LIGHT_LOGO, MODE.DARK_LOGO)
        : logo.src.replace(MODE.DARK_LOGO, MODE.LIGHT_LOGO);

      logo.src = this.newLogoSrc;
    }
  }
}

const initGridArrow = (pressData, pressList) => {
  const gridArrowStore = new GridArrowStore(pressData, pressList);
  gridArrowStore.initArrow();
};

export { initGridArrow };
