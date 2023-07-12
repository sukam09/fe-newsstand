/*
기사 컨텐츠 네비게이션 컴포넌트
*/
export default function Nav($target, props, onClick, onChange) {
  //   this.state = mode;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $nav = document.createElement("nav");
    $nav.setAttribute("class", "categoty-nav");

    const $ul = document.createElement("ul");
    $ul.setAttribute("class", "categoty-list");

    let progress;
    //<span>${props.page + 1}/81</span>
    $ul.innerHTML = `
    <li class="select"> 종합/경제
    <div>${props.page}&#47;81</div>
    <div class="progress-bar"></div>
    </li>
    <li><div>방송/통신</div></li>
    <li><div>IT</div></li>
    <li><div>영자지</div></li>
    <li><div>스포츠/연예</div></li>
    <li><div>매거진/전문지</div></li>
    <li><div>지역</div></li>
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

        if ($select) {
          $select.classList.remove("select");
          $select.removeChild($select.lastElementChild);
          $select.removeChild($select.lastElementChild);
        }
        targetElement.classList.add("select");
        targetElement.innerHTML += `<div>${props.page}/81</div>`;
        targetElement.appendChild($div);
      }
    });

    $nav.appendChild($ul);
    $target.appendChild($nav);
  };

  this.render();
}
