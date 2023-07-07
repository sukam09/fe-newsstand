const newsList = [];
const array = [];
const sectionNewsList =  document.getElementById('section-news-list');
const sectionLeftButtonEvent = document.getElementById('section-leftbutton-event');
const sectionRightBUttonEvent = document.getElementById('section-rightbutton-event');

const now = new Date();
const year = now.getFullYear();
const month = ('0'+(now.getMonth() + 1)).slice(-2);
const date = ('0'+(now.getDate())).slice(-2);
const week = ['일', '월', '화', '수', '목', '금', '토'];
const day = week[now.getDay()];
const todayDate = document.getElementById('header-today-date');
todayDate.innerHTML = `${year}. ${month}. ${date}. ${day}요일`;

const page = [[],[],[],[]];

for(let i=0;i<96;i++){
    array.push(i);
}

array.forEach(arr => {
    newsList.push({"id":arr});
})

const shuffledArray = [...newsList].sort(() => Math.random() - 0.5);

shuffledArray.forEach((arr,idx) => {
    if(0 <= idx && idx <= 23){
        page[0].push(arr);
    }
    else if(24<=idx && idx<=47){
        page[1].push(arr);
    }
    else if(48<=idx && idx<=71){
        page[2].push(arr);
    }
    else{
        page[3].push(arr);
    }
}) 

let cnt = 0;
sectionNewsList.innerHTML = `
    ${page[0].map(arr => `<li><img src="./icons/asset ${arr["id"]} 1.png"</li>`).join('')};
 `

function showPressImg(cnt){
    sectionNewsList.innerHTML = `
         ${page[cnt].map(arr => `<li><img src="./icons/asset ${arr["id"]} 1.png"</li>`).join('')};
     `
}


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






