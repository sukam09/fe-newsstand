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

window.addEventListener('DOMContentLoaded', shuffleImgs);



/////////////////////////////처음부터 다시 해보자.///////////////////////////////
// document.addEventListener('DOMContentLoaded', ()=>{
//     let interval = window.setInterval(rollingCallback, 3000);
//     // window.setInterval(rollingCallback, 3000);
// })
// function rollingCallback(){
//     //.prev 클래스 삭제
//     document.querySelector('.newsbar-first-container .prev').classList.remove('prev');

//     //.current -> .prev
//     let current = document.querySelector('.newsbar-first-container .current');
//     current.classList.remove('current');
//     current.classList.add('prev');

//     //.next -> .current
//     let next = document.querySelector('.newsbar-first-container .next');
//     //다음 목록 요소가 널인지 체크
//     if(next.nextElementSibling == null){
//         document.querySelector('.newsbar-first-container li:first-child').classList.add('next');
//     }else{
//     	//목록 처음 요소를 다음 요소로 선택
//         next.nextElementSibling.classList.add('next');
//     }
//     next.classList.remove('next');
//     next.classList.add('current');
// }

document.addEventListener('DOMContentLoaded', ()=> {
    var interval = window.setInterval(rollingCb, 3000);
})
function rollingCb() {
    document.querySelector('.newsbar-first-container .prev').classList.remove('prev');
    let currentFirst = document.querySelector('.newsbar-first-container .current');
    currentFirst.classList.remove('current');
    currentFirst.classList.add('prev');

    document.querySelector('.newsbar-second-container .prev').classList.remove('prev');
    let currentSecond = document.querySelector('.newsbar-second-container .current');
    currentSecond.classList.remove('current');
    currentSecond.classList.add('prev');

    let nextFirst = document.querySelector('.newsbar-first-container .next');
    if(nextFirst.nextElementSibling == null) {
        document.querySelector('.newsbar-first-container ul li:first-child').classList.add('next');
    } else {
        nextFirst.nextElementSibling.classList.add('next');
    }
    nextFirst.classList.remove('next');
    nextFirst.classList.add('current');

    let nextSecond = document.querySelector('.newsbar-second-container .next');
    if(nextSecond.nextElementSibling == null) {
        document.querySelector('.newsbar-second-container ul li:first-child').classList.add('next');
    } else {
        nextSecond.nextElementSibling.classList.add('next');
    }
    nextSecond.classList.remove('next');
    nextSecond.classList.add('current');
}


for (let i = 0; i < 96; i++) {
	pageAllNum.push(i);
}

pageAllNum.forEach(arr => {
	newsList.push({ "id": arr });
})

sectionPrevButton.addEventListener('click',()=>showPressImg(-1));
sectionNextButton.addEventListener('click', ()=>showPressImg(1));
