const newsList = [];
const pageAllNum = [];
const pressContentView = document.getElementById('press-content-view');
const sectionPrevButton = document.getElementById('press-content-prev');
const sectionNextButton = document.getElementById('press-content-next');

const page = [[], [], [], []];
let newsbarFirst = [];
let newsbarSecond = [];

let pageNumber = 0;
let newsTitleOb = {};

// async function fetchData() {
//     const newsbarTitle = await fetch("../assets/data/newsTitle.json").then((res) => {
//         return res.json()
//     });
//     return newsbarTitle;
// }

// fetchData().then((data)=> {
//     newsbarFirst = data.titleFirst.map((elem) => {
//         return elem.name;
//     });

//     newsbarSecond = data.titleSecond.map((elem) => {
//         return elem.name;
//     });

//     // setInterval(function() {
//     //     newsbarFirst.forEach((elem) => {
//     //         prevFirst.innerHTML = elem;
//     //     })
        
//     //     newsbarSecond.forEach((elem)=> {
//     //         prevSecond.innerHTML = elem;
//     //     })
//     // }, 3000);
// })


function showDate() {
	const now = new Date();
	const year = now.getFullYear();
    const month = String(now.getMonth()+1).padStart(2, 0);
	const date = String(now.getDate()+1).padStart(2, 0);
	const week = ['일', '월', '화', '수', '목', '금', '토'];
	const day = week[now.getDay()];
	const todayDate = document.getElementById('header-date');

	todayDate.innerHTML = `${year}. ${month}. ${date}. ${day}요일`;
}

function shuffleImgs() {
	const shuffledArray = [...newsList].sort(() => Math.random() - 0.5);

	shuffledArray.forEach((arr, idx) => {
        const pageIndex = Math.floor(idx / 24);
        page[pageIndex].push(arr);
      });
	pressContentView.innerHTML = `
    ${page[0].map(arr => `<li><img src="../assets/images/press/ ${arr["id"]}.png"</li>`).join('')};
	`
}

function showPressImg(flag) {
    pageNumber = (flag >= 0) ? ++pageNumber : --pageNumber; 

    sectionPrevButton.style.visibility = pageNumber !== 0 ? "visible" : "hidden";
    sectionNextButton.style.visibility = pageNumber >= 3 ? "hidden" : "visible";
    console.log(pageNumber);
	pressContentView.innerHTML = `
		${page[pageNumber].map(arr => `<li><img src="../assets/images/press/ ${arr["id"]}.png"</li>`).join('')};
	`
}
showDate();

// rolling 

let intervalFirstNewsbar = setInterval(function() {
    rollingCb('first');
}, 3000);

let intervalSecondNewsbar = setInterval(()=>{
    setTimeout(()=>{
        rollingCb('second');
    }, 1000)
}, 3000);

function rollingCb(state) {
    document.querySelector(`.newsbar-content-container-${state} .prev`).classList.remove('prev');
    let current = document.querySelector(`.newsbar-content-container-${state} .current`);
    current.classList.remove('current');
    current.classList.add('prev');

    let next = document.querySelector(`.newsbar-content-container-${state} .next`);
    if(next.nextElementSibling == null) {
        document.querySelector(`.newsbar-content-container-${state} li:first-child`).classList.add('next');
    } else {
        next.nextElementSibling.classList.add('next');
    }
    next.classList.remove('next');
    next.classList.add('current');
}

window.addEventListener('DOMContentLoaded', ()=>{
    shuffleImgs();
});

for (let i = 0; i < 96; i++) {
	pageAllNum.push(i);
}

pageAllNum.forEach(arr => {
	newsList.push({ "id": arr });
})

sectionPrevButton.addEventListener('click',()=>showPressImg(-1));
sectionNextButton.addEventListener('click', ()=>showPressImg(1));
