const newsList = [];
const array = [];

for(let i=0;i<96;i++){
    array.push(i);
}
array.forEach(arr => {
    newsList.push({"id":arr});
})

const shuffledArray = [...newsList].sort(() => Math.random() - 0.5);
const sectionNewsList =  document.getElementById('section-news-list');
const page0 = [];
const page1 = [];
const page2 = [];
const page3 = [];

shuffledArray.forEach((arr, idx) => {
    if(0<=idx && idx <=23) {
        page0.push(arr);
    }
})

shuffledArray.forEach((arr, idx) => {
    if(24<=idx && idx <=47) {
        page1.push(arr);
    }
})

shuffledArray.forEach((arr, idx) => {
    if(48<=idx && idx <=71) {
        page2.push(arr);
    }
})

shuffledArray.forEach((arr, idx) => {
    if(72<=idx && idx <=95) {
        page3.push(arr);
    }
})

 sectionNewsList.innerHTML = `
    ${page0.map(arr => `<li><img src="./icons/asset ${arr["id"]} 1.png"</li>`).join('')};
 `

function showPressImg(cnt) {
    if(cnt === 0){
        sectionNewsList.innerHTML = `
    ${page0.map(arr => `<li><img src="./icons/asset ${arr["id"]} 1.png"</li>`).join('')};
`
    }

    else if(cnt === 1){
        sectionNewsList.innerHTML = `
    ${page1.map(arr => `<li><img src="./icons/asset ${arr["id"]} 1.png"</li>`).join('')};
`
    }

    else if(cnt === 2){
        sectionNewsList.innerHTML = `
    ${page2.map(arr => `<li><img src="./icons/asset ${arr["id"]} 1.png"</li>`).join('')};
`
    }
    else {
        sectionNewsList.innerHTML = `
    ${page3.map(arr => `<li><img src="./icons/asset ${arr["id"]} 1.png"</li>`).join('')};
`
    }
}
const sectionLeftButtonEvent = document.getElementById('section-leftbutton-event');
const sectionRightBUttonEvent = document.getElementById('section-rightbutton-event');

let cnt = 0;

function buttonControll() {
    if(cnt !== 0){
        sectionLeftButtonEvent.style.visibility = "visible";
    }
    else {
        sectionLeftButtonEvent.style.visibility = "hidden";
    }
    if(cnt >= 3){
        sectionRightBUttonEvent.style.visibility = "hidden";
    }
    else {
        sectionRightBUttonEvent.style.visibility = "visible";
    }
}


sectionLeftButtonEvent.addEventListener('click', () => {
    cnt--;
    showPressImg(cnt);
    buttonControll();
})
sectionRightBUttonEvent.addEventListener('click', () => {
    cnt ++;
    showPressImg(cnt);
    buttonControll();
})








