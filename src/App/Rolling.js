/* 
롤링 컨텐츠 컨테이너 컴포넌트
*/
import RollingContents from "./Rolling/RollingContents.js";

const IMMEDIATELY = 0;
const ONE_SECOND_LATER = 1;

export default function Rolling($target, props) {
  const mode = props.mode;

  this.render = () => {
    const $rolling = document.createElement("section");
    $rolling.setAttribute("class", "newsflash");

    new RollingContents($rolling, { mode: mode, startTime: IMMEDIATELY }); //즉시 롤링
    new RollingContents($rolling, { mode: mode, startTime: ONE_SECOND_LATER }); // 1초후 롤링

    $target.appendChild($rolling);
  };

  this.render();
}
