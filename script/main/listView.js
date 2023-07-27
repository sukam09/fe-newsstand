import {getJSON,shuffle } from '../util/util.js';
import {subscribedStore,mode,category_page,media_page,viewMode,progressedIdx } from '../util/store.js'; 
import { alertUnsubscribe } from './subscribe.js';
const media_data = await getJSON("../../assets/data/media_data.json");
const newsData = await getJSON("../../assets/data/news_data.json");
let categories = [];
let categorizedData;
let animationId;
let idx;
let lastProgressed;
/**
 * category_page, media_page에 따라 section안에 내용 바꾸는 함수
 */
export const setNewsData = () => {
  const newsItem = categorizedData[categories[category_page.getState()]][media_page.getState()];
  const index = media_data.findIndex(item => item.name === newsItem["name"]);
  const src = media_data[index].src;
  const selectedCategory = document.querySelectorAll('.category_progress')[category_page.getState()];
  let subscribedElem = document.querySelector('.subscribed');
  if(mode.getState()==='Sub'){
    progressedIdx.setState(category_page.getState());
  }
  if(subscribedStore.getState().includes(index)){ // 구독중인지 아닌지
      subscribedElem.innerHTML = `<img src = "assets/images/delete.svg">`;
  }
  else{
      subscribedElem.innerHTML = `
        <img src = "assets/images/add.svg">
        <p class="subscribed_info text-weak">구독하기</p>
      `;
  }
  idx = index;
  // 감싸는 요소에 이벤트 추가
  const handleClick = handleSubscribe(newsItem, idx);
  
  if (subscribedElem._hasClickListener) {
    subscribedElem.removeEventListener('click', subscribedElem._clickHandler);
  }
  
  // 클릭 이벤트 핸들러를 요소에 저장합니다.
  // 이렇게 하면 나중에 이 핸들러를 제거할 수 있습니다.
  subscribedElem._clickHandler = handleClick;

  subscribedElem.addEventListener('click', handleClick);
  subscribedElem._hasClickListener = true;

  if(mode.getState()==='All'){
    selectedCategory.innerHTML = (media_page.getState() + 1) + "/" + categorizedData[categories[category_page.getState()]].length;
  }
  else{
    selectedCategory.innerHTML = ">";
  }
  document.querySelector(".media_info_edited").innerHTML = newsItem["edit_date"];
  document.querySelector(".thumbnail img").src = "https://picsum.photos/320/200";
  document.querySelector(".thumbnail p").innerHTML = newsItem["main_title"];
  document.querySelector(".source").innerHTML = newsItem["name"] + " 언론사에서 직접 편집한 뉴스입니다.";
  document.querySelector(".media_info img").src = `assets/images/logo/${viewMode.getState()}/${src}`;

  const media_section_list_p_tags = document.querySelectorAll(".media_section_list p");
  
  for (let i = 0; i < media_section_list_p_tags.length - 1; i++) {
    media_section_list_p_tags[i].innerHTML = newsItem["sub_title"][i] || "";
  }
}

function handleSubscribe(newsItem, idx) {
  return function handleClick(e) {
    if (subscribedStore.getState().includes(idx)) {
      alertUnsubscribe(newsItem["name"],idx);
    } else {
      subscribedStore.setState([...subscribedStore.getState(),idx]);
      const snackBar = document.querySelector('.snackBar');
      snackBar.classList.remove('hide');
      setTimeout(function() {
        snackBar.classList.add('hide');  
        mode.setState('Sub');
      }, 3000);
    }
  }
}

/**
 * 
 * @param {JSON} data 
 * @returns JSON
 * 데이터 가져와서 카테고리별로 분류하는 함수
 */
/**
 * @returns JSON
 * 데이터 가져와서 카테고리별로 분류하는 함수
 */
