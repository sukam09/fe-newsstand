export function drawPressInfo(img) {
  const press_news = document.querySelector(".press-news");
  press_news.innerHTML = `<div class="press-info">
      <img
        id="press-logo"
        alt="press-logo"
        src="../assets/images/logo/light/img${img}.svg"
      />
      <span class="edit-date">2023.07.12 16:52 편집</span>
      <button id="subscribe">
        <img src="../assets/icons/plus.svg" />
        <span>구독하기</span>
      </button>
    </div>`;
  const newDiv = document.createElement("div");
  newDiv.classList.add("news-content");
  press_news.appendChild(newDiv);
}
