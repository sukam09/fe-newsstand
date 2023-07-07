const indexArr = Array.from({length: 96}, (_,i)=>i);
indexArr.sort(() => Math.random() - 0.5);
let page = 0;

const newspaperList = document.querySelector(".newspaper__list");
const leftButton = document.querySelector(".left-button_content");
const rightButton = document.querySelector(".right-button_content");

const createNewspaperItem = function(index, mode) {
    return `
    <li class="newspaper__item">
    <img src="./assets/newspaper/${mode}/${index+1}.png" alt=${'name'} />
    </li>
    `
}

const createNewspaperList = function(mode) {
    const nowPageIndexArr = indexArr.slice(page * 24, (page + 1) * 24);
    const liArr = nowPageIndexArr.map(item => createNewspaperItem(item, mode))
    let newspaperList = liArr.reduce((news, currentIndex) => news + currentIndex);
    return newspaperList;
}

const renderNewspaper = function(mode) {
    newspaperList.innerHTML = createNewspaperList(mode);
}

const setDisplayButton = function() {
    leftButton.style.display = page === 0 ? "none" : "block";
    rightButton.style.display = page === 3 ? "none" : "block";
}

const renderContent = function() {
    renderNewspaper("light");
    setDisplayButton();
}

const movePageLeft = function() {
    page--;
    renderContent();
}
const movePageRight = function() {
    page++;
    renderContent();
}

leftButton.addEventListener("click", movePageLeft);
rightButton.addEventListener("click", movePageRight);

renderNewspaper("light");