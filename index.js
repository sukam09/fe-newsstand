// json에서 데이터 가져오기

const PAGINATION_NUM = 24;

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

// prevBtn.addEventListener("click", () => {});
nextBtn.addEventListener("click", () => {
  currentPage++;
});

let agencies = [];

fetchData().then((data) => {
  agencies = data.agencies.sort(() => 0.5 - Math.random());

  let pageNumber = Math.min(Math.ceil(agencies?.length / PAGINATION_NUM), 4);

  const pages = [];
  for (let i = 0; i < pageNumber; i++) {
    pages.push(agencies.slice(i * PAGINATION_NUM, (i + 1) * PAGINATION_NUM));
  }

  pages[currentPage].map((data) => appendLogo(data));
});

// Shuffle

// const randomArray = agencies.sort(() => 0.5 - Math.random());

// console.log(agencies);

// 렌더링
/*
<li>
    <button>
        <img src="image" alt="name" />
    </button>
    /style hover subscribe===true ? 해지하기 : 구독하기
</li>
*/
