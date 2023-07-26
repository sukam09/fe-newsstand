import { LIST } from '../../../constants/press-data.js';
import { getSnackBar, getAlert } from '../../../utils/popup.js';

class ListButton {
  constructor(pressData, categoryList) {
    this.pressData = pressData;
    this.categoryList = categoryList;
    this.setupClick();
    this.setupButton();
  }

  initButton() {}

  setupClick() {
    const button = document.querySelector('.section-main__button');
    button.addEventListener('click', () => {
      const sectionMain = document.querySelector('.press-category__section-main');
      const pressId = Number(sectionMain.getAttribute('pressid'));
      const pressName = sectionMain.getAttribute('pressname');
      const isSubscribe = LIST.SUBSCRIBE_ID.includes(pressId);

      console.log(pressId);
      console.log(isSubscribe);

      if (isSubscribe) {
        LIST.SUBSCRIBE_ID = LIST.SUBSCRIBE_ID.filter((id) => id !== pressId);
        LIST.SUBSCRIBE_NAME = LIST.SUBSCRIBE_NAME.filter((name) => name !== pressName);
        getAlert(this.categoryList, pressName);
        console.log(this.categoryList);
      }
      if (!isSubscribe) {
        LIST.SUBSCRIBE_ID.push(pressId);
        LIST.SUBSCRIBE_NAME.push(pressName);
        getSnackBar(this.pressData);
      }
    });
  }

  setupButton() {
    const sectionMain = document.querySelector('.press-category__section-main');
    const pressId = Number(sectionMain.getAttribute('pressid'));
    const isSubscribe = LIST.SUBSCRIBE_ID.includes(pressId);
    console.log();
    console.log(isSubscribe);
    const button = document.querySelector('.section-main__button');
    const buttonImg = button.querySelector(`.section-main__img-button`);
    const buttonP = button.querySelector(`.section-main__p-button`);

    const newButtonSrc = isSubscribe
      ? buttonImg.src.replace('plus', 'closed')
      : buttonImg.src.replace('closed', 'plus');
    const newButtonP = isSubscribe ? '' : '구독하기';

    if (isSubscribe) button.classList.add('section-main__button-closed');
    buttonImg.src = newButtonSrc;
    buttonP.innerText = newButtonP;
  }
}

const initListButton = (pressData, categoryList) => {
  const listButton = new ListButton(pressData, categoryList);
  listButton.initButton();
};

export { initListButton };
