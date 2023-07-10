const NEWS_PRESS_NUMBERS_PER_PAGE = 24;
const PAGE_MIN_NUMBER = 1;
const PAGE_MAX_NUMBER = 4;

export default function NewsPressGridview({ $target, initialState }) {
  const $section = document.createElement('section');
  $section.classList.add('news-press-display');

  $target.appendChild($section);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  $section.innerHTML = `
    <div class="news-press-tab-container">
      <div class="news-press-type-menu">
        <div class="news-press-tab-menu-activated">전체 언론사</div>
        <div class="news-press-tab-menu">내가 구독한 언론사</div>
      </div>
      <div class="news-press-align-menu">
        <img src="./asset/icons/list-view.svg" alt="리스트 뷰" />
        <img src="./asset/icons/grid-view.svg" alt="그리드 뷰" />
      </div>
    </div>
    <div class="news-press-container">
      <ul class="news-press-grid-container">
      </ul>
      <button class="left-arrow-button">
        <img src="./asset/icons/left-button.png" alt="왼쪽 화살표" />
      </button>
      <button class="right-arrow-button">
        <img src="./asset/icons/right-button.png" alt="오른쪽 화살표" />
      </button>
    </div>
  `;

  const $prevPageButton = $section.querySelector('.left-arrow-button');
  const $nextPageButton = $section.querySelector('.right-arrow-button');

  const shuffleArray = array => array.sort(() => Math.random() - 0.5);

  const fetchNewsPressData = () => {
    fetch('../data/press-info.json')
      .then(response => response.json())
      .then(json => {
        const shufffledNewsPressData = shuffleArray(json);
        this.setState({
          ...this.state,
          newsPressData: shufffledNewsPressData,
        });
      });
  };

  const initNewsPressItems = () => {
    const $ul = $section.querySelector('ul');
    $ul.innerHTML = '';

    const { page, newsPressData } = this.state;

    const startIndex = NEWS_PRESS_NUMBERS_PER_PAGE * (page - 1);
    const endIndex = startIndex + 23;
    const currentNewsPressData = newsPressData.slice(startIndex, endIndex + 1);

    currentNewsPressData.forEach(newsPressItem => {
      const $li = document.createElement('li');
      const $img = document.createElement('img');
      const { logo } = newsPressItem;

      $img.src = logo;
      $img.classList.add('press-logo');

      $li.appendChild($img);
      $li.classList.add('news-press-item');

      $ul.appendChild($li);
    });
  };

  const validatePage = page => page >= PAGE_MIN_NUMBER && page <= PAGE_MAX_NUMBER;

  const handleMovePage = newPage => {
    console.log(newPage);

    if (!validatePage(newPage)) {
      return;
    }
    this.setState({ ...this.state, page: newPage });
  };

  const checkShowPageButton = ($prevPageButton, $nextPageButton) => {
    $prevPageButton.classList.remove('disabled');
    $nextPageButton.classList.remove('disabled');

    if (this.state.page === PAGE_MIN_NUMBER) {
      $prevPageButton.classList.add('disabled');
    } else if (this.state.page === PAGE_MAX_NUMBER) {
      $nextPageButton.classList.add('disabled');
    }
  };

  let isInit = false;

  this.render = () => {
    if (!isInit) {
      fetchNewsPressData();

      $prevPageButton.addEventListener('click', () => handleMovePage(this.state.page - 1));
      $nextPageButton.addEventListener('click', () => handleMovePage(this.state.page + 1));

      isInit = true;
    }
    initNewsPressItems();
    checkShowPageButton($prevPageButton, $nextPageButton);
  };

  this.render();
}
