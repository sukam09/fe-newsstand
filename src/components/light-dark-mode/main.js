import { LightDarkMode } from './subject.js';
import { ModeObserver } from './observer.js';

const lightDarkMode = new LightDarkMode();
const modeObserver = new ModeObserver(lightDarkMode);
lightDarkMode.addObserver(modeObserver);

export default lightDarkMode;
