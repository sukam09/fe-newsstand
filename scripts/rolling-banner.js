import { NewsDB } from "../core/index.js";

const MOVE_OFFSET = 14;
const DURATION_ROLLING = 5000;
const DURATION_DIFF_BANNER = 1000;
const DURATION_RESET = 500;

const $containerNewsBar = document.querySelector(".container-news-bar");

function createRollingBannerList($banner, data) {
  // 첫번째 요소를 마지막에 copy
  const list = [...data, data[0]];

  $banner.innerHTML = list.reduce((acc, curr) => {
    return acc + `<li><a href="/">${curr}</a></li>`;
  }, "");
}

function setTransitionDuration($banner, value) {
  $banner.style.transitionDuration = `${value}ms`;
}

function setTransform($banner, cnt) {
  $banner.style.transform = `translateY(-${MOVE_OFFSET * cnt}px)`;
}

export function startRollingBanner() {
  const headlineData = NewsDB.getHeadlineData();

  const [leftSlice, rightSlice] = [
    headlineData.slice(0, 5),
    headlineData.slice(5),
  ];
  const dataLength = leftSlice.length;

  const $banners = $containerNewsBar.querySelectorAll(
    ".container-news-bar_window > ul"
  );

  createRollingBannerList($banners[0], leftSlice);
  createRollingBannerList($banners[1], rightSlice);

  $banners.forEach(($banner, idx) => {
    let cnt = 0;
    let interval;

    const autoRolling = () => {
      cnt += 1;
      setTransitionDuration($banner, 500);
      setTransform($banner, cnt);

      if (cnt >= dataLength) {
        clearInterval(interval);
        setTimeout(() => {
          cnt = 0;
          setTransitionDuration($banner, 0);
          setTransform($banner, cnt);
          autoPlay();
        }, DURATION_RESET);
      }
    };

    const autoPlay = () => {
      interval = setInterval(autoRolling, DURATION_ROLLING);
    };

    if (idx === 1) {
      setTimeout(autoPlay, DURATION_DIFF_BANNER);
    } else {
      autoPlay();
    }

    const handleArticleMouseOver = () => {
      clearInterval(interval);
    };

    const handleArticleMouseOut = () => {
      autoPlay();
    };

    $banner.addEventListener("mouseover", handleArticleMouseOver);
    $banner.addEventListener("mouseout", handleArticleMouseOut);
  });
}
