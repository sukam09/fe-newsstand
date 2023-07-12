const newsList = [];
const pageAllNum = [];
// const pressContentView = document.getElementById('press-content-view');
const pressContentView = document.getElementsByClassName('press-content-view');
const sectionPrevButton = document.getElementById('press-content-prev');
const sectionNextButton = document.getElementById('press-content-next');

const page = [[], [], [], []];
let newsbarFirst = [];
let newsbarSecond = [];

let pageNumber = 0;
let newsTitleOb = {};

function showDate() {
	const now = new Date();
	const year = now.getFullYear();
    const month = String(now.getMonth()+1).padStart(2, 0);
	const date = String(now.getDate()+1).padStart(2, 0);
	const week = ['일', '월', '화', '수', '목', '금', '토'];
	const day = week[now.getDay()];
	const todayDate = document.getElementsByClassName('header-date');

	todayDate[0].innerHTML = `${year}. ${month}. ${date}. ${day}요일`;
}

function shuffleImgs() {
	const shuffledArray = [...newsList].sort(() => Math.random() - 0.5);

	shuffledArray.forEach((arr, idx) => {
        const pageIndex = Math.floor(idx / 24);
        page[pageIndex].push(arr);
      });
	pressContentView[0].innerHTML = `
    ${page[0].map(arr => `<li><img src="../assets/images/pressLogo/light/img${arr["id"]}.svg"</li>`).join('')};
	`
}

function showPressImg(flag) {
    pageNumber = (flag >= 0) ? ++pageNumber : --pageNumber; 

    sectionPrevButton.style.visibility = pageNumber !== 0 ? "visible" : "hidden";
    sectionNextButton.style.visibility = pageNumber >= 3 ? "hidden" : "visible";
    console.log(pageNumber);
	pressContentView[0].innerHTML = `
		${page[pageNumber].map(arr => `<li><img src="../assets/images/pressLogo/light/img${arr["id"]}.svg"</li>`).join('')};
	`
}


for (let i = 1; i < 97; i++) {
	pageAllNum.push(i);
}

pageAllNum.forEach(arr => {
	newsList.push({ "id": arr });
})

sectionPrevButton.addEventListener('click',()=>showPressImg(-1));
sectionNextButton.addEventListener('click', ()=>showPressImg(1));
