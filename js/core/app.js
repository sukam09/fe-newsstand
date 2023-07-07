import { header } from "../components/header.js";
import { main } from "../components/main.js";
import { date } from "../utils/date.js";
import { createRandomNewsstand } from "../utils/creatRandomNewstand.js";

const root = document.querySelector("#root");

root.innerHTML += header;
root.innerHTML += main;

date();
createRandomNewsstand();
