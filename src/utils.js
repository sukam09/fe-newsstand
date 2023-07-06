const shuffleArray = array => array.sort(() => Math.random() - 0.5);

const initPressItems = () => {
  fetch('../data/press-info.json')
    .then(response => response.json())
    .then(jsonData => {
      const newsPressData = shuffleArray(jsonData);
      newsPressItems.forEach((item, index) => {
        const $img = document.createElement('img');
        const { logo } = newsPressData[index];
        $img.src = logo;
        item.appendChild($img);
        $img.classList.add('press-logo');
      });
    });
};

const newsPressItems = document.querySelectorAll('.news-press-item');

const titleIcon = document.querySelector('.title-icon');

const handleClickTitleIcon = () => {
  titleIcon.addEventListener('click', () => {
    location.reload();
  });
};

export { initPressItems, handleClickTitleIcon };
