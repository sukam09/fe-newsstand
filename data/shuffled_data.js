import grid_article from "./grid_article.json" assert { type: "json" };

function shuffle(array){
    array.sort(() => Math.random() - 0.5);
    return array;
}

export const shuffled_data = shuffle(grid_article);