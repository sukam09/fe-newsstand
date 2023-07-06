document.addEventListener("DOMContentLoaded", () => {
  var interval = window.setInterval(rollingCallback, 5000);
});
function rollingCallback() {
  for (item of document.querySelectorAll(".rollingbanner .prev")) {
    item.classList.remove("prev");
  }
  for (item of document.querySelectorAll(".rollingbanner .current")) {
    item.classList.remove("current");
    item.classList.add("prev");
  }
  for (let i = 0; i < 2; i++) {
    let item = document.querySelectorAll(".rollingbanner .next");
    let first_lists = document.querySelectorAll(
      ".rollingbanner ul li:first-child"
    );
    if (item[i].nextElementSibling === null) {
      first_lists[i].classList.add("next");
    } else {
      item[i].nextElementSibling.classList.add("next");
    }
    item[i].classList.remove("next");
    item[i].classList.add("current");
  }
}
