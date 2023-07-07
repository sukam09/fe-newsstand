let page = 1;
let newsPressData = [];

const shuffleArray = array => array.sort(() => Math.random() - 0.5);

const initNewsPressData = () => {
  fetch('../data/press-info.json')
    .then(response => response.json())
    .then(jsonData => {
      newsPressData = shuffleArray(jsonData);
      showNewsPressItems();
    });
};

const showNewsPressItems = () => {
  const startIndex = 24 * (page - 1);
  const endIndex = startIndex + 23;
  const currentNewsPressData = newsPressData.slice(startIndex, endIndex + 1);
  // console.log(page, startIndex, endIndex, currentNewsPressData);
  newsPressItems.forEach((item, index) => {
    item.innerHTML = '';

    const $img = document.createElement('img');
    const { logo } = currentNewsPressData[index];
    $img.src = logo;
    $img.classList.add('press-logo');

    item.appendChild($img);
  });
};

const newsPressItems = document.querySelectorAll('.news-press-item');

const titleIcon = document.querySelector('.title-icon');

const handleClickTitleIcon = () => {
  titleIcon.addEventListener('click', () => {
    location.reload();
  });
};

const nextPageButton = document.querySelector('.right-arrow-button');
console.log(nextPageButton);

const handleClickNextPageButton = () => {
  nextPageButton.addEventListener('click', () => {
    page++;
    console.log(page);
    showNewsPressItems();
  });
};

export { initNewsPressData, showNewsPressItems, handleClickTitleIcon, handleClickNextPageButton };
