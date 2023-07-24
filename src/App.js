/* 
모든 컴포넌트의 중심이 되는 파일
크게 Header, Rolling, Main 컴포넌트로 구성

state: dark, light
*/

import Component from "./utils/Component.js";
import Header from "./App/Header.js";
import Rolling from "./App/Rolling.js";
import Main from "./App/Main.js";

const startTimes = [0, 1];

function App($target, props) {
  Component.call(this, $target, props);
}

Object.setPrototypeOf(App.prototype, Component.prototype);

App.prototype.initState = function () {
  return { mode: "Light" };
};

App.prototype.template = function () {
  return `
  <div id="container">
    <header class="header"></header>
    <section class="newsflash"></section>
  </div>`;
};

App.prototype.mounted = function () {
  const $header = this.$el.querySelector(".header");
  const $section = this.$el.querySelector(".newsflash");

  new Header($header, this.props);
  new Rolling($section, this.props);
};

export default App;
