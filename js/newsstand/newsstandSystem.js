class newsstandSystem {
  constructor() {
    (this.selectedPage = 0),
      (this.newsstandList = Array.from({ length: 96 }, () => 1).map((_, index) => `${++index}.png`));
    (this.rightBtn = document.querySelector('.newsstand--right-btn')),
      (this.leftBtn = document.querySelector('.newsstand--left-btn'));
  }
  createRandomNewsstand() {
    this.newsstandList = this.shuffle(this.newsstandList);

    this.paintNews();
    this.pagination();
  }
  paintNews() {
    const ul = document.querySelector('.newsstand-area—six-col-list');
    for (let idx = this.selectedPage * 24; idx < this.selectedPage * 24 + 24; idx++) {
      const li = document.createElement('li');
      li.className = 'newsstand—subscrtion-box';
      const img = document.createElement('img');
      const icon = this.newsstandList[idx];
      img.src = `./assets/newsIcon/light/${icon}`;
      li.appendChild(img);
      ul.appendChild(li);
    }
  }

  shuffle() {
    return this.newsstandList.sort(() => Math.random() - 0.5);
  }

  pagination() {
    const ul = document.querySelector('.newsstand-area—six-col-list');
    const rightBtn = document.querySelector('.newsstand--right-btn');
    const leftBtn = document.querySelector('.newsstand--left-btn');
    rightBtn.addEventListener('click', (e) => {
      this.removeChildElement(ul);
      this.paintNews(++this.selectedPage, this.newsstandList);
      this.isBtnDisabled();
    });

    leftBtn.addEventListener('click', (e) => {
      this.removeChildElement(ul);
      this.paintNews(--this.selectedPage, this.newsstandList);
      this.isBtnDisabled();
    });
  }

  removeChildElement(parent) {
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  }

  isBtnDisabled() {
    this.selectedPage ? this.leftBtn.classList.remove('btn-disabled') : this.leftBtn.classList.add('btn-disabled');
    this.selectedPage === 3
      ? this.rightBtn.classList.add('btn-disabled')
      : this.rightBtn.classList.remove('btn-disabled');
  }
}

export { newsstandSystem };
