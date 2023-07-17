export function NewsList() {
  return `
    <section class="news-section-list">
      <ul class="news-list__field-tab">
        <li class="news-list__field-tab__progress">
          <span>종합/경제</span>
          <span class="news-list__field-tab__progress-count">
            1
            <span class="news-list__field-tab__progress-entire">/ 75</span>
          </span>
        </li>
        <li class="news-list__field-tab__general">방송/통신</li>
        <li class="news-list__field-tab__general">IT</li>
        <li class="news-list__field-tab__general">영자지</li>
        <li class="news-list__field-tab__general">스포츠/연예</li>
        <li class="news-list__field-tab__general">매거진/전문지</li>
        <li class="news-list__field-tab__general">지역</li>
      </ul>
      <div class="news-list__press-news"></div>

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
