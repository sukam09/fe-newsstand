export const appendButton = () => {
  const $prevImg = document.createElement("img");
  $prevImg.src = "./asset/icon/left-button.svg";
  $prevImg.alt = "이전 페이지 버튼";

  const $span = document.createElement("span");
  $span.className = "screen-reader-only";

  const $prevBtn = document.createElement("button");
  $prevBtn.className = "prev-page-btn";
  $prevBtn.appendChild($span);
  $prevBtn.appendChild($prevImg);

  const $nextImg = document.createElement("img");
  $nextImg.src = "./asset/icon/right-button.svg";
  $nextImg.alt = "다음 페이지 버튼";

  const $nextBtn = document.createElement("button");
  $nextBtn.className = "next-page-btn";
  $nextBtn.appendChild($span);
  $nextBtn.appendChild($nextImg);

  return [$prevBtn, $nextBtn];
};
