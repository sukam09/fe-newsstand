// function getNewsData() {
//   fetch("../data/news.json")
//     .then((response) => response.json())
//     .then((newsData) => {
//       const news = newsData.News;
//       drawRollingHtml("recent-left", news);
//       drawRollingHtml("recent-right", news);
//     })
//     .catch((error) => {
//       console.error("Error fetching news data:", error);
//     });
// }

// function drawRollingHtml(target, news) {
//   const _target = document.getElementById(target);
//   let newsHTML = '<div class="wrap"><ul>';
//   for (let i = 0; i < news.length; i++) {
//     newsHTML +=
//       '<li class="' +
//       (i === 0
//         ? "current"
//         : i === 1
//         ? "next"
//         : i === news.length - 1
//         ? "prev"
//         : "") +
//       '">';
//     newsHTML +=
//       '<span class="press">' +
//       news[i].press +
//       "</span>" +
//       '<a href="#">' +
//       news[i].title +
//       "</a>";
//     newsHTML += "</li>";
//   }
//   newsHTML += "</ul></div>";
//   _target.innerHTML = newsHTML;
// }

function pauseAutoRolling() {
  for (let i = 0; i < newsData.length; i++) {
    newsData[i].style.transition = "none";
  }
}

function resumeAutoRolling() {
  for (let i = 0; i < newsData.length; i++) {
    // const delay = (i+1)*scrollDelay;
    const delay = 1;
    newsData[i].style.transition = `transform 0.5s ease ${delay}ms`;
  }
}

function rollingCallback(target) {
  //.prev 클래스 삭제
  document.querySelector(`#${target} .wrap .prev`).classList.remove("prev");

  //.current -> .prev
  let current = document.querySelector(`#${target} .wrap .current`);
  current.classList.remove("current");
  current.classList.add("prev");

  //.next -> .current
  let next = document.querySelector(`#${target} .wrap .next`);
  //다음 목록 요소가 널인지 체크
  if (next.nextElementSibling == null) {
    document
      .querySelector(`#${target} .wrap ul li:first-child`)
      .classList.add("next");
  } else {
    //목록 처음 요소를 다음 요소로 선택
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
}

//이벤트 리스너
document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => rollingCallback("recent-left"), 5000);
});
setTimeout(() => {
  setInterval(() => rollingCallback("recent-right"), 5000);
}, 1000);

// default
// getNewsData();
