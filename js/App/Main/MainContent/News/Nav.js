/*
기사 컨텐츠 네비게이션 컴포넌트
props: setCurrentPage, setCategory
*/

export default function Nav($target, props) {
  this.startProgress = (progressBar) => {
    const duration = 20000; // 20초
    const startWidth = 0;
    const endWidth = 100;
    const startTime = performance.now();

    function changeWidth(timestamp) {
      const elapsed = timestamp - startTime;
      const width = Math.min(
        (elapsed / duration) * (endWidth - startWidth) + startWidth,
        endWidth
      );
      progressBar.style.width = width + "%";

      if (width >= endWidth) {
        if (props.currentPage === props.lastPage) {
          if (props.category === 6) {
            props.setContentState({
              currentPage: 1,
              lastPage: props.lastPage,
              category: 0,
            });
          } else {
            props.setContentState({
              currentPage: 1,
              lastPage: props.lastPage,
              category: props.category + 1,
            });
          }
        } else {
          props.setContentState({
            currentPage: props.currentPage + 1,
            lastPage: props.lastPage,
            category: props.category,
          });
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

    $ul.innerHTML = `
    <li data-key=0><span>종합/경제</span></li>
    <li data-key=1><span>방송/통신</span></li>
    <li data-key=2><span>IT</span></li>
    <li data-key=3><span>영자지</span></li>
    <li data-key=4><span>스포츠/연예</span></li>
    <li data-key=5><span>매거진/전문지</span></li>
    <li data-key=6><span>지역</span></li>
    `;

    $ul.addEventListener("click", (e) => {
      // data fetch

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
          lastPage: 4,
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
    targetElement.innerHTML += `<span>${props.currentPage}/${props.lastPage}</span>`;
    targetElement.appendChild($div);

    $nav.appendChild($ul);
    $target.appendChild($nav);

    this.startProgress($div);
  };

  this.render();
}
