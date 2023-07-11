import Component from '../core/Component.js';

export default class AllNewsListView extends Component {
  template() {
    return `<div class='newslist-list-view'>
              <nav class='border-default surface-alt'>
                <li class='text-weak available-medium14 press-header-focus surface-brand-default '><span class='selected-bold14 text-white-default'>종합/경제</span><span class='selected-bold14 text-white-default'>2/81</span></li>
                <li class='text-weak available-medium14'>방송/통신</li>
                <li class='text-weak available-medium14'>IT</li>
                <li class='text-weak available-medium14'>영자지</li>
                <li class='text-weak available-medium14'>스포츠/연애</li>
                <li class='text-weak available-medium14'>매거진/전문지</li>
                <li class='text-weak available-medium14'>지역</li>
              </nav>

              <section class='press-news-section'>
                <div class='press-news-info'></div>
                <div class='press-news-content'></div>
              </section>
            </div>
            `;
  }
}
