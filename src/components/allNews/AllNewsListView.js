import { shufflePressOrder } from '../../utils/index.js';
import Component from '../core/Component.js';
import ArrowButton from './ArrowButton.js';

export default class AllNewsListView extends Component {
  setup() {
    this.state = {
      page: 0,
      pressOrder: [
        '종합/경제',
        '방송/통신',
        'IT',
        '영자지',
        '스포츠/연애',
        '매거진/전문지',
        '지역',
      ],
      currentPage: 1,
      totalPage: 81,
    };
  }
  template() {
    return `<div class='news-list-wrapper'>
              <button class='left-button'></button>

              <div class='newslist-list-view border-default'>
                <nav class='border-default surface-alt'>

                  <li class='text-weak available-medium14 press-header-focus surface-brand-alt '>
                  <span class='progress-bar surface-brand-default'></span>
                  <div>
                    <span class='selected-bold14 text-white-default'>종합/경제</span><span class='selected-bold14 text-white-default'>
                    <span class='display-bold12 text-white-default'>${this.state.currentPage}</span>
                    <span class='display-bold12 text-white-weak'> / ${
                      this.state.totalPage
                    }</span></span>
                  </div>
                  </li>

                  <li class='text-weak available-medium14'>방송/통신</li>
                  <li class='text-weak available-medium14'>IT</li>
                  <li class='text-weak available-medium14'>영자지</li>
                  <li class='text-weak available-medium14'>스포츠/연애</li>
                  <li class='text-weak available-medium14'>매거진/전문지</li>
                  <li class='text-weak available-medium14'>지역</li>
                </nav>

                <section class='press-news-section'>
                  <div class='press-news-info'>
                    <img class='press-logo' src='src/assets/logo/${0}.png'/>
                    <span class='display-medium12 text-default'>2023.02.10. 19:38 편집</span>
                    <button>구독하기</button>
                  </div>

                  <div class='press-news-content'>
                    <div class='press-news-img'>
                      <img class='border-default available-medium16 text-strong' src='https://picsum.photos/200/300'/>
                      <span class='available-medium16  text-strong'>이재명 '억울하고 괴로워도 의연하게 맞설 것'</span>
                    </div>

                    <div class='press-news-detail-list'>
                      <span class='available-medium16 text-bold'>이재명 "공개소환, 회술레같은 수치"…검찰 "비공개 출석 요구하지도 않았다"</span>
                      <span class='available-medium16 text-bold'>[與 당권경쟁] 김기현·안철수·천하람·황교안, 본경선 진출</span>
                      <span class='available-medium16 text-bold'>[與 당권경쟁] 김기현·안철수·천하람·황교안, 본경선 진출</span>
                      <span class='available-medium16 text-bold'>[與 당권경쟁] 김기현·안철수·천하람·황교안, 본경선 진출</span>
                      <span class='available-medium16 text-bold'>[與 당권경쟁] 김기현·안철수·천하람·황교안, 본경선 진출</span>
                      <span class='available-medium16 text-bold'>[與 당권경쟁] 김기현·안철수·천하람·황교안, 본경선 진출</span>

                      <span class='display-medium14 text-weak'>아주경제 언론사에서 직접 편집한 뉴스입니다.</span>
                      
                    </div>
                  </div>
                  
                </section>
              </div>
              
              <button class='right-button'></button>
            </div>
            `;
  }

  mounted() {
    setTimeout(() => {
      this.$target.querySelector('.progress-bar').style.width = '100%';
    }, 100);

    new ArrowButton(this.$target.querySelector('.left-button'), {
      name: 'left-button',
      isVisible: true,
    });

    new ArrowButton(this.$target.querySelector('.right-button'), {
      name: 'right-button',
      isVisible: true,
    });
  }
}
