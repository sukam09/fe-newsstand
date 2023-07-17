import { getShuffleIds, getSliceIds } from '../utils/shuffle.js';

const ARROW_DISPLAY_THRESHOLD = 3;
/**
 * 언론사 그리드의 INIT
 */
const initPressGrid = (pressData) => {
  initEntirePressGrid(pressData);
  initSubscribePressGrid(pressData);
};

const initEntirePressGrid = (pressData) => {
  const shuffleIds = getShuffleIds(pressData.length);
  localStorage.setItem('entirePage', 0);
  const shuffleIdsLen = shuffleIds.length;

  setGrid('entire');
  setGridFrame('entire');
  setGridButton('entire', shuffleIdsLen);
  setGridArrow(pressData, shuffleIds, 'entirePage', 'entire');
  setGridLogo(pressData, shuffleIds, 0, 'entire');
  changeIcon('entire');
};

const initSubscribePressGrid = (pressData) => {
  pressData[0].isSub = true; // test
  pressData[1].isSub = true; // test
  // 구독한 순서대로 처리해야함
  // subscribePress는 구독한 순서 배열 [언론사id, id, ...]

  let subscribeIds = pressData.filter((item) => item.isSub === true);
  subscribeIds = subscribeIds.map((press) => press.id);
  const subscribeIdsLen = subscribeIds.length;
  localStorage.setItem('subscribePage', 0);

  console.log(subscribeIds);

  setGrid('subscribe');
  setGridFrame('subscribe');
  setGridButton('subscribe', subscribeIdsLen);
  setGridArrow(pressData, subscribeIds, 'subscribePage', 'subscribe');
  setGridLogo(pressData, subscribeIds, 0, 'subscribe');
  changeIcon('subscribe');

  document.querySelector('.press__wrapper-grid__subscribe').classList.add('none');
};

/**
 * 언론사 그리드의 설정
 */
const setGrid = (section) => {
  const gridWrapper = document.querySelector(`.press__wrapper-grid__${section}`);
  const gridElement = `
    <ul class='press-logo__wrapper-grid__${section}'></ul>
    <img class='arrows-logo__img-left__${section} none' src='./assets/icons/chevron-left.svg'></img>
    <img class='arrows-logo__img-right__${section}' src='./assets/icons/chevron-right.svg'></img>
  `;
  gridWrapper.innerHTML = gridElement;
};

const setGridFrame = (section) => {
  const pressWrapper = document.querySelector(`.press-logo__wrapper-grid__${section}`);
  const initFrame = Array.from({ length: 24 }, (_, idx) => idx);
  initFrame.sort((a, b) => b - a);

  initFrame.forEach((frame) => {
    const pressElement = `
      <li class='press-logo__li__${section}'>
        <img class=${section}Img${frame} src=''></img>
        <button class="press-logo__li-button__${section} none">
          <img class="press-logo__li-img__${section}" src='./assets/icons/button-plus.svg' />
          <p class="press-logo__li-p__${section}">구독하기</p>
        </button>
      </li>
    `;
    pressWrapper.insertAdjacentHTML('afterbegin', pressElement);
  });
};

/**
 * 언론사 그리드의 화살표
 */
const setGridArrow = (pressData, pressIds, page, section) => {
  const arrowLeft = document.querySelector(`.arrows-logo__img-left__${section}`);
  const arrowRight = document.querySelector(`.arrows-logo__img-right__${section}`);
  const arrowNumber = Math.ceil(pressIds.length / 24);
  if (!(arrowNumber > 1)) arrowRight.classList.add('none');

  setGridArrowEvent(pressData, pressIds, arrowLeft, page, -1, section);
  setGridArrowEvent(pressData, pressIds, arrowRight, page, +1, section);
};

const setGridArrowEvent = (pressData, pressIds, arrow, page, direction, section) => {
  arrow.addEventListener('click', () => {
    const pageNum = Number(localStorage.getItem(page)) + direction;
    localStorage.setItem(page, pageNum);

    setGridLogo(pressData, pressIds, pageNum, section);
    setGridArrowNone(pressIds, pageNum, section);
  });
};

const setGridArrowNone = (pressIds, pageNum, section) => {
  const arrowLeft = document.querySelector(`.arrows-logo__img-left__${section}`);
  const arrowRight = document.querySelector(`.arrows-logo__img-right__${section}`);
  const arrowNumber = Math.ceil(pressIds.length / 24);

  const showLeftArrow = pageNum > 0;
  const showRightArrow = pageNum < ARROW_DISPLAY_THRESHOLD;

  arrowLeft.classList.toggle('none', !(arrowNumber > 1) || !showLeftArrow);
  arrowRight.classList.toggle('none', !(arrowNumber > 1) || !showRightArrow);
};

/**
 * 언론사 그리드의 로고
 */
const setGridLogo = (pressData, pressIds, pageNum, section) => {
  const sliceIds = getSliceIds(pressIds, pageNum, 24);
  getGridLogo(pressData, sliceIds, section);
};

const getGridLogo = (pressData, pressIds, section) => {
  pressIds.forEach((pressId, idx) => {
    const selectPress = pressData.find((data) => data.id === pressId);
    const logoWapper = document.querySelector(`.${section}Img${idx}`);
    logoWapper.setAttribute('pressId', pressId); //////// 수정중

    let mode = localStorage.getItem('mode');
    if (mode === 'light') logoWapper.src = selectPress.lightSrc;
    if (mode === 'dark') logoWapper.src = selectPress.darkSrc;
  });
};

/**
 * 언론사 그리드의 라이트/다크모드
 */
const toggleMode = (section) => {
  const pressLogos = document.querySelectorAll(`.press-logo__wrapper-grid__${section} img`);
  pressLogos.forEach((logo) => changeSrc(logo));
};

const changeIcon = (section) => {
  const modeImg = document.querySelector('.mode__img');
  modeImg.addEventListener('click', () => toggleMode(section));
};

const changeSrc = (logo) => {
  const isLightMode = logo.src.includes('light-press-logo');
  const isDarkMode = logo.src.includes('dark-press-logo');

  if (isLightMode || isDarkMode) {
    const newLogoSrc = isLightMode
      ? logo.src.replace('light-press-logo', 'dark-press-logo')
      : logo.src.replace('dark-press-logo', 'light-press-logo');

    logo.src = newLogoSrc;
  }
};

/**
 * 언론사 그리드의 구독하기 버튼
 */
const setGridButton = (section, pressIdsLen) => {
  const pressLis = document.querySelectorAll(`.press-logo__li__${section}`);
  const slicePressLis = [];
  pressLis.forEach((li, idx) => {
    if (idx < pressIdsLen) slicePressLis.push(li);
  });

  slicePressLis.forEach((li) => {
    const pressImg = li.querySelector('img');
    const pressButton = li.querySelector('button');

    // console.log(pressImg);
    // console.log(pressImg.src);
    // console.log(pressImg.getAttribute('src') !== '');

    li.addEventListener('mouseover', () => {
      pressImg.classList.add('none');
      pressButton.classList.remove('none');
      li.classList.add('press-logo__li__entire-hover');
    });

    li.addEventListener('mouseout', () => {
      pressImg.classList.remove('none');
      pressButton.classList.add('none');
      li.classList.remove('press-logo__li__entire-hover');
    });

    // if (pressImg.getAttribute('src') !== '') {}
  });
};

export { initPressGrid };
