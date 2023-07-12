export function mainHeader() {
  return `
    <div class="main_header flex_row">
      <div class="main_title_container flex_row">
        <h2>전체 언론사</h2>
        <span>내가 구독한 언론사</span>
      </div>
      <div class="view_button_container flex_row">
        <img id="list_button" src="./assets/icons/list_off.png" alt="list view button">
        <img id="grid_button" src="./assets/icons/grid_off.png" alt="grid view button">
      </div>
    </div>
    `;
}

export function initMainHeader() {
  const $mainSection = document.getElementById("main_section");
  $mainSection.innerHTML += mainHeader();
}
