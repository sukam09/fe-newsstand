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

      //
    })
    .catch((error) => {
      console.error('언론사 정보를 불러오는 중에 오류가 발생했습니다.', error);
    });
};

/**
 * 해당 카테고리의 MAIN 화면 - ing
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
 * 카테고리 이름을 설정하는 함수
 */
const setPressCategoryNav = (categoryData) => {
  const categoryNav = document.querySelector('.press-category__nav');

  categoryData.forEach((data) => {
    const categoryDiv = `
    <div class='press-category__div-nav'>
      <p class='press-category__p-nav'>${data.categoryName}</p>
    </div>
    `;

    categoryNav.insertAdjacentHTML('beforeend', categoryDiv);
  });
};

/**
 *
 */

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
    <section class='press-category__section-main'>
      <nav class='section-main__nav'>
        <img class='section-main__img-logo'>
        <time class='section-main__time'></time>
        <buttion class='section-main__button' />
      </nav>
      <img class='section-main__img-article' />
      <h2 class='section-main__h2'></h2>
    </section>

    <section class='press-category__section-sub'>
      <footer class='section-sub__footer'></footer>
    </section>

  </article>
  `;

  arrowsWrapper.innerHTML = pressCategoryNav + pressCategoryArticle;
};

// const setPressCategoryElement = () => {};

export { setTotalPressList };
