const indexArr = Array.from({length: 96}, (_,i)=>i);
indexArr.sort(() => Math.random() - 0.5);
let page = 0;

const arr = {
    list: [
        {
            lightUrl: "light0",
            darkUrl: "dark0",
            name: "name0",
            id: 0,
        },
        {
            lightUrl: "light1",
            darkUrl: "dark1",
            name: "name1",
            id: 1,
        },
        {
            lightUrl: "light2",
            darkUrl: "dark2",
            name: "name2",
            id: 2,
        },
    ]
}

const createNewspaperItem = function(index, mode) {
    return `
    <li class="newspaper__item">
    <img src="./assets/newspaper/${mode}/${index+1}.png" alt=${'name'} />
    </li>
    `
}

const createNewspaperList = function(page, mode) {
    const nowPageIndexArr = indexArr.slice(page * 24, (page + 1) * 24);
    const liArr = nowPageIndexArr.map(item => createNewspaperItem(item, mode))
    let newspaperList = liArr.reduce((news, currentIndex) => news + currentIndex);
    return newspaperList;
}

console.log(createNewspaperList(page, "light"));
document.querySelector(".newspaper__list").innerHTML = createNewspaperList(page, "light");