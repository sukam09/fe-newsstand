export function createTitleSection() {
  return `
    <section id="title_section">
      <div class="title_container flex_row">
        <img class="title_logo" src="./assets/images/logo.png" alt="" />
        <h1 class="title">뉴스스탠드</h1>
      </div>
      <span class="date">${getDate()}</span>
    </section>
    `;
}

function getDate() {
  let today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };

  today = today.toLocaleDateString("ko-KR", options);
  return today;
}

export function handleLogoButton() {
  location.reload();
}
