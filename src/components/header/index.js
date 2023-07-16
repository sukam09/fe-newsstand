import { setHeaderLogo } from "./Logo.js";
import { setRolling } from "./Rolling.js";
import { setHeaderDate } from "./DateBox.js";

export const setHeader = () => {
  setHeaderLogo();
  setHeaderDate();
  setRolling();
};
