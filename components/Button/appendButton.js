import { ce } from "../../utils/utils.js";

export const appendButton = () => {
  const $prev_img = ce("img");
  $prev_img.src = "./asset/icon/left-button.svg";
  $prev_img.alt = "이전 페이지 버튼";

  const $span = ce("span");
  $span.className = "screen-reader-only";

  const $prev_btn = ce("button");
  $prev_btn.className = "prev-page-btn";
  $prev_btn.appendChild($span);
  $prev_btn.appendChild($prev_img);

  const $next_img = ce("img");
  $next_img.src = "./asset/icon/right-button.svg";
  $next_img.alt = "다음 페이지 버튼";

  const $next_btn = ce("button");
  $next_btn.className = "next-page-btn";
  $next_btn.appendChild($span);
  $next_btn.appendChild($next_img);

  return [$prev_btn, $next_btn];
};
