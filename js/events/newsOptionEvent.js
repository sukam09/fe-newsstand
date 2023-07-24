import { globalStore } from '../store/globalVarStore.js';
import { reRenderComponent } from '../utils/reRenderComponent.js';
function initOptionEvent() {
  const tab = document.querySelector('.newsstand__tab');
  tab.addEventListener('click', (e) => optionHandler(e));
}
const optionHandler = (e) => {
  const option = e.target.textContent;

  if (option === '전체 언론사') {
    globalStore.state.KEY === '구독언론_그리드_인덱스' && globalStore.commit('updateKey', '전체언론_그리드_인덱스');
    globalStore.state.KEY === '구독언론_리스트' && globalStore.commit('updateKey', '전체언론_리스트');
    globalStore.commit('updateOption', '전체_언론사');
    toggleClickedBtn();
  } else if (option === '내가 구독한 언론사') {
    globalStore.state.KEY === '전체언론_그리드_인덱스' && globalStore.commit('updateKey', '구독언론_그리드_인덱스');
    globalStore.state.KEY === '전체언론_리스트' && globalStore.commit('updateKey', '구독언론_리스트');
    globalStore.commit('updateOption', '구독_언론사');
    toggleClickedBtn();
  }
  console.log(globalStore.state.KEY);
  if (['구독언론_그리드_인덱스', '전체언론_그리드_인덱스'].includes(globalStore.state.KEY))
    reRenderComponent('GRID_ALL');
  if (['전체언론_리스트', '구독언론_리스트'].includes(globalStore.state.KEY)) reRenderComponent('LIST_ALL');
};

const toggleClickedBtn = () => {
  const textClicked = document.querySelector('.newsstand—text-clicked');
  const textunClicked = document.querySelector('.newsstand—text-unclicked');
  textClicked.classList.replace('newsstand—text-clicked', 'newsstand—text-unclicked');
  textunClicked.classList.replace('newsstand—text-unclicked', 'newsstand—text-clicked');
};

export { initOptionEvent };
