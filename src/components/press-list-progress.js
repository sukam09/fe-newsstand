import { LIST } from '../constants/press-data.js';
import { Store } from '../utils/store.js';

class ListProgress extends Store {
  constructor() {
    super();
    this.state = {
      pageCount: 1,
      categoryCount: 1,
      pageLength: LIST.SUFFLE_CATEGORY[0].length,
      categoryLength: LIST.SUFFLE_CATEGORY.length,
    };

    this.setupProgress();
    this.setupClick();
    this.render();
    this.subscribe(this.render.bind(this));
  }

  render() {
    this.setupMain();
    this.setupSub();
  }

  setupMain() {
    const categoryArticle = LIST.SUFFLE_CATEGORY[this.state.categoryCount - 1][this.state.pageCount - 1];
    const sectionMain = document.querySelector('.press-category__section-main');
    sectionMain.querySelector('.section-main__img-logo').src = categoryArticle.lightSrc;
    sectionMain.querySelector('.section-main__edit-time').innerText = categoryArticle.categoryEdit;
    sectionMain.querySelector('.section-main__img-article').src = categoryArticle.categoryImg;
    sectionMain.querySelector('.section-main__h2').innerText = categoryArticle.categoryMainTitle;
  }

  setupSub() {
    const categoryArticle = LIST.SUFFLE_CATEGORY[this.state.categoryCount - 1][this.state.pageCount - 1];
    const sectionSub = document.querySelector('.press-category__section-sub');
    const sectionSubList = sectionSub.querySelectorAll('.section-sub__a');
    sectionSub.querySelector('.section-sub__footer-press').innerText = categoryArticle.name;
    sectionSubList.forEach((sub, subIdx) => {
      sub.innerText = categoryArticle.categorySubTitle[subIdx].title;
      sub.href = categoryArticle.categorySubTitle[subIdx].link;
    });
  }

  setupProgress() {
    const initLi = document.querySelector('.press-category__ul');
    const progressBar = document.querySelectorAll('.press-category__li');

    initLi.querySelector('.press-category__li').classList.add('progress-start');
    initLi.querySelector('.press-category__div').classList.remove('none');
    initLi.querySelector('.press-category__div-now').innerText = this.state.pageCount;
    initLi.querySelector('.press-category__div-sum').innerText = this.state.pageLength;

    progressBar.forEach((progress) => {
      progress.addEventListener('animationiteration', () => this.setupAnimation(progress));
    });
  }

  setupAnimation(progress) {
    const progressNow = progress.querySelector('.press-category__div-now');
    const PAGE = this.state.pageCount < this.state.pageLength;
    const CATEGORY = this.state.categoryCount < this.state.categoryLength;

    if (PAGE) this.setNextPage(progressNow);
    if (!PAGE && CATEGORY) this.setNextCategory();
    if (!PAGE && !CATEGORY) this.setFirstCategory();
  }

  setNextPage(progressNow) {
    this.setState({ pageCount: this.state.pageCount + 1 });
    progressNow.innerText = this.state.pageCount;
  }

  setNextCategory() {
    const nextCategoryIndex = this.state.categoryCount + 1;
    this.setupCategory(nextCategoryIndex);
  }

  setFirstCategory() {
    const firstCategoryIndex = 1;
    this.setupCategory(firstCategoryIndex);
  }

  setupCategory(categoryIndex) {
    this.setState({
      pageCount: 1,
      categoryCount: categoryIndex,
      pageLength: LIST.SUFFLE_CATEGORY[categoryIndex - 1].length,
    });

    const addLi = document.querySelector('.press-category__ul').children[categoryIndex - 1];
    this.setupClassList(addLi);
  }

  //   const isSubscribe = progressSum.innerText === 1;
  //         console.log(isSubscribe);
  //         setSubscribeArrow(isSubscribe);
  //         if (!isSubscribe) {
  //           progressNow.innerText = this.state.pageCount;
  //           progressSum.innerText = this.state.pageLength;
  //         }

  //   setSubscribeArrow(isSubscribe) {
  //     const categoryDiv = document.querySelector('.press-category__div');
  //     const categoryArrow = `
  //       <img class="press-category__div-img" src='./assets/icons/arrow.svg'></img>
  //       `;

  //     const catogoryCount = `
  //       <div class='press-category__div-now'>1</div>
  //       <div class='press-category__div-divide'>/</div>
  //       <div class='press-category__div-sum'></div>`;

  //     isSubscribe ? (categoryDiv.innerHTML = categoryArrow) : (categoryDiv.innerHTML = catogoryCount);
  //   }

  setupClick() {
    const progressBar = document.querySelectorAll('.press-category__li');
    progressBar.forEach((progress) => {
      progress.addEventListener('click', () => {
        const progressName = progress.querySelector('.press-category__p').innerText;
        const isCategory = LIST.CATEGORY_NAME.includes(progressName);
        const progressIndex = isCategory
          ? LIST.CATEGORY_NAME.findIndex((name) => name === progressName)
          : LIST.SUBSCRIBE_NAME.findIndex((name) => name === progressName);

        this.setState({
          pageCount: 1,
          categoryCount: progressIndex + 1,
          pageLength: LIST.SUFFLE_CATEGORY[this.state.categoryCount - 1].length,
        });

        this.setupClassList(progress);
      });
    });
  }

  setupClassList(addLi) {
    document.querySelector('.progress-start').classList.remove('progress-start');
    addLi.classList.add('progress-start');
    addLi.querySelector('.press-category__div').classList.remove('none');
    addLi.querySelector('.press-category__div-now').innerText = this.state.pageCount;
    addLi.querySelector('.press-category__div-sum').innerText = this.state.pageLength;
  }
}

const initListProgress = () => {
  const listProgress = new ListProgress();
};

export { initListProgress };
