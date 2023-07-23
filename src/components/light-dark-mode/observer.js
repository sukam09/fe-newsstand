import { Observer } from '../../utils/observer.js';

class ModeObserver extends Observer {
  constructor(lightDarkMode) {
    super(lightDarkMode);
  }

  update() {
    this.updateMode();
    this.updateStyle();
  }

  updateMode() {
    const lightDarkMode = this.subject;
    const modeImg = document.querySelector(`.${MODE_CLASS.IMG}`);
    modeImg.src = lightDarkMode.getModeIcon();
  }

  updateStyle() {
    const lightDarkMode = this.subject;
    const darkMode = document.querySelector(`.${MODE_CLASS.DARK_MODE}`);
    darkMode.href = lightDarkMode.getModeStyle();
  }
}

export { ModeObserver };
