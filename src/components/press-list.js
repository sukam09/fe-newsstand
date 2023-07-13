let pageNum = 0;

/**
 * 언론사 불러오기
 */
const setTotalPressList = (isLightMode) => {
  fetch('./assets/data/category-news.json')
    .then((response) => response.json())
    .then((data) => {
      //

      let shufflePress = getPressList(data);
      setPressCategoryElement(); //

      // setPressCategoryElement(data, shufflePress, isLightMode);ㄴ

      //   makePressGrid(data, shufflePress, isLightMode);

      setPressCategoryNav(data);
      setPressCategoryMain(data);
      setPressCategorySub(data);

      //
    })
    .catch((error) => {
      console.error('언론사 정보를 불러오는 중에 오류가 발생했습니다.', error);
    });
};

/**
 * 해당 카테고리의 SUB 화면
 */
const setPressCategorySub = (data) => {
  const categorySub = document.querySelector('.press-category__section-sub');
  const categoryInitDataName = data[0].data[0].name;
  const categoryInitDataTitle = data[0].data[0].subTitleList;

  const categoryFooter = `
  <footer class='section-sub__footer'>${categoryInitDataName} 언론사에서 직접 편집한 뉴스입니다.</footer>
  `;

  categoryInitDataTitle.forEach((initData) => {
    const subTitle = `
    <h4 class='press-category__h4-sub'>
      <a class='press-category__a-sub' href=${initData.link}>${initData.title}</a>
    </h4>
    `;
    categorySub.insertAdjacentHTML('beforeend', subTitle);
  });

  categorySub.insertAdjacentHTML('beforeend', categoryFooter);
};

/**
 * 해당 카테고리의 MAIN 화면
 */
const setPressCategoryMain = (data) => {
  const categoryMain = document.querySelector('.press-category__section-main');
  const categoryInitData = data[0].data[0];

  const categoryMainElement = `
  <nav class='section-main__nav'>
    <img class='section-main__img-logo' src=${categoryInitData.logoSrc}>
    <time class='section-main__time'>${categoryInitData.editTime} 편집</time>
    <buttion class='section-main__button'>
      <img class='section-main__img-button' src='./assets/icons/button-plus.svg' />
      <p class='section-main__p-button'>구독하기</p>
    </button>
  </nav>
  <img class='section-main__img-article' src=${categoryInitData.imgSrc}/>
  <h2 class='section-main__h2'>${categoryInitData.mainTitle}</h2>
  `;

  categoryMain.innerHTML = categoryMainElement;
};

/**
 * LIST의 NAV 화면 - 카테고리 이름을 설정
 */
const setPressCategoryNav = (categoryData) => {
  const categoryUl = document.querySelector('.press-category__ul');

  categoryData.forEach((data) => {
    const categoryLi = `
    <li class='press-category__li'>
      <p class='press-category__p'>${data.categoryName}</p>
    </li>
    `;
    categoryUl.insertAdjacentHTML('beforeend', categoryLi);
  });

  setProgressBar();
};

/**
 * LIST의 NAV 화면 - Progress Bar 설정
 */
const setProgressBar = () => {
  const liList = document.querySelectorAll('.press-category__li');

  liList.forEach((li) => {
    li.addEventListener('click', () => {
      const resetLi = document.querySelector('.progress-start');
      resetLi.classList.remove('progress-start');
      li.classList.add('progress-start');
    });
  });

  const initLi = document.querySelector('.press-category__ul');
  initLi.firstElementChild.classList.add('progress-start');
};

/**
 * 언론사 리스트의 HTML 틀
 */
const setPressCategoryElement = () => {
  const arrowsWrapper = document.querySelector('.arrows__wrapper-list');
  arrowsWrapper.classList.add('displayNone');

  const pressCategoryNav = `
  <nav class='press-category__nav'>
    <ul class='press-category__ul'></ul>
  </nav>
  `;

  const pressCategoryArticle = `
  <article class='press-category__article'>
    <section class='press-category__section-main'></section>
    <section class='press-category__section-sub'></section>
  </article>
  `;

  arrowsWrapper.innerHTML = pressCategoryNav + pressCategoryArticle;
};

// const setPressCategoryElement = () => {};

////
const shuffleList = (list) => {
  list.sort(() => Math.random() - 0.5);
};

const getPressList = (pressData) => {
  let shufflePress = Array.from({ length: pressData.length }, (_, idx) => idx + 1);
  shuffleList(shufflePress);

  return shufflePress;
};

///

export { setTotalPressList };
