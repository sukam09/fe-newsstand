export function NewsGrid() {
  return `
    <section class="news-section-grid">
      <ul class="newspaper__list"></ul>

      <div class="left-button_content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="42"
          viewBox="0 0 26 42"
          fill="none"
        >
          <path d="M25 1L1 21L25 41" stroke="#6E8091" />
        </svg>
      </div>

      <div class="right-button_content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="42"
          viewBox="0 0 26 42"
          fill="none"
        >
          <path d="M1 41L25 21L1 1" stroke="#6E8091" />
        </svg>
      </div>
    </section>
  `;
}
