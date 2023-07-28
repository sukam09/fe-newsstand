/* 
모든 컴포넌트의 중심이 되는 파일
크게 Header, Rolling, Main 컴포넌트로 구성

state: dark, light
*/

import Component from "./utils/Component.js";
import Header from "./App/Header.js";
import Rolling from "./App/Rolling.js";
import Main from "./App/Main.js";

function App($target, props) {
  this.init = true;
  Component.call(this, $target, props);
}

Object.setPrototypeOf(App.prototype, Component.prototype);

App.prototype.initState = function () {
  return { mode: "Light" };
};

App.prototype.template = function () {
  return `
  <input type="checkbox" id="dn" />
    <label for="dn" class="toggle2">
      <span class="toggle__handler"> </span>
    </label>
  <div id="container">
    <header class="header"></header>
    <section class="newsflash"></section>
    <main class="news"></main>
  </div>`;
};

App.prototype.setEvent = function () {
  if (this.init) {
    let currMode, nextMode;
    const Realbody = document.querySelector("body");
    const darkModeToggle = document.getElementById("dn"); // 체크박스 정의

    darkModeToggle.addEventListener("change", function (event) {
      const imgList = document.querySelectorAll(".press-img");
      //체크박스의 변화 감지 리스너
      if (!Realbody.classList.contains("dark")) {
        // 바디에 다크모드 클래스가 없으면
        Realbody.classList.add("dark"); // 다크모드 추가
        currMode = "Light";
        nextMode = "Dark";
      } else {
        // 바디에 다크모드 클래스가 있으면
        Realbody.classList.remove("dark"); // 다크모드 클래스를 제거
        currMode = "Dark";
        nextMode = "Light";
      }

      imgList.forEach((img) => {
        img.src = img.src.replace(currMode, nextMode);
      });
    });
  }
};

App.prototype.mounted = function () {
  const $header = this.$el.querySelector(".header");
  const $section = this.$el.querySelector(".newsflash");
  const $main = this.$el.querySelector(".news");

  new Header($header, this.state);
  new Rolling($section, this.state);
  new Main($main, this.state);
};

export default App;
