/*
기사 컨텐츠 네비게이션 컴포넌트
*/

export default function Nav($target, props, onClick, onChange) {
  //   this.state = mode;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
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
        endWidth
      );
      progressBar.style.width = width + "%";

      if (width >= endWidth) {
        console.log("fill");
      }

      if (elapsed < duration) {
        requestAnimationFrame(changeWidth);
      }
    }

    requestAnimationFrame(changeWidth);
  };

  this.render = () => {
    const $nav = document.createElement("nav");
    $nav.setAttribute("class", "categoty-nav");

    const $ul = document.createElement("ul");
    $ul.setAttribute("class", "categoty-list");

    let progress;
    //<span>${props.page + 1}/81</span>
    $ul.innerHTML = `
    <li class="select"> 
    <span>종합/경제</span>
    <span>${props.page}&#47;81</span>
    <div class="progress-bar"></div>
    </li>
    <li><span>방송/통신</span></li>
    <li><span>IT</span></li>
    <li><span>영자지</span></li>
    <li><span>스포츠/연예</span></li>
    <li><span>매거진/전문지</span></li>
    <li><span>지역</span></li>
    `;

    $ul.addEventListener("click", (e) => {
      // data fetch
      let targetElement = e.target;

      while (targetElement && targetElement.tagName !== "LI")
        targetElement = targetElement.parentNode;

      if (targetElement.tagName === "LI") {
        const $select = document.querySelector(".select");
        const $div = document.createElement("div");

        $div.setAttribute("class", "progress-bar");
        $div.style.zIndex = 0;

        if ($select) {
          $select.classList.remove("select");
          $select.removeChild($select.lastElementChild);
          $select.removeChild($select.lastElementChild);
        }

        targetElement.style.zIndex = 1;
        targetElement.classList.add("select");
        targetElement.innerHTML += `<span>${props.page}/81</span>`;
        targetElement.appendChild($div);

        this.startProgress($div);
      }
    });

    $nav.appendChild($ul);
    $target.appendChild($nav);

    let progressElem = $ul.getElementsByClassName("progress-bar");
    this.startProgress(progressElem[0], onChange, props);
  };

  this.render();
}
