/***** 뉴스 배너 롤링 *****/
document.addEventListener("DOMContentLoaded", () => {
  var interval = window.setInterval(firstRollingCallback, 5000);
  setTimeout(function () {
    var interval2 = window.setInterval(secondRollingCallback, 5000);
  }, 2000);
});

function firstRollingCallback() {
  //.prev 클래스 삭제
  document.querySelector(".rollingbanner .prev").classList.remove("prev");

  //.current -> .prev
  let current = document.querySelector(".rollingbanner .current");
  current.classList.remove("current");
  current.classList.add("prev");

  //.next -> .current
  let next = document.querySelector(".rollingbanner .next");
  //다음 목록 요소가 널인지 체크
  if (next.nextElementSibling == null) {
    document
      .querySelector(".rollingbanner ul li:first-child")
      .classList.add("next");
  } else {
    //목록 처음 요소를 다음 요소로 선택
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
}

function secondRollingCallback() {
  const prev = document.querySelectorAll(".rollingbanner .prev");
  prev[1].classList.remove("prev");

  const current = document.querySelectorAll(".rollingbanner .current");
  current[1].classList.remove("current");
  current[1].classList.add("prev");

  const next = document.querySelectorAll(".rollingbanner .next");
  if (next[1].nextElementSibling == null) {
    document
      .querySelectorAll(".rollingbanner ul li:first-child")[1]
      .classList.add("next");
  } else {
    next[1].nextElementSibling.classList.add("next");
  }
  next[1].classList.remove("next");
  next[1].classList.add("current");
}
