import handleClickLogo from "./clickTitleLogo.js";
import showNews from "./showPressNews.js";

const $newsPrevButton = document.querySelector('.press-news-left-button');
const $newsNextButton = document.querySelector('.press-news-right-button');
let newsPage = 0;

/**
페이지 넘기는 버튼의 클릭 이벤트 핸들링
*/
function turnNewsPage(shuffledPressNews, index) {
  $newsPrevButton.addEventListener('click',(event) => 
  handleClickNewsTurner(event,shuffledPressNews,index,'left'));
  $newsNextButton.addEventListener('click',(event) => 
  handleClickNewsTurner(event,shuffledPressNews,index,'right'));
}

/**
페이지 넘기는 버튼 유무 설정
 */
function showNewsTurner(shuffledPressNews,index){
  $newsPrevButton.style.display = newsPage !== 0 ? 'block' : 'none';
  $newsNextButton.style.display = newsPage === shuffledPressNews[index].length - 1 ? 'none' : 'block';
}

/**
 해당 페이지에 맞는 뉴스 띄우기
 */
function handleClickNewsTurner(event, shuffledPressNews, category_index, whatButton) {
  whatButton === 'left' ? newsPage-- : newsPage++;
  showNewsTurner(shuffledPressNews, category_index);
  showNews(shuffledPressNews, category_index, newsPage);
}

export default turnNewsPage
