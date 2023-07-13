import { categorize, getData, pagination, shuffle } from "./lib/data.js";
import { renderGrid, renderListViewPage } from "./lib/render.js";
import { setTime } from "./lib/utils.js";
// MAGIC NUMBERS
const PAGINATION_NUM = 24;
const MAX_PAGE_IDX = 3;
const CATEGORIES = [
    "종합/경제",
    "방송/통신",
    "IT",
    "영자지",
    "스포츠/연예",
    "매거진/전문지",
    "지역",
];
const $prevBtn = document.querySelector(".prev-page-btn");
const $nextBtn = document.querySelector(".next-page-btn");
const movePage = (categorizedData, currentPage) => {
    // if (currentPage<)
};
(async function () {
    const data = await getData();
    // const recentNews = data.recentNews;
    const shuffledData = shuffle(data.agencies);
    const pages = pagination(shuffledData, PAGINATION_NUM);
    const categorizedData = categorize(shuffledData);
    // recentNews[0].forEach((data) => {
    //     const $li = document.createElement("li")
    // $li.innerHTML = html`
    //   <li>
    //     <a href="${data?.url}"><span>${data?.title}</span></a>
    //   </li>
    // `;
    //     document.querySelector(".rolling").appendChild($li)
    // })
    // const $rolling = document.querySelector(".rolling-li")! as HTMLElement;
    // document.getElementsByTagName("header")![0].addEventListener("click", () => {
    //   initRolling($rolling);
    // });
    // console.log(
    //   createElements(html`<li>
    //       <a href="${data?.url}"><span>${data?.title}</span></a>
    //     </li>
    //     <li></li>`)
    // );
    // let i = 1;
    // setTimeout(function rolling() {
    //   $rolling.removeChild($rolling.firstChild!);
    // const $fragment = document.createDocumentFragment();
    // const $li = html`<li>
    //   <a href="/"><span>뉴스내용</span></a>
    // </li>`;
    // $fragment.textContent = $li;
    // $rolling.appendChild($fragment);
    // initRolling($li);
    //   $rolling.appendChild($li);
    //   i++;
    //   setTimeout(rolling, 2000);
    // }, 2000);
    let currentPage = 0;
    renderGrid(pages[currentPage], PAGINATION_NUM);
    renderListViewPage(categorizedData["종합/경제"][1]);
    const preventBtn = () => {
        if (currentPage === 0)
            $prevBtn.setAttribute("disabled", "");
        else
            $prevBtn.removeAttribute("disabled");
        if (currentPage >= pages?.length - 1)
            $nextBtn.setAttribute("disabled", "");
        else
            $nextBtn.removeAttribute("disabled");
    };
    const prevBtnHandler = (event) => {
        renderGrid(pages[--currentPage], PAGINATION_NUM);
        preventBtn();
    };
    const nextBtnHandler = (event) => {
        renderGrid(pages[++currentPage], PAGINATION_NUM);
        preventBtn();
    };
    setTime();
    preventBtn();
    $prevBtn.addEventListener("click", prevBtnHandler);
    $nextBtn.addEventListener("click", nextBtnHandler);
})();
