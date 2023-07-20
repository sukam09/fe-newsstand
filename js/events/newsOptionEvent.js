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
  } else if (option === '내가 구독한 언론사') {
    globalStore.commit('updateOption', '내가_구독한_언론사');
  }
  reRenderComponent('GRID_ALL');
};
export { initOptionEvent };
