function renderModalView() {}

export function createModalBarView(parent) {
    const parent_container = document.querySelector(`.${parent}`);
    const modal_bar_container = document.createElement("div");

    modal_bar_container.classList.add("modal_bar_container");
    modal_bar_container.innerHTML = `
    <p class="modal_bar_text"><b>여성경제신문</b>을(를)<br>
    구독해지하시겠습니까?</p>
    <div class="modal_bar_button_container">
        <p class="modal_bar_button modal_bar_terminate">예, 해지합니다</p>
        <p class="modal_bar_button modal_bar_cancel">아니오</p>
    </div>
    `;
    parent_container.appendChild(modal_bar_container);
}
