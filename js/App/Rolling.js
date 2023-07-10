/* 
롤링 컨테이너 컴포넌트
*/
import RollingContents from "./RollingContents/RollingContents.js";

export default function Rolling($target, props) {
  const mode = props.mode;

  this.render = () => {
    const $rolling = document.createElement("section");
    $rolling.setAttribute("class", "newsflash");

    new RollingContents($rolling, { mode: mode, startTime: 0 });
    new RollingContents($rolling, { mode: mode, startTime: 1 });

    $target.appendChild($rolling);
  };

  this.render();
}
