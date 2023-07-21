import { globalStore } from '../store/globalVarStore.js';
import { reRenderComponent } from '../utils/reRenderComponent.js';
function initOptionEvent() {
  const tab = document.querySelector('.newsstand__tab');
  tab.addEventListener('click', (e) => optionHandler(e));
}
const optionHandler = (e) => {
  const option = e.target.textContent;

  if (option === '전체 언론사') {
    globalStore.commit('updateOption', '전체_언론사');
    toggleClicked();
  } else if (option === '내가 구독한 언론사') {
    globalStore.commit('updateOption', '내가_구독한_언론사');
    toggleClicked();
  }
  reRenderComponent('GRID_ALL');
};

const toggleClicked = () => {
  const textClicked = document.querySelector('.newsstand—text-clicked');
  const textunClicked = document.querySelector('.newsstand—text-unclicked');
  textClicked.classList.replace('newsstand—text-clicked', 'newsstand—text-unclicked');
  textunClicked.classList.replace('newsstand—text-unclicked', 'newsstand—text-clicked');
};

export { initOptionEvent };
