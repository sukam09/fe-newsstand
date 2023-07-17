// 왼쪽 롤링 태그

export function makeCorpViewTag() {
  const parentCNode = document.querySelector(".main__rolling-corp-left");
  const li = `<li
    class="main__first-corp-left main-—corp-name card_sliding"
  ></li>
  <li class="main__second-corp-left main-—corp-name"></li>
  <li class="main__third-corp-left main-—corp-name"></li>`;
  parentCNode.innerHTML += li;
}

export function makeTitleViewTag() {
  const parentCNode = document.querySelector(".main__rolling-title-left");
  const li = `
  <li class="main__first-title-left main—-news-box card_sliding"></li>
  <li class="main__second-title-left main—-news-box"></li>
  <li class="main__third-title-left main—-news-box"></li>`;
  parentCNode.innerHTML += li;
}

// 오른쪽 롤링 태그
export function makeRightCorpViewTag() {
  const parentCNode = document.querySelector(".main__rolling-corp-right");
  const li = ` <li
    class="main__first-corp-right main-—corp-name card_sliding"></li>
  <li class="main__second-corp-right main-—corp-name"></li>
  <li class="main__third-corp-right main-—corp-name"></li>`;
  parentCNode.innerHTML += li;
}

export function makeRightTitleViewTag() {
  const parentCNode = document.querySelector(".main__rolling-title-right");
  const li = `<li class="main__first-title-right main—-news-box card_sliding"></li>
  <li class="main__second-title-right main—-news-box"></li>
  <li class="main__third-title-right main—-news-box"></li>`;
  parentCNode.innerHTML += li;
}
