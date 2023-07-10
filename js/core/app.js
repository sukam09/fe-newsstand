import { date } from '../utils/date.js';
import { newsstandSystem } from '../newsstand/newsstandSystem.js';

// 기능
headerRender();
mainRender();

function headerRender() {
  date();
}

function mainRender() {
  const newsstanSystem = new newsstandSystem();
  newsstanSystem.createRandomNewsstand();
}
