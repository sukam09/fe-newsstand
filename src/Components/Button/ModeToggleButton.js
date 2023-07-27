import Component from "../../core/Component.js";

export default class ModeToggleButton extends Component {
  template() {
    return `
      <input class="modeCheckbox" type="checkbox" id="modeToggleInput" />
      <label class="modeToggle" for="modeToggleInput">
        <ion-icon class="icon icon--light" name="sunny-outline"></ion-icon>
        <ion-icon class="icon icon--dark" name="moon-outline"></ion-icon>
        <span class="modeBall"></span>
      </label>
    `;
  }

  mounted() {
    this.setButtonEvent();
  }

  setButtonEvent() {
    const toggle = document.querySelector("#modeToggleInput");

    toggle.addEventListener("change", () => {
      this.$props.ModeStore.toggleMode();
    });
  }
}
