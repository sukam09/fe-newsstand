fetch('../data/press-info.json')
  .then(response => response.json())
  .then(jsonData => {
    newsPressItems.forEach((item, index) => {
      const $img = document.createElement('img');
      const { logo } = jsonData[index];
      $img.src = logo;
      item.appendChild($img);
      $img.classList.add('press-logo');
    });
  });

const newsPressItems = document.querySelectorAll('.news-press-item');

const titleIcon = document.querySelector('.title-icon');

titleIcon.addEventListener('click', () => {
  location.reload();
});
