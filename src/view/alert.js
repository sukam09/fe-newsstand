import { GLOBAL } from "../model/variable.js";
import { subscribe } from "../controller/observer.js";
import { showAlert } from "../model/store.js";

function initAlert(parentNode) {
  const dom = `
  <div class="alert">
    <div class="alert-main display-medium16"><span class="alert-main-press display-bold16"></span>을(를)</br>구독해지하시겠습니까?</div>
    <div class="alert-btn">
      <button class="yes-btn available-medium16">예, 해지합니다</button>
      <button class="no-btn available-medium16">아니오</button>
    </div>
  </div>`;

  parentNode.innerHTML += dom;
  return 0;
}

function drawAlert() {
  const press = GLOBAL.TEMP_TARGET;
  const alert = document.querySelector(".alert");
  const alertPress = alert.querySelector(".alert-main-press");
  alertPress.innerHTML = press.name;
  alert.style.display = "block";
}

subscribe(showAlert, drawAlert);

export { initAlert, drawAlert };
