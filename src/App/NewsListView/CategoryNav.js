/*
기사 컨텐츠 네비게이션 컴포넌트
*/

import store from "../../store/Store.js";
import { fetchPress } from "../../api/fetchNews.js";

const press = await fetchPress();

const categories = [
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

const FIRST_CATEGORY = 0;
const LAST_CATEGORY = 6;

const FIRST_PAGE = 1;

const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
<path d="M5.48341 10.5L4.66675 9.68333L7.35008 7L4.66675 4.31667L5.48341 3.5L8.98342 7L5.48341 10.5Z" fill="white"/>
</svg>`;
const createNav = function (pressType, navElements) {
  let liString = "";

  const indexArr = Array.from({ length: navElements.length }, (_, i) => i);
  liString = indexArr.reduce((accumulator, index) => {
    return (
      accumulator +
      `<li data-key=${index}><span>${
        pressType === "all"
          ? navElements[index]
          : press[store.myPressList[index]].name
      }</span></li>`
    );
  }, "");

  return liString;
};

export default function CategoryNav($target, props) {
  const initCategoryState = {
    currentPage: FIRST_PAGE,
    category: FIRST_CATEGORY,
  };

  const nextCategoryState = {
    currentPage: 1,
    category: props.category + 1,
  };

  const nextPageState = {
    currentPage: props.currentPage + 1,
    category: props.category,
  };

  this.startProgress = (progressBar) => {
    const duration = 20000; // 20초
    const startWidth = 0;
    const endWidth = 100;
    const startTime = performance.now();

    function changeWidth(timestamp) {
      const elapsed = timestamp - startTime;
      const width = Math.min(
        (elapsed / duration) * (endWidth - startWidth) + startWidth,
        100
      );

      progressBar.style.width = width + "%";

      if (width >= endWidth) {
        // when progress bar withd 100%
        if (props.currentPage === props.lastPage) {
          // change category
          if (props.category === LAST_CATEGORY) {
            props.setContentState(initCategoryState);
          } else {
            props.setContentState(nextCategoryState);
          }
        } else {
          // change page
          props.setContentState(nextPageState);
        }
      }

      if (elapsed < duration) {
        props.timerArr.push(requestAnimationFrame(changeWidth));
      }
    }

    props.timerArr.push(requestAnimationFrame(changeWidth));
  };

  this.render = () => {
    props.timerArr.forEach((timer) => {
      cancelAnimationFrame(timer);
    });

    const $nav = document.createElement("nav");
    $nav.setAttribute("class", "categoty-nav");

    const $ul = document.createElement("ul");
    $ul.setAttribute("class", "categoty-list");

    $ul.innerHTML =
      props.pressType === "all"
        ? createNav("all", categories)
        : createNav("my", store.myPressList);

    $ul.addEventListener("click", (e) => {
      let targetElement = e.target;

      while (targetElement && targetElement.tagName !== "LI")
        targetElement = targetElement.parentNode;

      if (targetElement.tagName === "LI") {
        const $select = document.querySelector(".select");

        if ($select) {
          $select.classList.remove("select");
          $select.removeChild($select.lastElementChild);
          $select.removeChild($select.lastElementChild);
        }

        props.setContentState({
          currentPage: 1,
          category: Number(targetElement.dataset.key),
        });
      }
    });

    const $div = document.createElement("div");
    const targetElement = $ul.children[Number(props.category)];

    $div.setAttribute("class", "progress-bar");
    $div.style.zIndex = 0;

    targetElement.style.zIndex = 1;
    targetElement.classList.add("select");

    // if pressType all
    targetElement.innerHTML += `<span>
    ${
      props.pressType === "all"
        ? `${props.currentPage}/${props.lastPage}`
        : arrowIcon
    }
    </span>`;

    targetElement.appendChild($div);

    $nav.appendChild($ul);
    $target.appendChild($nav);

    this.startProgress($div);
  };

  this.render();
}
