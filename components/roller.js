// rolling 할 리스트 생성
const appendRollingList = (tag, datas) => {
  datas.map((data) => {
    const $li = document.createElement("li");
    const $a = document.createElement("a");
    const $span = document.createElement("span");
    $span.innerText = data.mainArticle.title;
    $a.appendChild($span);
    $li.appendChild($a);
    tag.appendChild($li);
  });
  insertClassname(tag);
};

// prev, current, next classname을 li 태그에 지정
const insertClassname = (tag) => {
  tag.childNodes[0].className = "prev";
  tag.childNodes[1].className = "current";
  tag.childNodes[2].className = "next";
};

// next -> current -> prev -> "" 로 상태 변경
const rollingHandler = (tag) => {
  tag.querySelector(".prev").classList.remove("prev");

  let current = tag.querySelector(".current");
  current.classList.remove("current");
  current.classList.add("prev");

  let next = tag.querySelector(".next");
  if (next.nextElementSibling == null) {
    tag.querySelector("li:first-child").classList.add("next");
  } else {
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
};

export const rollNews = (data) => {
  const leftList = data.slice(0, 5);
  const rightList = data.slice(5, 10);

  const $ul = document.querySelectorAll(".wrap > ul");

  appendRollingList($ul[0], leftList);
  appendRollingList($ul[1], rightList);
  // 각 롤링 구역마다 interval 설정하여 rolling handler 실행
  // forEach로 변경 필요
  $ul.forEach((ul, idx) => {
    const interval = setTimeout(() => {
      setInterval(() => {
        rollingHandler(ul);
      }, 5000);
    }, 1000 * idx);

    ul.addEventListener("mouseover", () => {
      clearInterval(interval);
    });
    ul.addEventListener("mouseout", () => {
      setInterval(() => {
        rollingHandler(ul);
      }, 5000);
    });
  });
};
