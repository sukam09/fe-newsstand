let pageNum = 0;

const setPressGrid = (isLightMode) => {
  const pressHeader = document.querySelector('.press__header');

  pressHeader.appendChild(getNavLeftElement());
  pressHeader.appendChild(getNavRightElement());

  setTotalPress(isLightMode);
};

const getNavLeftElement = () => {
  const $navLeft = document.createElement('nav');
  $navLeft.classList.add('press__nav-left');

  const $h2Select = document.createElement('h2');
  $h2Select.classList.add('press__h2-select');
  $h2Select.innerText = '전체 언론사';

  const $h2UnSelect = document.createElement('h2');
  $h2UnSelect.classList.add('press__h2-unselect');
  $h2UnSelect.innerText = '내가 구독한 언론사';

  $navLeft.appendChild($h2Select);
  $navLeft.appendChild($h2UnSelect);

  return $navLeft;
};

const getNavRightElement = () => {
  const $navRight = document.createElement('nav');
  $navRight.classList.add('press__nav-right');

  const $imgList = document.createElement('img');
  $imgList.classList.add('press__img');
  $imgList.src = './assets/icons/list-view.svg';

  const $imgGrid = document.createElement('img');
  $imgGrid.classList.add('press__img');
  $imgGrid.src = './assets/icons/grid-view.svg';

  $navRight.appendChild($imgList);
  $navRight.appendChild($imgGrid);

  return $navRight;
};

/**
 * 언론사 불러오기
 */
const setTotalPress = (isLightMode) => {
  fetch('./assets/data/total-press.json')
    .then((response) => response.json())
    .then((data) => {
      makeGrid(data, isLightMode);
    })
    .catch((error) => {
      console.error('언론사 정보를 불러오는 중에 오류가 발생했습니다.', error);
    });
};

const shuffleList = (list) => {
  list.sort(() => Math.random() - 0.5);
};

const makeGrid = (pressData, isLightMode) => {
  const pressLogoWrapper = document.querySelector('.press-logo__wrapper');
  let gridIndex = Array.from({ length: pressData.length }, (_, idx) => idx + 1);
  shuffleList(gridIndex);

  let gridPage = gridIndex.slice(pageNum * 24, pageNum * 24 + 24);
  gridPage.forEach((pressNum, idx) => {
    const $li = document.createElement('li');
    $li.classList.add('press-logo__li');

    const selectPress = pressData.filter((data) => data.id === pressNum);
    const imgSrc = isLightMode ? selectPress[0].lightSrc : selectPress[0].darkSrc;

    let checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = () => {
      const $img = document.createElement('img');
      $img.src = imgSrc;
      $li.appendChild($img);
      pressLogoWrapper.append($li);
    };
  });
};

export { setPressGrid };
