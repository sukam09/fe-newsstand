import createStore from './createStore.js';
import { GridController,PageController } from '../main/gridView.js';  // GridController를 정확한 경로에서 import 합니다.
export const pageStore = createStore(0);
pageStore.setObserver(() => {
  GridController.setLogoList();
  PageController.setArrowVisible();
});

export const subscribedStore = createStore([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]);
subscribedStore.setObserver( () => {
  GridController.setLogoList();
})

export const mode = createStore('All');
mode.setObserver( () => {
  GridController.setLogoList();
})