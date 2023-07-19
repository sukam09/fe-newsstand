export default function Headline({ $target, initialState }) {
  const $div = document.createElement("div");
  $div.classList.add("recent-news-item");

  $target.appendChild($div);

  this.state = initialState;

  const rollHeadline = () => {
    const $prev = $div.querySelector(".prev");
    const $current = $div.querySelector(".current");
    const $next = $div.querySelector(".next");

    $current.removeEventListener("mouseenter", handleMouseEnter);
    $current.removeEventListener("mouseleave", handleMouseLeave);

    $prev.classList.remove("prev");

    $current.classList.remove("current");
    $current.classList.add("prev");

    $next.classList.remove("next");
    $next.classList.add("current");

    if ($next.nextElementSibling === null) {
      const $first = $div.querySelector("li:first-child");
      $first.classList.add("next");
    } else {
      $next.nextElementSibling.classList.add("next");
    }

    $next.addEventListener("mouseenter", handleMouseEnter);
    $next.addEventListener("mouseleave", handleMouseLeave);
  };

  const setHeadline = () => {
    if (!this.isAutoRolling) {
      return;
    }

    rollHeadline();
  };

  this.isAutoRolling = true;
  this.state.setTimer(setHeadline);

  const handleMouseEnter = () => {
    this.isAutoRolling = false;
  };

  const handleMouseLeave = () => {
    this.isAutoRolling = true;
  };

  this.render = () => {
    const { data } = this.state;

    $div.innerHTML = `
      <div class="recent-news-press">연합뉴스</div>
      <div class="recent-news-headline">
        <ul>
          <li>${data[3]}</li>
          <li class="prev">${data[4]}</li>
          <li class="current">${data[0]}</li>
          <li class="next">${data[1]}</li>
          <li>${data[2]}</li>
        </ul>
      </div>
    `;
  };

  this.render();
}
