import { html } from "../../lib/jsx";
const Alert = (company, onConfirm, onClose) => {
    return html `
    <div class="alert popup">
      <div class="alert__content">
        <span class="alert__company">${company}</span
        >을(를)<br />구독해지하시겠습니까?
      </div>
      <div class="alert__buttons">
        <button
          class="alert__button alert__button--unsubscribe"
          onClick=${onConfirm}
        >
          예, 해지합니다
        </button>
        <button class="alert__button alert__button--cancel" onClick=${onClose}>
          아니오
        </button>
      </div>
    </div>
  `;
};
const useAlert = (company, onConfirm, onClose) => {
    const $alert = Alert(company, onConfirm, onClose);
    const show = () => {
        $alert.classList.add("show");
    };
    const hide = () => {
        $alert.classList.remove("show");
    };
    return { $alert, show, hide };
};
