import { SET_TIME } from "../../utils/constant.js";
import { list_news_data } from "../../../data/list_news_data.js";
import { CATEGORY_SIZE, CATEGORY_COUNT_ARR } from "../../utils/constant.js";
import { renderPressNews } from "../../container/listViewTemplate.js";

export const progress_bar_info = (function () {
    let interval = 0;
    let category_now = 1;
    let category_old = 1;
    let page_num = 1;

    // interval 초기화
    function removeInterval() {
        clearInterval(interval);
    }

    // interval 재시작
    function startInterval() {
        removeInterval();
        interval = window.setInterval(() => {
            changePageNum(true).then(() => {
                renderPressNews(list_news_data[category_now - 1].news[page_num - 1]);
            });
        }, SET_TIME);
    }

    // 변수 값 변경
    async function setValue(props) {
        if (props.category_old) category_old = props.category_old;
        if (props.category_now) category_now = props.category_now;
        if (props.page_num) page_num = props.page_num;
    }

    // 현재 카테고리 번호 반환
    function getCategoryNow() {
        return category_now;
    }

    // 페이지 다음 앞으로 넘기기
    async function changePageNum(isNext) {
        if (isNext) {
            // 다음 페이지로 이동
            if (CATEGORY_COUNT_ARR[category_now - 1] === page_num) {
                category_now === CATEGORY_SIZE
                    ? setValue({ category_old: category_now, category_now: 1, page_num: 1 }) // 마지막 페이지면 처음으로 돌아감
                    : setValue({ category_old: category_now, category_now: category_now + 1, page_num: 1 });
            } else {
                page_num += 1;
            }
        } else {
            // 이전 페이지로 이동
            if (page_num === 1) {
                category_now === 1
                    ? setValue({
                          category_old: category_now,
                          category_now: CATEGORY_SIZE,
                          page_num: CATEGORY_COUNT_ARR[CATEGORY_SIZE - 1],
                      }) // 첫번째 페이지면 마지막으로 돌아감
                    : setValue({
                          category_old: category_now,
                          category_now: category_now - 1,
                          page_num: CATEGORY_COUNT_ARR[category_now - 2],
                      });
            } else {
                page_num -= 1;
            }
        }

        await changeProgressBar();
    }

    // DOM 초기화
    function initProgressBar(props) {
        setValue(props).then(() => {
            console.log(category_now, category_old, page_num);
            changeProgressBar();
            renderPressNews(list_news_data[category_now - 1].news[page_num - 1]);
            startInterval();
        });
    }

    // DOM 변경 - progressbar 이동
    function changeProgressBar() {
        const list_view_btn = document.querySelectorAll(".list-view-btn");

        const old_tab_item = list_view_btn[category_old - 1].querySelector(".tab-item");
        const old_btn_tab_item = list_view_btn[category_old - 1].querySelector(".tab-item-clicked");
        const new_tab_item = list_view_btn[category_now - 1].querySelector(".tab-item");
        const new_btn_tab_item = list_view_btn[category_now - 1].querySelector(".tab-item-clicked");

        old_tab_item.style.display = "flex";
        old_btn_tab_item.style.display = "none";

        new_tab_item.style.display = "none";
        new_btn_tab_item.style.display = "flex";
        new_btn_tab_item.querySelector(".btn-tab-count-present").innerHTML = page_num;
    }

    // DOM 변경 - progressbar 변경
    async function resetProgressBar() {
        const progress_list = document.querySelectorAll(".btn-tab-progress");
        progress_list[category_now - 1].classList.remove("btn-tab-progress");
        progress_list[category_now - 1].offsetWidth;
        progress_list[category_now - 1].classList.add("btn-tab-progress");
    }

    // 화살표 버튼 클릭
    function onClickArrowBtn() {
        changePageNum(this.is_right).then(() => {
            resetProgressBar();
            renderPressNews(list_news_data[category_now - 1].news[page_num - 1]);
            startInterval();
        });
    }

    return { getCategoryNow, removeInterval, initProgressBar, onClickArrowBtn };
})();
