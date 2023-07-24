/* 
모든 컴포넌트의 중심이 되는 파일
크게 Header, Rolling, Main 컴포넌트로 구성

state: dark, light
*/
import Header from "./App/Header.js";
import Rolling from "./App/Rolling.js";
import Main from "./App/Main.js";

export default function App($target, mode) {
  this.state = "Light";

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $app = document.createElement("div");
    $app.setAttribute("id", "container");

    new Header($app, { mode: this.state });
    new Rolling($app, { mode: this.state });
    new Main($app, { mode: this.state });

    $target.appendChild($app);
  };

  this.render();
}
