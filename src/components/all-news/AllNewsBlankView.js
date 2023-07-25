import Component from '../core/Component.js';

export default class AllNewsBlankView extends Component {
  template() {
    return `
      <div class="news-list-wrapper">
        <div class="newslist-list-view border-default">
          <article>
            <p class="display-bold16 text-strong">구독한 언론사가 없습니다.</p>

            <div>
            <p class="display-medium14 text-weak">
              언론사 구독 설정에서 관심 있는 언론사를 구독하시면
            </p>
            <p class="display-medium14 text-weak">
              언론사가 직접 편집한 뉴스들을 네이버홈에서 바로 보실 수 있습니다.
            </p>
            </div>
            
          </article>
        </div>
      </div>
    `;
  }
}
