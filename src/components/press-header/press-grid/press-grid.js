import { HEADER_CLASS, PATH, NUMBER, CONTENT } from '../../../constants/press-header/press-grid.js';
import { initGridArrow } from './press-grid-arrow.js';
import { initGridButton } from './press-grid-button.js';
import { Store } from '../../../utils/store.js';

class PressGridStore extends Store {
  constructor(pressData, pressList) {
    super();
    this.state = {};
    this.pressData = pressData;
    this.pressList = pressList;

    this.renderGrid();
    this.renderFrame();
    initGridArrow(pressData, pressList);
    initGridButton(pressData, pressList);
  }

  renderGrid() {
    this.gridWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_GRID}`);
    this.gridElement = `
      <ul class=${HEADER_CLASS.LOGO_WRAPPER_GRID}></ul>
      <img class='${HEADER_CLASS.ARROW_LOGO_LEFT} ${HEADER_CLASS.NONE}' src=${PATH.ARROW_LEFT}></img>
      <img class=${HEADER_CLASS.ARROW_LOGO_RIGHT} src=${PATH.ARROW_RIGHT}></img>
    `;
    this.gridWrapper.innerHTML = this.gridElement;
  }

  renderFrame() {
    this.pressWrapper = document.querySelector(`.${HEADER_CLASS.LOGO_WRAPPER_GRID}`);
    this.pressElement = Array.from({ length: NUMBER.GRID_LENGTH }, (_, idx) => {
      return `
        <li class=${HEADER_CLASS.LOGO_LI}>
          <img class='${HEADER_CLASS.IMG}${idx}' src=${HEADER_CLASS.BLANK}></img>
          <button class='${HEADER_CLASS.LOGO_LI_BUTTON} ${HEADER_CLASS.NONE}'>
            <img class=${HEADER_CLASS.LOGO_LI_IMG} src=${PATH.BUTTON_PLUS}></img>
            <p class=${HEADER_CLASS.LOGO_LI_P}>${CONTENT.SUBSCRIBE}</p>
          </button>
        </li>
      `;
    });
    this.pressWrapper.insertAdjacentHTML('afterbegin', this.pressElement.join(''));
  }
}

const initPressGrid = (pressData, pressList) => {
  const pressGridStore = new PressGridStore(pressData, pressList);
};

export { initPressGrid };
