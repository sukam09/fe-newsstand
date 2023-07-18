import createStore from './createStore.js';
import { GridController,PageController } from '../main/gridView.js';  // GridController를 정확한 경로에서 import 합니다.

export const pageStore = createStore();

pageStore.setObserver(() => {
  GridController.setLogoList();
  PageController.setArrowVisible();
});
