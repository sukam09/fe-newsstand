import shuffle from "../src/utils/shuffle.js";
import grid_article from "./grid_article.json" assert { type: "json" };

export const shuffled_data = shuffle(grid_article);