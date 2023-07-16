import { renderView } from "./lib/render.js";
import { observable, observe } from "./store/core.js";
import { createElement, removeElement } from "./lib/dom.js";
import { addCustomEventListener } from "./lib/event.js";
import { updateDBCompanies } from "./api/index.js";
import { html } from "./lib/html.js";
import { MAX_GRID_PAGE_NUM, MAX_LIST_PAGE_NUM, setConfig } from "./config.js";
import { setHeader } from "./components/Header.js";
(async function init() {
    // Initialize
    await updateDBCompanies();
    await setConfig();
    // Set Component
    setHeader();
    // Store 생성
    const store = observable({
        type: "grid",
        recentNews: [],
        filter: "all",
        gridPage: 0,
        listPage: 0,
        get idx() {
            switch (store.type) {
                case "grid":
                    return store.gridPage;
                case "list":
                    return store.listPage;
                default:
                    return 0;
            }
        },
        set idx(value) {
            switch (store.type) {
                case "grid":
                    store.gridPage = value;
                case "list":
                    if (value >= MAX_LIST_PAGE_NUM)
                        value = 0;
                    if (value < 0)
                        value = MAX_LIST_PAGE_NUM - 1;
                    store.listPage = value;
                default:
                    break;
            }
        },
    });
    // Add Rolling Evnet
    document.querySelectorAll(".news-article__list")[1].style.animationDelay =
        "1s";
    document.querySelectorAll(".news-article__list").forEach(($ul, idx) => {
        $ul.addEventListener("animationiteration", (e) => {
            removeElement($ul.children[0]);
            $ul.appendChild(createElement(html `<li class="news-title"><a href="/#">뉴스 내용</a></li>`));
        });
        $ul.addEventListener("mouseenter", (e) => {
            $ul.style.animationPlayState = "paused";
        });
        $ul.addEventListener("mouseleave", (e) => {
            $ul.style.animationPlayState = "running";
        });
    });
    // Add event listener of view type buttons
    document.querySelectorAll(".view-type__option").forEach(($element) => {
        $element.addEventListener("click", (e) => {
            //@ts-ignore
            store.type = e.currentTarget.dataset.option;
        });
    });
    // Add event listener of move page buttons
    document.querySelectorAll(".move-page__btn").forEach(($element) => {
        const eventListner = (event) => {
            // @ts-ignore
            const type = event.currentTarget.dataset.dir;
            switch (type) {
                case "prev":
                    store.idx--;
                    break;
                case "next":
                    store.idx++;
                    break;
                default:
                    break;
            }
        };
        addCustomEventListener($element, "click", eventListner);
    });
    // log
    observe(() => {
        console.log(store.type, store.idx);
    });
    // view type에 따라 view 영역을 렌더링합니다.
    observe(() => {
        renderView(store.type, store.idx);
    });
    // 활성화된 view type 버튼의 색상을 변경합니다. (active 클래스 추가)
    observe(() => {
        document.querySelectorAll(".view-type__option").forEach(($element) => {
            if ($element.dataset.option === store.type) {
                $element.classList.add("active");
            }
            else {
                $element.classList.remove("active");
            }
        });
    });
    // 페이지 이동 버튼의 활성화 여부를 결정합니다. (disabled 속성 추가)
    observe(() => {
        document.querySelectorAll(".move-page__btn").forEach(($element) => {
            const type = $element.dataset.dir;
            switch (type) {
                case "prev":
                    if (store.type === "grid" && store.idx === 0)
                        $element.setAttribute("disabled", "");
                    else
                        $element.removeAttribute("disabled");
                    break;
                case "next":
                    if (store.type === "grid" && store.idx >= MAX_GRID_PAGE_NUM - 1)
                        $element.setAttribute("disabled", "");
                    else
                        $element.removeAttribute("disabled");
                    break;
                default:
                    break;
            }
        });
    });
    // 페이지 자동으로 넘기기
    observe(() => {
        // console.log(qs(".list__nav .active"));
        // addCustomEventListener(qs(".category--progress"), "animationend", () => {
        //   store.idx++;
        // });
        let interval;
        if (store.type === "list") {
            interval = setInterval(() => {
                store.idx++;
            }, 20000);
        }
        else {
            clearInterval(interval);
        }
    });
})();
