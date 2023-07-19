import createStore from './createStore.js';
import { GridController,PageController } from '../main/gridView.js';  // GridController를 정확한 경로에서 import 합니다.
export const pageStore = createStore(0);
pageStore.setObserver(() => {
  GridController.setLogoList();
  PageController.setArrowVisible();
});

export const subscribedStore = createStore([1,2,10,9,4,3]);
subscribedStore.setObserver( () => {
  GridController.setLogoList();
})

export const mode = createStore('All');
mode.setObserver( () => {
  GridController.setLogoList();
})