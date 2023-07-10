import { date } from "../utils/date.js";
import { createRandomNewsstand } from "../newsstand/newsstandSystem.js";

// 기능
headerRender();
mainRender();

function headerRender() {
  date();
}

function mainRender() {
  createRandomNewsstand();
}
