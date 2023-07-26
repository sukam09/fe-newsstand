export default class NonSubPage {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "nonSubPage";

    this.render();

    return this.$wrapper;
  }

  render() {
    const mainTemplate = `
        <div>
            <p>
                <span>구독한 언론사가 없습니다.</span> <br>
                언론사 구독 설정에서 관심 있는 언론사를 구독하시면 <br>
                언론사가 직접 편집한 뉴스들을 네이버 홈에서 바로 보실 수 있습니다.
            </p>
        </div>
    `;

    this.$wrapper.innerHTML += mainTemplate;
  }
}
