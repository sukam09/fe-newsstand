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
    //<span>${props.page + 1}/81</span>
    $ul.innerHTML = `
    <li class="select">종합/경제 <sapn>${props.page}/81</span></li>
    <li>방송/통신</li>
    <li>IT</li>
    <li>영자지</li>
    <li>스포츠/연예</li>
    <li>매거진/전문지</li>
    <li>지역</li>
    `;

    $ul.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        const active = document.querySelector(".select");

        if (active) {
          active.classList.remove("select");
          active.removeChild(active.lastChild);
        }
        e.target.classList.add("select");
        e.target.innerHTML += `<sapn>${props.page}/81</span>`;
      }
    });

    $nav.appendChild($ul);
    $target.appendChild($nav);
  };

  this.render();
}
