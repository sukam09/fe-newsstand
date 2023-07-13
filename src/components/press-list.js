let pageNum = 0;

/**
 * 언론사 불러오기
 */
const setTotalPressList = (isLightMode) => {
  fetch('./assets/data/category-news.json')
    .then((response) => response.json())
    .then((data) => {
      const categoryData = data;
      const shufflePressList = getPressList(categoryData); // 언론사 랜덤
      setPressCategoryElement();
      setPressCategoryNav(categoryData, shufflePressList);

      // 초기 세팅
      setPressCategoryMain(categoryData);
      setPressCategorySub(categoryData);

      // setPressCategoryElement(data, shufflePress, isLightMode);ㄴ
      //   makePressGrid(data, shufflePress, isLightMode);
    })
    .catch((error) => {
      console.error('언론사 정보를 불러오는 중에 오류가 발생했습니다.', error);
    });
};

/**
 * 카테고리 별 랜덤 언론사 화면 가져오기
 */
const getPressCategoryArticle = (categoryData, shufflePressList) => {
  const liList = document.querySelectorAll('.press-category__li');

  const initCategoryArticleList = [...liList].map((li) => {
    const categoryName = li.querySelector('.press-category__p').innerText;
    const categoryArticle = categoryData.filter((data) => data.categoryName === categoryName)[0];
    const shuffleArticle = shufflePressList.filter((_, idx) => categoryArticle.categoryId === idx)[0];

    const initShuffleArticle = shuffleArticle[0];
    const initCategoryArticle = categoryArticle.categoryData[initShuffleArticle];

    return initCategoryArticle;

    li.addEventListener('click', () => {
      const sectionMain = document.querySelector('.press-category__section-main');
      sectionMain.querySelector('.section-main__img-logo').src = initCategoryArticle.logoSrc;
      sectionMain.querySelector('.section-main__edit-time').innerText = initCategoryArticle.editTime;
      sectionMain.querySelector('.section-main__img-article').src = initCategoryArticle.imgSrc;
      sectionMain.querySelector('.section-main__h2').innerText = initCategoryArticle.mainTitle;

      const sectionSub = document.querySelector('.press-category__section-sub');
      sectionSub.querySelectorAll('press-category__a-sub');
    });
  });

  return initCategoryArticleList;
};

/**
 * 카테고리 별 랜덤 언론사 화면 적용하기
 */
const setPressCategoryArticle = (initCategoryArticleList) => {
  const liList = document.querySelectorAll('.press-category__li');

  liList.forEach((li, idx) => {
    li.addEventListener('click', () => {
      const sectionMain = document.querySelector('.press-category__section-main');
      sectionMain.querySelector('.section-main__img-logo').src = initCategoryArticleList[idx].logoSrc;
      sectionMain.querySelector('.section-main__edit-time').innerText = initCategoryArticleList[idx].editTime;
      sectionMain.querySelector('.section-main__img-article').src = initCategoryArticleList[idx].imgSrc;
      sectionMain.querySelector('.section-main__h2').innerText = initCategoryArticleList[idx].mainTitle;

      const sectionSub = document.querySelector('.press-category__section-sub');
      sectionSub.querySelectorAll('press-category__a-sub');
    });
  });

  console.log(initCategoryArticleList);
};

/**
 * 해당 카테고리의 SUB 화면
 */
const setPressCategorySub = (categoryData) => {
  const categorySub = document.querySelector('.press-category__section-sub');
  const categoryInitDataName = categoryData[0].categoryData[0].name;
  const categoryInitDataTitle = categoryData[0].categoryData[0].subTitleList;

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
const setPressCategoryMain = (categoryData) => {
  const categoryMain = document.querySelector('.press-category__section-main');
  const categoryInitData = categoryData[0].categoryData[0];

  const categoryMainElement = `
  <nav class='section-main__nav'>
    <img class='section-main__img-logo' src=${categoryInitData.logoSrc}>
    <div class='section-main__edit'>
      <time class='section-main__edit-time'>${categoryInitData.editTime}</time>
      <p class='section-main__edit-p'>&nbsp편집</p>
    </div>
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
 * 카테고리 별 랜덤 언론사 반환
 */
const shuffleList = (list) => {
  list.sort(() => Math.random() - 0.5);
};

const getPressList = (categoryData) => {
  const shfflePressList = [];
  categoryData.forEach((data) => {
    let shufflePress = Array.from({ length: data.categoryData.length }, (_, idx) => idx);
    shuffleList(shufflePress);
    shfflePressList.push(shufflePress);
  });

  return shfflePressList;
};

/**
 * LIST의 NAV 화면 - 카테고리 이름을 설정 - ing
 */
const setPressCategoryNav = (categoryData, shufflePressList) => {
  const categoryUl = document.querySelector('.press-category__ul');

  categoryData.forEach((data) => {
    const categoryLi = `
    <li class='press-category__li'>
      <p class='press-category__p'>${data.categoryName}</p>
      <div class='press-category__div display-none'>
        <div class='press-category__div-now'>1</div>
        <div class='press-category__div-divide'>/</div>
        <div class='press-category__div-sum'>${data.categoryData.length}</div>
      </div>
    </li>
    `;
    categoryUl.insertAdjacentHTML('beforeend', categoryLi);
  });

  setProgressBar(categoryData);
  const initCategoryArticleList = getPressCategoryArticle(categoryData, shufflePressList);
  setPressCategoryArticle(initCategoryArticleList);
};

/**
 * LIST의 NAV 화면 - Progress Bar 설정
 */
const setProgressBar = (categoryData) => {
  const liList = document.querySelectorAll('.press-category__li');

  liList.forEach((li) => {
    li.addEventListener('click', () => {
      const removeLi = document.querySelector('.progress-start');
      const addDiv = removeLi.querySelector('.press-category__div');
      const removeDiv = li.querySelector('.press-category__div');

      removeLi.classList.remove('progress-start');
      addDiv.classList.add('display-none');
      li.classList.add('progress-start');
      removeDiv.classList.remove('display-none');
    });
  });

  const initLi = document.querySelector('.press-category__ul');
  initLi.firstElementChild.classList.add('progress-start');
  const initDiv = initLi.querySelector('.press-category__div');
  initDiv.classList.remove('display-none');
};

/**
 * 언론사 리스트의 HTML 틀
 */
const setPressCategoryElement = () => {
  const arrowsWrapper = document.querySelector('.arrows__wrapper-list');
  arrowsWrapper.classList.add('display-none');

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

export { setTotalPressList };
