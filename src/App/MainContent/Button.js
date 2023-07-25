/*
메인 컨텐츠 페이지 전환 버튼
*/
const FIRST_PAGE_NUMBER = 1;

export default function Button($target, props) {
  this.render = () => {
    const $button = document.createElement("button");

    $button.setAttribute("class", `${props.direction}-button_content`);

    $button.innerHTML =
      props.direction === "left"
        ? `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="42"
        viewBox="0 0 26 42"
        fill="none"
      >
        <path d="M25 1L1 21L25 41" stroke="#6E8091" />
      </svg>`
        : `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="26"
  height="42"
  viewBox="0 0 26 42"
  fill="none"
>
  <path d="M1 41L25 21L1 1" stroke="#6E8091" />
</svg>`;

    if (props.direction === "left") {
      $button.style.display =
        props.currentPage === FIRST_PAGE_NUMBER ? "none" : "block";

      $button.addEventListener("click", () => {
        props.onClick(props.currentPage - 1);
      });
    } else {
      $button.style.display =
        props.currentPage === props.lastPage ? "none" : "block";

      $button.addEventListener("click", () => {
        props.onClick(props.currentPage + 1);
      });
    }

    $target.appendChild($button);
  };

  this.render();
}
