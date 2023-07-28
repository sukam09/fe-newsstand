import { HEADER_CLASS, PATH, URL, ERROR, TITLE, STYLE } from '../../constants/press-header/press-header.js';
import { LIST } from '../../constants/press-header/press-data.js'; // 변수 빼기
import { Store } from '../../utils/store.js';
import { getFetchData } from '../../utils/fetch.js';
import { initLightDarkMode } from './light-dark-mode.js';

import { initPressGrid } from './press-grid/press-grid.js';
import { initPressList } from './press-list/press-list.js';

class PressHeaderStore extends Store {
  constructor() {
    super();
    this.state = {
      isGrid: true,
      isEntire: true,
    };

    this.pressData = [];
    this.renderDOM();
    this.setupEvent();
    initLightDarkMode();
  }

  async initPress() {
    try {
      const fetchData = await getFetchData(URL.DATA);
      this.pressData = fetchData.press;

      this.render();
      this.subscribe(this.render.bind(this));
    } catch (error) {
      console.error(ERROR.MESSESE, error);
    }
  }

  renderDOM() {
    const pressHeader = document.querySelector(`.${HEADER_CLASS.PRESS_HEADER}`);
    pressHeader.insertAdjacentHTML('beforeend', this.renderNavLeft());
    pressHeader.insertAdjacentHTML('beforeend', this.renderNavRight());

    this.gridWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_GRID}`);
    this.listWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_LIST}`);
    this.h2Entire = document.querySelector(`.${HEADER_CLASS.H2_ENTIRE}`);
    this.h2Subscribe = document.querySelector(`.${HEADER_CLASS.H2_SUBSCRIBE}`);
    this.imgList = document.querySelector(`.${HEADER_CLASS.IMG_LIST}`);
    this.imgGrid = document.querySelector(`.${HEADER_CLASS.IMG_GRID}`);
  }

  renderNavLeft() {
    return `
      <nav class=${HEADER_CLASS.NAV_LEFT}>
        <h2 class="${HEADER_CLASS.H2_ENTIRE} press__h2-select">${TITLE.ENTIRE}</h2>
        <h2 class="${HEADER_CLASS.H2_SUBSCRIBE} press__h2-unselect">${TITLE.SUBSCRIBE}</h2>
      </nav>
    `;
  }

  renderNavRight() {
    return `
      <nav class=${HEADER_CLASS.NAV_RIGHT}>
        <img class=${HEADER_CLASS.IMG_LIST} src=${PATH.HIDE_LIST_ICON} />
        <img class=${HEADER_CLASS.IMG_GRID} src=${PATH.GRID_ICON}  />
      </nav>
    `;
  }

  setupEvent() {
    this.h2Entire.addEventListener('click', () => this.setState({ isEntire: true, isGrid: true }));
    this.h2Subscribe.addEventListener('click', () => this.setState({ isEntire: false, isGrid: false }));
    this.imgList.addEventListener('click', () => this.setState({ isGrid: false }));
    this.imgGrid.addEventListener('click', () => this.setState({ isGrid: true }));
  }

  render() {
    const isGrid = this.state.isGrid;
    const isEntire = this.state.isEntire;

    this.gridWrapper.classList.toggle(STYLE.NONE, !isGrid);
    this.listWrapper.classList.toggle(STYLE.NONE, isGrid);
    this.h2Entire.classList.toggle(HEADER_CLASS.H2_SELECT, isEntire);
    this.h2Entire.classList.toggle(HEADER_CLASS.H2_UNSELECT, !isEntire);
    this.h2Subscribe.classList.toggle(HEADER_CLASS.H2_SELECT, !isEntire);
    this.h2Subscribe.classList.toggle(HEADER_CLASS.H2_UNSELECT, isEntire);

    if (isEntire && isGrid) this.renderPress(PATH.HIDE_LIST_ICON, PATH.GRID_ICON, LIST.SUFFLE_ID);
    if (isEntire && !isGrid) this.renderPress(PATH.LIST_ICON, PATH.HIDE_GRID_ICON, LIST.CATEGORY_NAME);
    if (!isEntire && isGrid) this.renderPress(PATH.HIDE_LIST_ICON, PATH.GRID_ICON, LIST.SUBSCRIBE_ID);
    if (!isEntire && !isGrid) this.renderPress(PATH.LIST_ICON, PATH.HIDE_GRID_ICON, LIST.SUBSCRIBE_NAME);
  }

  renderPress(listIcon, gridIcon, initPress) {
    this.imgList.src = listIcon;
    this.imgGrid.src = gridIcon;
    if (this.state.isGrid) initPressGrid(this.pressData, initPress);
    if (!this.state.isGrid) initPressList(this.pressData, initPress);
  }
}

const pressHeaderStore = new PressHeaderStore();
export default pressHeaderStore;
