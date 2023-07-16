export function makeHeaderTag() {
  const parentNode = document.querySelector("#header");
  const head = `
  <div class="header__view">
  <div class="header—-logo">
    <img src="./assets/basicIcon/gridSymbolSelected.svg" alt="" />
  </div>
  <h1 class="header—-title">
    <a onClick="window.location.reload()">뉴스스탠드</a>
  </h1>
</div>
<div class="header—-date"><!-- 오늘 날짜 --></div>
  `;

  parentNode.innerHTML += head;
}
