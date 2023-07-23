import { MODE_CLASS, MODE, PATH } from '../../constants/light-dark-mode.js';
import { Subject } from '../../utils/observer.js';

/**
 * 뉴스스탠드의 INIT
 * 기본은 Light 모드 🌈
 */
class LightDarkMode extends Subject {
  constructor() {
    super();
    this.mode = MODE.LIGHT;
  }

  initMode() {
    const savedMode = localStorage.getItem(MODE.MODE);
    if (savedMode) this.mode = savedMode;
    if (!savedMode) localStorage.setItem(MODE.MODE, MODE.LIGHT);

    this.renderMode();
    this.addModeEvent();
  }

  renderMode() {
    const navRight = document.querySelector(`.${MODE_CLASS.NAV}`);
    const modeElement = `
      <img class=${MODE_CLASS.IMG} src=${this.getModeIcon()}></img>
    `;
    navRight.insertAdjacentHTML('afterbegin', modeElement);
  }

  toggleMode() {
    if (this.mode === MODE.LIGHT) this.setNotify(MODE.DARK);
    if (this.mode === MODE.DARK) this.setNotify(MODE.LIGHT);
  }

  addModeEvent() {
    const modeImg = document.querySelector(`.${MODE_CLASS.IMG}`);
    modeImg.addEventListener('click', () => this.toggleMode());
  }

  setNotify(mode) {
    this.mode = mode;
    localStorage.setItem(MODE.MODE, mode);
    this.notifyObservers();
  }

  getModeIcon() {
    return this.mode === MODE.LIGHT ? PATH.LIGHT : PATH.DARK;
  }

  getModeStyle() {
    return this.mode === MODE.LIGHT ? PATH.LIGHT_STYLESHEET : PATH.DARK_STYLESHEET;
  }

  getMode() {
    return this.mode;
  }
}

export { LightDarkMode };
