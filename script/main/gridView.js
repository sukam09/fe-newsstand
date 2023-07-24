import { shuffle, getJSON } from '../util/util.js';
import { MEDIA } from '../constants.js'; // magic 넘버
import { pageStore,subscribedStore,mode } from '../util/store.js'; 
/* 
  media_data = [
  { name: '한국농어촌방송', src: '0.png' },
  { name: '머니투데이', src: '1.png' },
                ...
  ]
*/
const media_data = await getJSON("../../assets/data/media_data.json");

const logoIndex = Array.from({ length: MEDIA.TOTAL }, (_, index) => index); // 전체 언론사 index

export const PageController = {
  page: pageStore.getState(),
  arrow_left: document.querySelector('#arrow_wrapper_left'),  // media or 카테고리 이동 화살표 변수
  arrow_right: document.querySelector('#arrow_wrapper_right'),  // media or 카테고리 이동 화살표 변수
  /**
   * 페이지 이동시키는 함수
   * @param {number} index 
  */
  setPage(index) {
    pageStore.setState(pageStore.getState() + index);
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
    this.arrow_left.className = `page_${pageStore.getState()}`;
    this.arrow_right.className = `page_${pageStore.getState()}`;
  },
};

export const GridController = {
  /**
   * grid안에 요소 이미지+태그 추가하는 함수
   * @param {number} media 
   * @param {number} index 
   * @param {HTMLElement} mediaLogo
  */
  updateImageElement(media, index, mediaLogo) {
    const imageElement = mediaLogo[index];
    if(mode.getState() === 'All'){
      imageElement.className = `media_logo media_${logoIndex[media]}`;
      imageElement.src = `assets/images/logo/light/${media_data[logoIndex[media]]?.src}`;

      // 이미지랑 같은 노드인 구독하기 or 해지하기 제거
      imageElement.nextElementSibling?.remove();
      imageElement.parentElement.className = '';

      // 구독 여부에 따라 구독하기 or 해지하기 추가
      imageElement.insertAdjacentElement(
        'afterend',
        this.addSubButton(!subscribedStore.getState().includes(logoIndex[media]),logoIndex[media])
      );
    }
    else{
      imageElement.className = `media_logo media_${media}`;
      imageElement.src = `assets/images/logo/light/${media_data[media]?.src}`;

      // 이미지랑 같은 노드인 구독하기 or 해지하기 제거
      imageElement.nextElementSibling?.remove();
      imageElement.parentElement.className = '';

      // 구독 여부에 따라 구독하기 or 해지하기 추가
      imageElement.insertAdjacentElement(
        'afterend',
        this.addSubButton(!subscribedStore.getState().includes(media),media)
      );
    }
  },
  /**
   * 
   * @param {boolean} isSub 
   * @param {number} logoIndex
   * 구독중인지 확인하는 변수
   * @returns {HTMLDivElement}
  */
  addSubButton(isSub,logoIndex){
    const subElement = document.createElement('div');
    subElement.className = 'media-hover surface-alt';
    subElement.innerHTML = isSub ? `<div class="subscribedWrapper surface-default"><img src = "assets/images/add.svg">
    <p class="subscribed_info text-weak available-medium12">구독하기</p></div>` :`<div class="subscribedWrapper surface-default border-default"><img src = "assets/images/delete.svg">
    <p class="subscribed_info text-weak available-medium12">해지하기</p></div>`;
    const wrapperElement = subElement.querySelector('.subscribedWrapper');
    
    if(isSub){
      wrapperElement.addEventListener('click', function(event) {
        subscribedStore.setState([...subscribedStore.getState(),logoIndex]);
        const snackBar = document.querySelector('.snackBar');
        snackBar.classList.remove('hide');
        setTimeout(function() {
          snackBar.classList.add('hide');  
          mode.setState('Sub');
        }, 3000);
      });
    }
    
    else{
      wrapperElement.addEventListener('click', function(event) {
        let index = subscribedStore.getState().indexOf(logoIndex);
        if (index !== -1) {
          let newState = [...subscribedStore.getState()];
          newState.splice(index, 1);
          subscribedStore.setState(newState);
        }
      })
    }

    return subElement;
  },

  /**
   * 빈 grid에 list요소 채우는 함수
  */ 
  setLogoList() {
    const self = this;
    this.setLiList();
    const mediaLogo = document.querySelectorAll('.media_logo');
    
    if(mode.getState() === 'All'){
      const gridIndex = Array(MEDIA.PAGE_SIZE).fill().map((_, index) => pageStore.getState() * MEDIA.PAGE_SIZE + index);
      gridIndex.forEach((media,index) => {
        self.updateImageElement(media,index,mediaLogo);
      });
    }
    else{
      const subscribedIndexes = subscribedStore.getState();
      const startIdx = pageStore.getState() * MEDIA.PAGE_SIZE;
      const endIdx = (pageStore.getState() + 1) * MEDIA.PAGE_SIZE;
      subscribedIndexes.slice(startIdx, endIdx).forEach((media, index) => {
        self.updateImageElement(media, index, mediaLogo);
      });
    }
  },

  /**
   *  처음에 grid 요소 추가하는 함수
  */
  setLiList() {
    const ul = document.querySelector(".grid_wrapper ul");
    ul.innerHTML = '';
    const liHTML = Array(MEDIA.PAGE_SIZE).fill().map(() => `
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
  GridController.setLogoList();
  PageController.setArrow();
};

export default gridInit;