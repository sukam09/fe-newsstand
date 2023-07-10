const leftNews = document.querySelector(".recent-news-left");
const rightNews = document.querySelector(".recent-news-right");

const appendRollingList = (tag, data) => {
  const $li = document.createElement("li");

  if (data) {
    const $a = document.createElement("a");
    const $span = document.createElement("span");

    $span.innerText = data.mainArticle.title;

    $a.appendChild($span);
    $li.appendChild($a);
  }
  tag.appendChild($li);
};

const rollingNews = (tag) => {
  //   console.log(tag.childNodes);
  //   tag.getElementsByClassName("prev").classList.remove("prev");
  document.querySelector(".recent-news-left .prev").classList.remove("prev");
  //   let current = tag.getElementsByClassName("current");
  let current = document.querySelector(".recent-news-left .current");
  current.classList.remove("current");
  current.classList.add("prev");

  //   let next = tag.getElementsByClassName("next");
  let next = document.querySelector(".recent-news-left .next");
  if (next.nextElementSibling == null) {
    document
      .querySelector(".recent-news-left li:first-child")
      .classList.add("next");
  } else {
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
};

let interval;

document.addEventListener("DOMContentLoaded", () => {
  interval = window.setInterval(rollingNews, 5000);

  document
    .querySelector(".recent-news-left")
    .addEventListener("mouseover", () => window.clearInterval(interval));
  document
    .querySelector(".recent-news-left")
    .addEventListener(
      "mouseout",
      () => (interval = window.setInterval(rollingNews, 5000))
    );
});

export { appendRollingList };
