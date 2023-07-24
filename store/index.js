import { TEXT } from '../src/constants/index.js';
import { customQuerySelector } from '../src/utils/index.js';
import SnackBar from '../src/components/common/SnackBar.js';
import { PressStore } from './press.js';
import { ViewModeStore } from './view.js';
import { PageStore } from './page.js';

export const showSnackBar = () => {
  new SnackBar(customQuerySelector(TEXT.SNACK_BAR_CLASS_NAME));
};

const pressStore = new PressStore();
const viewStore = new ViewModeStore();
const pageStore = new PageStore();

export { pressStore, viewStore, pageStore };
