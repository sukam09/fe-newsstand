const PAGINATION_NUM = 24;
const MAX_PAGE_NUM = 4;
const MAX_PAGE_IDX = 3;

// time 설정
const setTime = () => {
  const $time = document.querySelector(".time time");
  const today = new Date();
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
  $time.setAttribute("datetime", String(today));
  const format = (num) => String(num).padStart(2, "0");
  $time.innerText = `${today.getFullYear()}. ${format(
    today.getMonth() + 1
  )}. ${format(today.getDate())}. ${DAYS[today.getDay()]}요일`;
};

setTime();

// json에서 데이터 가져오기
const appendLogo = (data) => {
  const li = document.createElement("li");

  if (data) {
    const img = document.createElement("img");
    li.appendChild(img);

    const btn = document.createElement("button");
    btn.innerText = "test";

    btn.className = "agency-btn-hover";

    li.addEventListener("mouseenter", () => {
      li.appendChild(btn);
    });

    li.addEventListener("mouseleave", () => {
      li.removeChild(btn);
    });

    img.src = data.logo;
  }

  document.querySelector(".agency-list").appendChild(li);
};

async function fetchData() {
  const agencies = await fetch("./data.json").then((res) => {
    return res.json();
  });
  return agencies;
}

let currentPage = 0;

const prevBtn = document.querySelector(".prev-page-btn");
const nextBtn = document.querySelector(".next-page-btn");

const isFirstPage = () => currentPage === 0;
const isLastPage = () => currentPage === MAX_PAGE_IDX;

prevBtn.addEventListener("click", () => {
  render(--currentPage);
});

nextBtn.addEventListener("click", () => {
  render(++currentPage);
});

let agencies = [];
const pages = [];

fetchData().then((data) => {
  agencies = data.agencies;
  // .sort(() => 0.5 - Math.random());

  let pageNumber = Math.min(
    Math.ceil(agencies?.length / PAGINATION_NUM),
    MAX_PAGE_NUM
  );

  for (let i = 0; i < pageNumber; i++) {
    pages.push(agencies.slice(i * PAGINATION_NUM, (i + 1) * PAGINATION_NUM));
  }
  render(0);
});

// rendering (기존 요소 제거 -> 새로운 페이지 렌더링)
// 렌더링 형태
/*
<li>
    <button>
        <img src="image" alt="name" />
    </button>
    /style hover subscribe===true ? 해지하기 : 구독하기
</li>
*/
// 총 24개가 아닐때도 그리드를 렌더링할 수 있게 만들기 ✅

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const render = (currentPage) => {
  const agencyList = document.querySelector(".agency-list");
  // 기존 child nodes 모두 제거
  removeAllChildNodes(agencyList);
  // 새로운 child append
  pages[currentPage].map((data) => appendLogo(data));
  while (agencyList.childNodes.length < 24) {
    appendLogo({ name: "", logo: "" });
  }
  // 첫페이지와 마지막페이지 버튼 disable
  // button disabled 처리
  if (isFirstPage()) prevBtn.setAttribute("disabled", "");
  else prevBtn.removeAttribute("disabled");
  if (isLastPage()) nextBtn.setAttribute("disabled", "");
  else nextBtn.removeAttribute("disabled");
};
