import { html } from "../createElement.js";

const header = html`<header id="header" role="banner">
  <div class="header__view">
    <div class="header—logo">
      <img src="./assets/Symbol.svg" alt="" />
    </div>
    <h1 class="header—title">
      <a onClick="window.location.reload()">뉴스스탠드</a>
    </h1>
  </div>
  <div class="header—date">2023. 07.05 수요일</div>
</header>`;

export { header };
