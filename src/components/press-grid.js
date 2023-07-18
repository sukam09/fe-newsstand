import { HEADER_CLASS, PATH, NUMBER, CONTENT, MODE, BUTTON, ATTRIBUTE } from '../constants/press-grid.js';
import { LIST, PAGE } from '../constants/press-data.js';
import { getSliceIds } from '../utils/shuffle.js';
import { getSnackBar, getAlert } from '../utils/popup.js';

/**
 * 언론사 그리드의 INIT
 */
const initPressGrid = (pressData, pressList) => {
  setGrid();
  setGridFrame();
  setGridArrow(pressData, pressList);
  setGridLogo(pressData, pressList);
  setGridButton(pressData, pressList);
  changeIcon();
};

/**
 * 언론사 그리드의 설정
 */
const setGrid = () => {
  const gridWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_GRID}`);
  const gridElement = `
    <ul class=${HEADER_CLASS.LOGO_WRAPPER_GRID}></ul>
    <img class='${HEADER_CLASS.ARROW_LOGO_LEFT} ${HEADER_CLASS.NONE}' src=${PATH.ARROW_LEFT}></img>
    <img class=${HEADER_CLASS.ARROW_LOGO_RIGHT} src=${PATH.ARROW_RIGHT}></img>
  `;
  gridWrapper.innerHTML = gridElement;
};

const setGridFrame = () => {
  const pressWrapper = document.querySelector(`.${HEADER_CLASS.LOGO_WRAPPER_GRID}`);
  const initFrame = Array.from({ length: NUMBER.GRID_LENGTH }, (_, idx) => idx);
  initFrame.sort((a, b) => b - a);

  initFrame.forEach((frame) => {
    const pressElement = `
      <li class=${HEADER_CLASS.LOGO_LI}>
        <img class='${HEADER_CLASS.IMG}${frame}' src=${HEADER_CLASS.BLANK}></img>
        <button class='${HEADER_CLASS.LOGO_LI_BUTTON} ${HEADER_CLASS.NONE}'>
          <img class=${HEADER_CLASS.LOGO_LI_IMG} src=${PATH.BUTTON_PLUS}></img>
          <p class=${HEADER_CLASS.LOGO_LI_P}>${CONTENT.SUBSCRIBE}</p>
        </button>
      </li>
    `;
    pressWrapper.insertAdjacentHTML('afterbegin', pressElement);
  });
};

/**
 * 언론사 그리드의 화살표
 */
const setGridArrow = (pressData, pressIds) => {
  const arrowLeft = document.querySelector(`.${HEADER_CLASS.ARROW_LOGO_LEFT}`);
  const arrowRight = document.querySelector(`.${HEADER_CLASS.ARROW_LOGO_RIGHT}`);
  const arrowNumber = Math.ceil(pressIds.length / NUMBER.GRID_LENGTH);
  if (!(arrowNumber > NUMBER.ARROW_MIN)) arrowRight.classList.add(HEADER_CLASS.NONE);

  setGridArrowEvent(pressData, pressIds, arrowLeft, NUMBER.ARROW_MINUS);
  setGridArrowEvent(pressData, pressIds, arrowRight, NUMBER.ARROW_PLUS);
};

const setGridArrowEvent = (pressData, pressIds, arrowDirect, direction) => {
  arrowDirect.addEventListener('click', () => {
    PAGE.GRID += direction;

    setGridLogo(pressData, pressIds);
    setGridArrowNone(pressIds);
  });
};

const setGridArrowNone = (pressIds) => {
  const arrowLeft = document.querySelector(`.${HEADER_CLASS.ARROW_LOGO_LEFT}`);
  const arrowRight = document.querySelector(`.${HEADER_CLASS.ARROW_LOGO_RIGHT}`);
  const arrowNumber = Math.ceil(pressIds.length / NUMBER.GRID_LENGTH);

  const showLeftArrow = PAGE.GRID > PAGE.MIN;
  const showRightArrow = PAGE.GRID < PAGE.MAX;

  arrowLeft.classList.toggle(HEADER_CLASS.NONE, !(arrowNumber > NUMBER.ARROW_MIN) || !showLeftArrow);
  arrowRight.classList.toggle(HEADER_CLASS.NONE, !(arrowNumber > NUMBER.ARROW_MIN) || !showRightArrow);
};

/**
 * 언론사 그리드의 로고
 */
const setGridLogo = (pressData, pressIds) => {
  const sliceIds = getSliceIds(pressIds, PAGE.GRID, NUMBER.GRID_LENGTH);
  getGridLogo(pressData, sliceIds);
};

const getGridLogo = (pressData, sliceIds) => {
  sliceIds.forEach((sliceId, idx) => {
    const selectPress = pressData.find((data) => data.id === sliceId);
    const logoWapper = document.querySelector(`.${HEADER_CLASS.IMG}${idx}`);
    logoWapper.setAttribute(ATTRIBUTE.PRESS_ID, sliceId); // 속성 넣어주기

    let mode = localStorage.getItem(ATTRIBUTE.MODE);
    if (mode === MODE.LIGHT) logoWapper.src = selectPress.lightSrc;
    if (mode === MODE.DARK) logoWapper.src = selectPress.darkSrc;
  });
};

/**
 * 언론사 그리드의 라이트/다크모드
 */
const toggleMode = () => {
  const pressLogos = document.querySelectorAll(`.${HEADER_CLASS.LOGO_WRAPPER_GRID} ${HEADER_CLASS.IMG}`);
  pressLogos.forEach((logo) => changeSrc(logo));
};

const changeIcon = () => {
  const modeImg = document.querySelector(`.${HEADER_CLASS.MODE_IMG}`);
  modeImg.addEventListener('click', () => toggleMode());
};

const changeSrc = (logo) => {
  const isLightMode = logo.src.includes(MODE.LIGHT_LOGO);
  const isDarkMode = logo.src.includes(MODE.DARK_LOGO);

  if (isLightMode || isDarkMode) {
    const newLogoSrc = isLightMode
      ? logo.src.replace(MODE.LIGHT_LOGO, MODE.DARK_LOGO)
      : logo.src.replace(MODE.DARK_LOGO, MODE.LIGHT_LOGO);

    logo.src = newLogoSrc;
  }
};

/**
 * 언론사 그리드의 구독하기 버튼
 */
const setGridButton = (pressData, pressIds) => {
  const pressLis = document.querySelectorAll(`.${HEADER_CLASS.LOGO_LI}`);
  const pressIdsLen = pressIds.length;
  const slicePressLis = [];
  pressLis.forEach((li, idx) => (idx < pressIdsLen ? slicePressLis.push(li) : ''));
  slicePressLis.forEach((li) => {
    const isSubscribe = getSubscribeState(li);
    setGridButtonChange(isSubscribe, li);
    setGridButtonHover(li);
    setGridButtonClick(pressData, pressIds, li);
  });
};

const getSubscribeState = (li) => {
  const pressImg = li.querySelector(HEADER_CLASS.IMG);
  const pressId = Number(pressImg.getAttribute(ATTRIBUTE.PRESS_ID));
  const pressSub = LIST.SUBSCRIBE_ID.includes(pressId);
  return pressSub;
};

const setGridButtonChange = (isSubscribe, li) => {
  const buttonImg = li.querySelector(`.${HEADER_CLASS.LOGO_LI_IMG}`);
  const buttonP = li.querySelector(`.${HEADER_CLASS.LOGO_LI_P}`);

  const newButtonSrc = isSubscribe
    ? buttonImg.src.replace(BUTTON.PLUS, BUTTON.CLOSED)
    : buttonImg.src.replace(BUTTON.CLOSED, BUTTON.PLUS);
  const newButtonP = isSubscribe ? CONTENT.UNSUBSCRIBE : CONTENT.SUBSCRIBE;

  buttonImg.src = newButtonSrc;
  buttonP.innerText = newButtonP;
};

const setGridButtonHover = (li) => {
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
};

const setGridButtonClick = (pressData, pressIds, li) => {
  li.addEventListener('click', () => {
    const pressImg = li.querySelector(HEADER_CLASS.IMG);
    const pressId = Number(pressImg.getAttribute(ATTRIBUTE.PRESS_ID));
    const pressName = pressData.find((press) => press.id === pressId).name;
    const isSubscribe = LIST.SUBSCRIBE_ID.includes(pressId);
    isSubscribe
      ? (LIST.SUBSCRIBE_ID = LIST.SUBSCRIBE_ID.filter((id) => id !== pressId))
      : LIST.SUBSCRIBE_ID.push(pressId);
    setSubscribe(pressData, pressIds, pressName, isSubscribe);
  });
};

const setSubscribe = (pressData, pressIds, pressName, isSubscribe) => {
  if (isSubscribe) getAlert(pressData, pressIds, pressName);
  if (!isSubscribe) getSnackBar(pressData);
};

export { initPressGrid };
