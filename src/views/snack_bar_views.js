function renderSnackBarView(container) {
    container.textContent = `내가 구독한 언론사에 추가되었습니다.`;
}

function createSnackBarView(parent) {
    const parent_container = document.querySelector(`.${parent}`);
    const snack_bar_container = document.createElement("div");

    snack_bar_container.classList.add("snack_bar_container");
    snack_bar_container.innerHTML = `<p class="snack_bar_text"></p>`;
    parent_container.appendChild(snack_bar_container);
}

export { createSnackBarView, renderSnackBarView };
