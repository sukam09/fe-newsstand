const getArticleHead = () => {
    return `
        
    `;
};

const setListView = () => {
    const listViewMain = document.querySelector(".list-view-main-container");
    listViewMain.insertAdjacentHTML("beforeend", getArticleHead());
};