function categorizeData() {
  const categorizedData = {};
  if(mode.getState()==='All'){
    for(let i = 0; i < newsData.length; i++) {
      const item = newsData[i];
      const category = item.category;
      if(!categorizedData[category]) {
        categorizedData[category] = [];
      }
      categorizedData[category].push(item);
    }

    for (const category in categorizedData) {
      shuffle(categorizedData[category]);
    }
  }
  else{
    for(let i =0;i<subscribedStore.getState().length;i++){
      for(let j = 0; j < newsData.length; j++) {
        const item = newsData[j];
        const category = item.name;
        if(category === media_data[subscribedStore.getState()[i]].name){ // 구독한 목록에 있을 때만 
          if(!categorizedData[category]) {
            categorizedData[category] = [];
          }
          categorizedData[category].push(item);
        }
      }   
    }
  }
  return categorizedData;
}

/**
 * 
 * @param {JSON} categorizedData 
 * 각 카테고리별 개수를 구하고 HTML 요소를 생성하는 함수
 */
function createCategoryElements(categorizedData) {
  let categoriesWrapper = document.querySelector('.category');
  Object.keys(categorizedData).forEach((category, index) => {
    categories.push(category);
    
    let categoryItemDiv = document.createElement('div');
    if(index === category_page.getState()){
      categoryItemDiv.classList.add('progressed');
    }
    categoryItemDiv.classList.add('category_item');

    let categoryNameP = document.createElement('p');
    categoryNameP.classList.add("category_name", "selected-bold14");
    categoryNameP.textContent = category;
  
    let categoryProgressP = document.createElement('p');
    categoryProgressP.classList.add("category_progress", "display-bold12");
    categoryProgressP.textContent = `1/${categorizedData[category].length}`;

    [categoryNameP, categoryProgressP].forEach(p => categoryItemDiv.appendChild(p));
    
    categoryItemDiv.addEventListener('click', function() {
      category_page.setState(index);
      media_page.setState(0);
      cancelAnimationFrame(animationId);
    });
    categoriesWrapper.appendChild(categoryItemDiv);
  });
}

const setArrowHandler = () => {
  const leftArrowWrapper = document.querySelector("#arrow_wrapper_left_list");
  const rightArrowWrapper = document.querySelector("#arrow_wrapper_right_list");
  
  if (leftArrowWrapper._hasClickListener || rightArrowWrapper._hasClickListener) {
    return;
  }
  leftArrowWrapper.addEventListener("click", () => {
    if (media_page.getState() === 0) {
      if (category_page.getState() === 0) {
        category_page.setState(Object.keys(categorizedData).length - 1);
      } else {
        category_page.setState(category_page.getState()-1);
      }
      media_page.setState(categorizedData[categories[category_page.getState()]].length - 1); // 해당 카테고리의 마지막 media_page로 설정
    } else {
      media_page.setState(media_page.getState()-1);
    }
    cancelAnimationFrame(animationId);
    updateCategoryProgress();
    progressBarControl();
  });
  
  rightArrowWrapper.addEventListener("click", () => {
    const isLastMedia = categorizedData[categories[category_page.getState()]].length - 1 === media_page.getState();
    const isLastCategory = Object.keys(categorizedData).length - 1 === category_page.getState();
    if (isLastMedia) {
      if (isLastCategory) {
        category_page.setState(0);
      } else {
        category_page.setState(category_page.getState()+1);
      }
      media_page.setState(0); // 새 카테고리의 첫 media_page로 설정
    } else {
      media_page.setState(media_page.getState()+1);
    }
    cancelAnimationFrame(animationId);
    updateCategoryProgress();
    progressBarControl();
  });  
  leftArrowWrapper._hasClickListener = true;
  rightArrowWrapper._hasClickListener = true;
}
/**
 * news data가져와서 기본 셋팅 함수
 */
const getNewsData = async () => {
  categorizedData = categorizeData();
  createCategoryElements(categorizedData);
  setProgressed();
}

/**
 * 현재 category_page에 해당되는 div에 progressed class를 추가하는 함수
 */
