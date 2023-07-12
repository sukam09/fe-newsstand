import { shuffle, getJSON } from '../util/util.js';
import { MEDIA } from '../constants.js'; // magic 넘버
/* 
  media_data = [
  { name: '한국농어촌방송', src: '0.png' },
  { name: '머니투데이', src: '1.png' },
                ...
  ]
*/
import media_data from '../../assets/data/media_data.js';

const subscribed = []; // 구독된 언론사 index 추가
const logoIndex = Array.from({ length: MEDIA.TOTAL }, (_, index) => index); // 전체 언론사 index

const PageController = {
  page: 0,
  arrow_left: document.querySelector('#arrow_wrapper_left'),  // media or 카테고리 이동 화살표 변수
  arrow_right: document.querySelector('#arrow_wrapper_right'),  // media or 카테고리 이동 화살표 변수
  /**
   * 페이지 이동시키는 함수
   * @param {number} index 
  */
  setPage(index) {
    this.page += index;
    GridController.setLogoList();
    this.setArrowVisible();
  },
  /**
   * 화살표 보이게 설정하는 함수
  */
  setArrow() {
    this.setArrowVisible();
    this.arrow_left.addEventListener('click', () => {
      this.setPage(-1);
    });
    this.arrow_right.addEventListener('click', () => {
      this.setPage(1);
    });
  },
  /**
   * 화살표 페이지에 따라 보이게 하는 함수
  */
  setArrowVisible() {
    this.arrow_left.className = `page_${this.page}`;
    this.arrow_right.className = `page_${this.page}`;
  },
};

const GridController = {
  /**
   * grid안에 요소 이미지+태그 추가하는 함수
   * @param {number} media 
   * @param {number} index 
   * @param {HTMLElement} mediaLogo
  */
  updateImageElement(media, index, mediaLogo) {
    const imageElement = mediaLogo[index];
    imageElement.className = `media_logo media_${logoIndex[media]}`;
    imageElement.src = `assets/images/logo/light/${media_data[logoIndex[media]]?.src}`;

    // 이미지랑 같은 노드인 구독하기 or 해지하기 제거
    imageElement.nextElementSibling?.remove();
    imageElement.parentElement.className = '';

    // 구독 여부에 따라 구독하기 or 해지하기 추가
    imageElement.insertAdjacentElement(
      'afterend',
      this.addSubButton(!subscribed.includes(logoIndex[media]))
    );
  },
  /**
   * 
   * @param {boolean} isSub 
   * 구독중인지 확인하는 변수
   * @returns {HTMLDivElement}
  */
  addSubButton(isSub){
    const subElement = document.createElement('div');
    subElement.className = 'media-hover surface-alt';
    subElement.innerHTML = isSub ? '구독하기' : '해지하기';
    return subElement;
  },
  /**
   * 빈 grid에 list요소 채우는 함수
  */ 
  setLogoList() {
    const self = this;
    const mediaLogo = document.querySelectorAll('.media_logo');
    const gridIndex = Array(MEDIA.PAGE_SIZE).fill().map((_, index) => PageController.page * MEDIA.PAGE_SIZE + index);
    gridIndex.forEach((media,index) => {
      self.updateImageElement(media,index,mediaLogo);
    });
  },
  /**
   *  처음에 grid 요소 추가하는 함수
  */
  setLiList() {
    const ul = document.querySelector(".grid_wrapper ul");
    const liHTML = Array(MEDIA.PAGE_SIZE).fill().map(() => html`
      <li>
          <img src="" alt="" class="media_logo">
      </li>
    `).join('');
    ul.innerHTML += liHTML;
  },
};

/**
 * 초기 실행 함수
 */
const gridInit = () => {
  shuffle(logoIndex);
  GridController.setLiList();
  GridController.setLogoList();
  PageController.setArrow();
};

export default gridInit;