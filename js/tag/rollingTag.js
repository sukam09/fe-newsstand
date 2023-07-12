// 왼쪽 롤링 태그
export function makeCorpViewTag() {
  const parentCNode = document.querySelector(".main__rolling-corp-left");
  const li = `<li
    id="main__first-corp"
    class="main-—corp-name card_sliding"
  ></li>
  <li id="main__second-corp" class="main-—corp-name"></li>
  <li id="main__third-corp" class="main-—corp-name"></li>`;
  parentCNode.innerHTML += li;
}

export function makeTitleViewTag() {
  const parentCNode = document.querySelector(".main__rolling-title-left");
  const li = `
  <li
    id="main__first-title"
    class="main—-news-box card_sliding"
  ></li>
  <li id="main__second-title" class="main—-news-box"></li>
  <li id="main__third-title" class="main—-news-box"></li>`;
  parentCNode.innerHTML += li;
}

// 오른쪽 롤링 태그
export function makeRightCorpViewTag() {
  const parentCNode = document.querySelector(".main__rolling-corp-right");
  const li = ` <li
    id="main__first-corp-right"
    class="main-—corp-name card_sliding"
  ></li>
  <li id="main__second-corp-right" class="main-—corp-name"></li>
  <li id="main__third-corp-right" class="main-—corp-name"></li>`;
  parentCNode.innerHTML += li;
}

export function makeRightTitleViewTag() {
  const parentCNode = document.querySelector(".main__rolling-title-right");
  const li = `<li
    id="main__first-title-right"
    class="main—-news-box card_sliding"
  ></li>
  <li id="main__second-title-right" class="main—-news-box"></li>
  <li id="main__third-title-right" class="main—-news-box"></li>`;
  parentCNode.innerHTML += li;
}