const updateCategoryProgress = () => {
  var categoryItems = document.querySelectorAll(".category_item");
  var progressedItem = document.querySelector(".category_item.progressed");
  categoryItems.forEach(item => item.style.background = '');
  if (progressedItem) {
    progressedItem.classList.remove("progressed");
  }

  if (categoryItems[category_page.getState()]) {
    categoryItems[category_page.getState()].classList.add("progressed");
    categoryItems[category_page.getState()].scrollIntoView({behavior: "smooth"}); 
  }
  setNewsData();
};

/**
 * 
 * @param {Object} items 
 * @param {number} index 
 * 카테고리 클릭하면 progressed class 추가하는 함수
 */
const toggleProgressedClass = (items, index) => {
  items.forEach(item => item.classList.remove("progressed"));
  items[index].classList.add("progressed");
};

/**
 * 
 * @param {*} item 
 * @param {*} index 
 * @param {*} items 
 * category 클릭시 애니메이션 설정하는 함수
 */
const addClickListenerToCategoryItem = (item, index, items) => {
  item.addEventListener("click", () => {
    updateCategoryProgress();
    toggleProgressedClass(items, index);
    progressBarControl();
  });
};

/**
 * 카테고리 클릭 이벤트 추가하는 함수
 */
const setProgressed = () => {
  const categoryItems = Array.from(document.querySelectorAll(".category_item"));
  categoryItems.forEach(addClickListenerToCategoryItem);
};

/**
 * 
 * @param {element} element 
 * @param {number} width 
 * progress bar 기본 width 설정하는 함수
 */

/**
 * 페이지 번호 로직 구현한 함수
 */
const updatePageAndData = () => {
  const isLastMedia = categorizedData[categories[category_page.getState()]].length - 1 === media_page.getState();
  const isLastCategory = Object.keys(categorizedData).length - 1 === category_page.getState();
  
  if (isLastMedia) {
    media_page.setState(0);
    if(isLastCategory)
      category_page.setState(0);
    else
      category_page.setState(category_page.getState()+1);
  } else {
    media_page.setState(media_page.getState()+1);
  }

  updateCategoryProgress();
};

/**
 * 
 * @param {*} element 
 * @param {*} endWidth 
 * @param {*} duration 
 * rAF를 이용하여 progress bar animation 추가한 함수
 */
const animateProgressBar = (element, endWidth, duration) => {
  const start = performance.now();
  const step = (timestamp) => {
    const elapsed = timestamp - start;
    const currentWidth = Math.min((endWidth * elapsed) / duration, endWidth);
    element.style.background = `linear-gradient(to right, 
      #4362d0 ${currentWidth}%, 
      #7890E7 0%)`;
    if (currentWidth < endWidth) {
      animationId = requestAnimationFrame(step);
    } else {
      updatePageAndData();
      progressBarControl();
    }
  };
  animationId = requestAnimationFrame(step);
};

/**
 * progressBar 관련하여 초기 설정, 세팅하는 함수
 */
const progressBarControl = () => {
  const progressBar = document.querySelector(".progressed");
  console.log(progressBar);
  const duration = 2000;
  const endWidth = 100;
  animateProgressBar(progressBar, endWidth, duration);
};


let categoriesWrapper;
export const listViewInit = () => {
  cancelAnimationFrame(animationId);
  categories = [];
  animationId = null;
  if(categoriesWrapper) {
    categoriesWrapper.innerHTML = `<div class="progress_bar surface-brand-default"></div>`;
  } else {
    categoriesWrapper = document.querySelector('.category');
  }
  if(mode.getState()==='Sub'){
    category_page.setState(progressedIdx.getState());
  }
  else{
    category_page.setState(0);
  }
  media_page.setState(0);
  getNewsData();
  setArrowHandler();
  progressBarControl();
  setNewsData();
  
};


export default listViewInit;
