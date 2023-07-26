import { HEADER_CLASS, BUTTON, ARROW, ATTRIBUTE, CATEGORY, NUMBER, CONTENT } from '../../../constants/press-list.js';
import { LIST } from '../../../constants/press-data.js';
import { Store } from '../../../utils/store.js';
import { getSnackBar, getAlert } from '../../../utils/popup.js';

class ListProgress extends Store {
  constructor(pressData, categoryList) {
    super();
    this.pressData = pressData;
    this.categoryList = categoryList;
    this.state = {
      pageCount: 1,
      categoryCount: 1,
      pageLength: LIST.SUFFLE_CATEGORY[0]?.length || 0,
      categoryLength: LIST.SUFFLE_CATEGORY?.length || 0,
    };

    this.setupProgress();
    this.setupClick();
    this.setupButtonEvent();
    this.setupArrow(ARROW.RIGHT);
    this.setupArrow(ARROW.LEFT);
    this.render();
    this.subscribe(this.render.bind(this));
  }

  render() {
    this.setupMain();
    this.setupSub();
    this.setupButton();
    this.setupNav();
  }

  setupNav() {
    const navStart = document.querySelector(`.${HEADER_CLASS.PROGRESS_START}`);
    const navDiv = navStart.querySelector(`.${HEADER_CLASS.CATEGORY_DIV}`);
    const navImg = navStart.querySelector(`.${HEADER_CLASS.CATEGORY_IMG}`);
    const navP = navStart.querySelector(`.${HEADER_CLASS.CATEGORY_P}`);
    const isSubscribe = LIST.SUBSCRIBE_NAME.includes(navP.innerText);

    if (isSubscribe) {
      navDiv.classList.add(HEADER_CLASS.NONE);
      navImg.classList.remove(HEADER_CLASS.NONE);
    }
    if (!isSubscribe) {
      navDiv.classList.remove(HEADER_CLASS.NONE);
      navImg.classList.add(HEADER_CLASS.NONE);
    }
  }

  setupMain() {
    const categoryArticle =
      LIST.SUFFLE_CATEGORY[this.state.categoryCount - NUMBER.INDEX][this.state.pageCount - NUMBER.INDEX];
    const sectionMain = document.querySelector(`.${HEADER_CLASS.SECTION_MAIN}`);
    sectionMain.querySelector(`.${HEADER_CLASS.SECTION_LOGO}`).src = categoryArticle.lightSrc;
    sectionMain.querySelector(`.${HEADER_CLASS.SECTION_EDIT_TIME}`).innerText = categoryArticle.categoryEdit;
    sectionMain.querySelector(`.${HEADER_CLASS.SECTION_ARTICLE}`).src = categoryArticle.categoryImg;
    sectionMain.querySelector(`.${HEADER_CLASS.SECTION_MAIN_P}`).innerText = categoryArticle.categoryMainTitle;
    sectionMain.setAttribute(ATTRIBUTE.PRESS_ID, categoryArticle.id);
    sectionMain.setAttribute(ATTRIBUTE.PRESS_NAME, categoryArticle.name);
  }

  setupSub() {
    const categoryArticle =
      LIST.SUFFLE_CATEGORY[this.state.categoryCount - NUMBER.INDEX][this.state.pageCount - NUMBER.INDEX];
    const sectionSub = document.querySelector(`.${HEADER_CLASS.SECTION_SUB}`);
    const sectionSubList = sectionSub.querySelectorAll(`.${HEADER_CLASS.SECTION_SUB_A}`);
    sectionSub.querySelector(`.${HEADER_CLASS.SECTION_FOOTER_PRESS}`).innerText = categoryArticle.name;
    sectionSubList.forEach((sub, subIdx) => {
      sub.innerText = categoryArticle.categorySubTitle[subIdx].title;
      sub.href = categoryArticle.categorySubTitle[subIdx].link;
    });
  }

