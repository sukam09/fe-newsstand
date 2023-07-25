import SnackBar from '../components/common/SnackBar.js';
import { customQuerySelector } from './index.js';
import { TEXT } from '../constants/index.js';

export const showSnackBar = () => {
  new SnackBar(customQuerySelector(TEXT.SNACK_BAR_CLASS_NAME));
};
