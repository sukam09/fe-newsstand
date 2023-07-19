function getGridJSON(){
    const gridArticle = fetch("./data/grid_article.json")
    .then(res => res.json());
    return gridArticle;
}

function getListJSON(){
    const gridArticle = fetch("./data/list_article.json")
    .then(res => res.json());
    return gridArticle;
}


export { getGridJSON, getListJSON};