  setupProgress() {
    const initLi = document.querySelector(`.${HEADER_CLASS.CATEGORY_UL}`);
    const progressBar = document.querySelectorAll(`.${HEADER_CLASS.CATEGORY_LI}`);
    initLi.querySelector(`.${HEADER_CLASS.CATEGORY_LI}`).classList.add(HEADER_CLASS.PROGRESS_START);
    this.setupNav();

    initLi.querySelector(`.${HEADER_CLASS.CATEGORY_DIV_NOW}`).innerText = this.state.pageCount;
    initLi.querySelector(`.${HEADER_CLASS.CATEGORY_DIV_SUM}`).innerText = this.state.pageLength;

    progressBar.forEach((progress) => {
      progress.addEventListener('animationiteration', () => this.setupNext(progress));
    });
  }

  setupNext(progress) {
    const progressNow = progress.querySelector(`.${HEADER_CLASS.CATEGORY_DIV_NOW}`);
    const PAGE = this.state.pageCount < this.state.pageLength;
    const CATEGORY = this.state.categoryCount < this.state.categoryLength;

    if (PAGE) this.setNextPage(progressNow);
    if (!PAGE && CATEGORY) this.setNextCategory();
    if (!PAGE && !CATEGORY) this.setFirstCategory();
  }

  setNextPage(progressNow) {
    this.setState({ pageCount: this.state.pageCount + NUMBER.INDEX });
    progressNow.innerText = this.state.pageCount;
  }

  setNextCategory() {
    const nextCategoryIndex = this.state.categoryCount + NUMBER.INDEX;
    this.setupNextCategory(nextCategoryIndex);
  }

  setFirstCategory() {
    const firstCategoryIndex = NUMBER.INDEX;
    this.setupNextCategory(firstCategoryIndex);
  }

  setupNextCategory(categoryIndex) {
    this.setState({
      pageCount: NUMBER.INDEX,
      categoryCount: categoryIndex,
      pageLength: LIST.SUFFLE_CATEGORY[categoryIndex - NUMBER.INDEX].length,
    });

    const addLi = document.querySelector(`.${HEADER_CLASS.CATEGORY_UL}`).children[categoryIndex - NUMBER.INDEX];
    this.setupClassList(addLi);
  }

  setupPrev(progress) {
    const progressNow = progress.querySelector(`.${HEADER_CLASS.CATEGORY_DIV_NOW}`);
    const PAGE = NUMBER.INDEX < this.state.pageCount;
    const CATEGORY = NUMBER.INDEX < this.state.categoryCount;

    if (PAGE) this.setPrevPage(progressNow);
    if (!PAGE && CATEGORY) this.setPrevCategory();
    if (!PAGE && !CATEGORY) this.setLastCategory();
  }

  setPrevPage(progressNow) {
    this.setState({ pageCount: this.state.pageCount - NUMBER.INDEX });
    progressNow.innerText = this.state.pageCount;
  }

  setPrevCategory() {
    const nextCategoryIndex = this.state.categoryCount - NUMBER.INDEX;
    this.setupPrevCategory(CATEGORY.PREV, nextCategoryIndex);
  }

  setLastCategory() {
    const firstCategoryIndex = this.state.categoryLength;
    this.setupPrevCategory(CATEGORY.LAST, firstCategoryIndex);
  }

  setupPrevCategory(side, categoryIndex) {
    this.setState({
      categoryCount: categoryIndex,
      pageCount: LIST.SUFFLE_CATEGORY[categoryIndex - NUMBER.INDEX].length,
      pageLength: LIST.SUFFLE_CATEGORY[categoryIndex - NUMBER.INDEX].length,
    });

    const addLi =
      side === CATEGORY.PREV
        ? document.querySelector(`.${HEADER_CLASS.PROGRESS_START}`).previousElementSibling
        : document.querySelector(`.${HEADER_CLASS.CATEGORY_UL}`).lastElementChild;
    this.setupClassList(addLi);
  }

  setupClick() {
    const progressBar = document.querySelectorAll(`.${HEADER_CLASS.CATEGORY_LI}`);
    progressBar.forEach((progress) => {
      progress.addEventListener('click', () => {
        const progressName = progress.querySelector(`.${HEADER_CLASS.CATEGORY_P}`).innerText;
        const isCategory = LIST.CATEGORY_NAME.includes(progressName);
        const progressIndex = isCategory
          ? LIST.CATEGORY_NAME.findIndex((name) => name === progressName)
          : LIST.SUBSCRIBE_NAME.findIndex((name) => name === progressName);

        this.setState({
          pageCount: NUMBER.INDEX,
          categoryCount: progressIndex + NUMBER.INDEX,
          pageLength: LIST.SUFFLE_CATEGORY[this.state.categoryCount - NUMBER.INDEX].length,
        });

        this.setupClassList(progress);
      });
    });
  }

