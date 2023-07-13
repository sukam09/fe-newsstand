const pageAllNum = [];

const newsList = [];
const page = [[], [], [], []];

const sectionPrevButton = document.getElementById('press-content-prev');
const sectionNextButton = document.getElementById('press-content-next');
const pressContentView = document.getElementsByClassName('press-content-view');

let pageNumber = 0;

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

for (let i = 1; i < 97; i++) {
	pageAllNum.push(i);
}

pageAllNum.forEach(arr => {
	newsList.push({ "id": arr });
})

function showPressImg(flag) {
    const pressContentView = document.getElementsByClassName('press-content-view');
    pageNumber = (flag >= 0) ? ++pageNumber : --pageNumber; 

    sectionPrevButton.style.visibility = pageNumber !== 0 ? "visible" : "hidden";
    sectionNextButton.style.visibility = pageNumber >= 3 ? "hidden" : "visible";
	pressContentView[0].innerHTML = `
		${page[pageNumber].map(arr => `<li><img src="../assets/images/pressLogo/light/img${arr["id"]}.svg"</li>`).join('')};
	`
}

function changePressGrid() {
    sectionPrevButton.addEventListener('click',()=>showPressImg(-1));
    sectionNextButton.addEventListener('click', () => showPressImg(1));
}


export {shuffleImgs, changePressGrid};
