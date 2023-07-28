import { HEADER_CLASS, ATTRIBUTE, BUTTON, CONTENT } from '../../../constants/press-header/press-grid.js';
import { LIST } from '../../../constants/press-header/press-data.js';
import { getSnackBar, getAlert } from '../../../utils/popup.js';

class GridButton {
  constructor(pressData, pressList) {
    this.pressData = pressData;
    this.pressList = pressList;
  }

  initButton() {
    const pressLis = document.querySelectorAll(`.${HEADER_CLASS.LOGO_LI}`);
    const pressLen = this.pressList.length;
    const slicePressLis = [];

    pressLis.forEach((li, idx) => (idx < pressLen ? slicePressLis.push(li) : ''));
    slicePressLis.forEach((li) => {
      const isSubscribe = this.getSubscribe(li);
      this.setupHover(li);
      this.setupButton(isSubscribe, li);
      this.setupClick(isSubscribe, li);
    });
  }

  getSubscribe(li) {
    const pressImg = li.querySelector(HEADER_CLASS.IMG);
    const pressId = Number(pressImg.getAttribute(ATTRIBUTE.PRESS_ID));
    return LIST.SUBSCRIBE_ID.includes(pressId);
  }

  setupHover(li) {
    const pressImg = li.querySelector(HEADER_CLASS.IMG);
    const pressButton = li.querySelector(HEADER_CLASS.BUTTON);

    li.addEventListener('mouseover', () => {
      pressImg.classList.add(HEADER_CLASS.NONE);
      pressButton.classList.remove(HEADER_CLASS.NONE);
      li.classList.add(HEADER_CLASS.LOGO_LI_HOVER);
    });

    li.addEventListener('mouseout', () => {
      pressImg.classList.remove(HEADER_CLASS.NONE);
      pressButton.classList.add(HEADER_CLASS.NONE);
      li.classList.remove(HEADER_CLASS.LOGO_LI_HOVER);
    });
  }

  setupButton(isSubscribe, li) {
    const buttonImg = li.querySelector(`.${HEADER_CLASS.LOGO_LI_IMG}`);
    const buttonP = li.querySelector(`.${HEADER_CLASS.LOGO_LI_P}`);

    const newButtonSrc = isSubscribe
      ? buttonImg.src.replace(BUTTON.PLUS, BUTTON.CLOSED)
      : buttonImg.src.replace(BUTTON.CLOSED, BUTTON.PLUS);
    const newButtonP = isSubscribe ? CONTENT.UNSUBSCRIBE : CONTENT.SUBSCRIBE;

    buttonImg.src = newButtonSrc;
    buttonP.innerText = newButtonP;
  }

  setupClick(isSubscribe, li) {
    li.addEventListener('click', () => {
      const pressImg = li.querySelector(HEADER_CLASS.IMG);
      const pressId = Number(pressImg.getAttribute(ATTRIBUTE.PRESS_ID));
      const pressName = this.pressData.find((press) => press.id === pressId).name;

      if (isSubscribe) {
        LIST.SUBSCRIBE_ID = LIST.SUBSCRIBE_ID.filter((id) => id !== pressId);
        LIST.SUBSCRIBE_NAME = LIST.SUBSCRIBE_NAME.filter((name) => name !== pressName);
        getAlert(this.pressList, pressName);
      }
      if (!isSubscribe) {
        LIST.SUBSCRIBE_ID.push(pressId);
        LIST.SUBSCRIBE_NAME.push(pressName);
        getSnackBar(this.pressData);
      }
    });
  }
}

const initGridButton = (pressData, pressList) => {
  const gridButton = new GridButton(pressData, pressList);
  gridButton.initButton();
};

export { initGridButton };