  setupArrow(side) {
    const arrow = document.querySelector(`.${HEADER_CLASS.ARROW}${side}`);
    arrow.addEventListener('click', () => {
      const progressStart = document.querySelector(`.${HEADER_CLASS.PROGRESS_START}`);
      const progressStartClone = progressStart.cloneNode(true);
      progressStartClone.addEventListener('animationiteration', () => this.setupNext(progressStartClone));
      progressStart.parentNode.replaceChild(progressStartClone, progressStart);
      side === ARROW_RIGHT ? this.setupNext(progressStartClone) : this.setupPrev(progressStartClone);
    });
  }

  setupClassList(addLi) {
    const removeLi = document.querySelector(`.${HEADER_CLASS.PROGRESS_START}`);
    removeLi.classList.remove(HEADER_CLASS.PROGRESS_START);
    removeLi.querySelector(`.${HEADER_CLASS.CATEGORY_DIV}`).classList.add(HEADER_CLASS.NONE);

    addLi.classList.add(HEADER_CLASS.PROGRESS_START);
    this.setupNav();
    addLi.querySelector(`.${HEADER_CLASS.CATEGORY_DIV_NOW}`).innerText = this.state.pageCount;
    addLi.querySelector(`.${HEADER_CLASS.CATEGORY_DIV_SUM}`).innerText = this.state.pageLength;
  }

  setupButton() {
    const sectionMain = document.querySelector(`.${HEADER_CLASS.SECTION_MAIN}`);
    const pressId = Number(sectionMain.getAttribute(ATTRIBUTE.PRESS_NAME));
    const isSubscribe = LIST.SUBSCRIBE_ID.includes(pressId);

    const button = document.querySelector(`.${HEADER_CLASS.SECTION_BUTTON}`);
    const buttonImg = button.querySelector(`.${HEADER_CLASS.SECTION_BUTTON_SUBSCRIBE}`);
    const buttonP = button.querySelector(`.${HEADER_CLASS.SECTION_P_SUBSCRIBE}`);

    const newButtonSrc = isSubscribe
      ? buttonImg.src.replace(BUTTON.PLUS, BUTTON.CLOSED)
      : buttonImg.src.replace(BUTTON.CLOSED, BUTTON.PLUS);
    const newButtonP = isSubscribe ? '' : CONTENT.SUBSCRIBE;

    button.classList.toggle(HEADER_CLASS.SECTION_MAIN_BUTTON_CLOSE, isSubscribe);
    buttonImg.src = newButtonSrc;
    buttonP.innerText = newButtonP;
  }

  setupButtonEvent() {
    const button = document.querySelector(`.${HEADER_CLASS.SECTION_BUTTON}`);
    button.addEventListener('click', () => {
      const sectionMain = document.querySelector(`.${HEADER_CLASS.SECTION_MAIN}`);
      const pressId = Number(sectionMain.getAttribute(ATTRIBUTE.PRESS_ID));
      const pressName = sectionMain.getAttribute(ATTRIBUTE.PRESS_NAME);
      const isSubscribe = LIST.SUBSCRIBE_ID.includes(pressId);

      if (isSubscribe) {
        LIST.SUBSCRIBE_ID = LIST.SUBSCRIBE_ID.filter((id) => id !== pressId);
        LIST.SUBSCRIBE_NAME = LIST.SUBSCRIBE_NAME.filter((name) => name !== pressName);
        getAlert(this.categoryList, pressName);
      }
      if (!isSubscribe) {
        LIST.SUBSCRIBE_ID.push(pressId);
        LIST.SUBSCRIBE_NAME.push(pressName);
        getSnackBar(this.pressData);
      }
    });
  }
}

const initListProgress = (pressData, categoryList) => {
  const listProgress = new ListProgress(pressData, categoryList);
};

export { initListProgress };
