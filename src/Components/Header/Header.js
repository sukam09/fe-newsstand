import Component from "../../core/Component.js";

export default class Header extends Component {
  template() {
    return `
      <h1 class="header__title">
        <img src="./assets/icons/Logo.svg" class="header__title__logo" alt="Logo" />
        뉴스스탠드
      </h1>
      <div class="header__date"></div>
    `;
  }

  mounted() {
    this.setReloadEvent();
    this.setHeaderDate();
  }

  formatToday() {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
    };
    const formattedToday = new Date().toLocaleDateString("ko", options);
    return formattedToday;
  }

  setHeaderDate() {
    const formattedToday = this.formatToday();
    const $header__date = this.$target.querySelector(".header__date");

    $header__date.innerHTML = formattedToday;
  }

  setReloadEvent() {
    const $header = this.$target.querySelector(".header__title");

    $header.addEventListener("click", () => {
      location.reload();
    });
  }
}
