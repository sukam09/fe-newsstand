import { getData, pagination, shuffle } from "./lib/data"
import { renderGrid } from "./lib/render"
import { setTime } from "./lib/utils"

// MAGIC NUMBERS
export const PAGINATION_NUM = 24
const MAX_PAGE_IDX = 3

// json에서 데이터 가져오기

const $prevBtn = document.querySelector(".prev-page-btn")
const $nextBtn = document.querySelector(".next-page-btn")
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
;(async function () {
    const data = await getData()

    const shuffledData = shuffle(data.agencies)
    const pages = pagination(shuffledData)

    let currentPage = 0

    renderGrid(pages[currentPage], PAGINATION_NUM)

    const preventBtn = () => {
        if (currentPage === 0) $prevBtn.setAttribute("disabled", "")
        else $prevBtn.removeAttribute("disabled")
        if (currentPage >= pages?.length - 1)
            $nextBtn.setAttribute("disabled", "")
        else $nextBtn.removeAttribute("disabled")
    }

    const prevBtnHandler = (event) => {
        renderGrid(pages[--currentPage], PAGINATION_NUM)
        preventBtn()
    }

    const nextBtnHandler = (event) => {
        renderGrid(pages[++currentPage], PAGINATION_NUM)
        preventBtn()
    }

    setTime()
    preventBtn()
    $prevBtn.addEventListener("click", prevBtnHandler)
    $nextBtn.addEventListener("click", nextBtnHandler)
})()
