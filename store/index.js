import SnackBar from '../src/components/common/SnackBar.js';
import { TEXT } from '../src/constants/index.js';
import { customQuerySelector } from '../src/utils/index.js';

//store
import { PressStore } from './Press.js';
import { ViewModeStore } from './View.js';
import { PageStore } from './Page.js';

export const showSnackBar = () => {
  new SnackBar(customQuerySelector(TEXT.SNACK_BAR_CLASS_NAME));
};

const pressStore = new PressStore();
const viewStore = new ViewModeStore();
const pageStore = new PageStore();

export { pressStore, viewStore, pageStore };
