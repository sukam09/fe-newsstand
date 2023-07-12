let pageNum = 0;

/**
 * 언론사 불러오기
 */
const setTotalPressList = (isLightMode) => {
  fetch('./assets/data/total-press.json')
    .then((response) => response.json())
    .then((data) => {
      let shufflePress = setPressList(data);
      getPressCategoryElement(data, shufflePress, isLightMode);

      //   makePressGrid(data, shufflePress, isLightMode);
    })
    .catch((error) => {
      console.error('언론사 정보를 불러오는 중에 오류가 발생했습니다.', error);
    });
};

////
const shuffleList = (list) => {
  list.sort(() => Math.random() - 0.5);
};

const setPressList = (pressData) => {
  let shufflePress = Array.from({ length: pressData.length }, (_, idx) => idx + 1);
  shuffleList(shufflePress);

  return shufflePress;
};

const getPressCategoryElement = (pressData, shufflePress, isLightMode) => {
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

export { setTotalPressList };
