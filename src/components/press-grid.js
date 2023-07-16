import { getShuffleList, getSliceList } from '../utils/shuffle.js';

/**
 * 언론사 그리드의 INIT
 */
const initPressGrid = (pressData) => {
  initEntirePressGrid(pressData);

  //
  // console.log(pressData);

  // const shufflePress = getShuffleList(pressData.length);

  // setGrid();
  // setGridImg(pressData, shufflePress); // 전체 언론사

  // setGridFrame();
  // setGridLogo(pressData, shufflePress);
  // // setGridLogo(pressData, shufflePress); ////
};

const initEntirePressGrid = (pressData) => {
  const shufflePress = getShuffleList(pressData.length);
  localStorage.setItem('entirePage', 0);

  setGrid('entire');
  setGridFrame('entire');
  setGridArrow(pressData, shufflePress, 'entirePage', 'entire'); // 전체 언론사
  setGridLogo(pressData, shufflePress, 0, 'entire');
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
      </li>
    `;
    pressWrapper.insertAdjacentHTML('afterbegin', pressElement);
  });
};

const setGridArrow = (pressData, pressList, page, section) => {
  const arrowLeft = document.querySelector(`.arrows-logo__img-left__${section}`);
  const arrowRight = document.querySelector(`.arrows-logo__img-right__${section}`);

  setGridArrowEvent(pressData, pressList, arrowLeft, page, -1, section);
  setGridArrowEvent(pressData, pressList, arrowRight, page, +1, section);
};

const setGridArrowEvent = (pressData, pressList, arrow, page, direction, section) => {
  arrow.addEventListener('click', () => {
    const pageNum = Number(localStorage.getItem(page)) + direction;
    localStorage.setItem(page, pageNum);

    setGridLogo(pressData, pressList, pageNum, section);
    setGridArrowNone(pressList, pageNum, section);
  });
};

/// 수정
const setGridArrowNone = (pressList, pageNum, section) => {
  const arrowLeft = document.querySelector(`.arrows-logo__img-left__${section}`);
  const arrowRight = document.querySelector(`.arrows-logo__img-right__${section}`);
  const arrowNumber = Math.ceil(pressList.length / 24);

  if (pageNum === 0) {
    arrowLeft.classList.add('none');
  }
  if (pageNum > 0 && pageNum < 3) {
    arrowLeft.classList.remove('none');
    arrowRight.classList.remove('none');
  }
  if (pageNum === 3) {
    arrowRight.classList.add('none');
  }
};

const setGridLogo = (pressData, pressList, pageNum, section) => {
  const shufflePressNum = getSliceList(pressList, pageNum, 24);
  getGridLogo(pressData, shufflePressNum, section);
};

const getGridLogo = (pressData, pressList, section) => {
  pressList.forEach((pressNum, idx) => {
    const selectPress = pressData.find((data) => data.id === pressNum); // 언론사 데이터 찾기
    const logoWapper = document.querySelector(`.${section}Img${idx}`);
    logoWapper.src = selectPress.lightSrc;
  });
};

export { initPressGrid };
