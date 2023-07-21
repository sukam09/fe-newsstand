import {getJSON,shuffle } from '../util/util.js';
const media_data = await getJSON("../../assets/data/media_data.json");
const newsData = await getJSON("../../assets/data/news_data.json");
import {subscribedStore,mode } from '../util/store.js'; 
let categories = [];
let category_page = 0;
let media_page = 0;
let categorizedData;
let animationId;
let idx;
/**
 * category_page, media_page에 따라 section안에 내용 바꾸는 함수
 */
const setNewsData = (category_page) => {
  const newsItem = categorizedData[categories[category_page]][media_page];
  const index = media_data.findIndex(item => item.name === newsItem["name"]);
  const src = media_data[index].src;
  const selectedCategory = document.querySelectorAll('.category_progress')[category_page];
  let subscribedElem = document.querySelector('.subscribed');
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
  // 이전에 이벤트 리스너가 추가된 상태인지 확인하고, 그렇지 않은 경우에만 이벤트 리스너를 추가합니다.
  if (!subscribedElem._hasClickListener) {
    subscribedElem.addEventListener('click', function(e) {
      if (subscribedStore.getState().includes(idx)) {
        let removeIdx = subscribedStore.getState().indexOf(idx);
        if (removeIdx !== -1) {
          let newState = [...subscribedStore.getState()];
          newState.splice(removeIdx, 1);
          subscribedStore.setState(newState);
        }
      } else {
        subscribedStore.setState([...subscribedStore.getState(),idx]);
        const snackBar = document.querySelector('.snackBar');
        snackBar.classList.remove('hide');
        setTimeout(function() {
          snackBar.classList.add('hide');  
          mode.setState('Sub');
          
        }, 3000);
      }
    });
    subscribedElem._hasClickListener = true; // 이벤트 리스너가 등록되었음을 표시
  }
  if(mode.getState()==='All'){
    selectedCategory.innerHTML = (media_page + 1) + "/" + categorizedData[categories[category_page]].length;
  }
  else{
    selectedCategory.innerHTML = ">";
  }
  document.querySelector(".media_info_edited").innerHTML = newsItem["edit_date"];
  document.querySelector(".thumbnail img").src = "https://picsum.photos/320/200";
  document.querySelector(".thumbnail p").innerHTML = newsItem["main_title"];
  document.querySelector(".source").innerHTML = newsItem["name"] + " 언론사에서 직접 편집한 뉴스입니다.";
  document.querySelector(".media_info img").src = `assets/images/logo/light/${src}`;

  const media_section_list_p_tags = document.querySelectorAll(".media_section_list p");
  
  for (let i = 0; i < media_section_list_p_tags.length - 1; i++) {
    media_section_list_p_tags[i].innerHTML = newsItem["sub_title"][i] || "";
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
  let categorizedData = {};
  if(mode.getState()==='All'){

    for(let i = 0; i < newsData.length; i++) {
      let item = newsData[i];
      let category = item.category;
      if(!categorizedData[category]) {
        categorizedData[category] = [];
      }
      categorizedData[category].push(item);
    }

    // Shuffle each category's data
    for (let category in categorizedData) {
      shuffle(categorizedData[category]);
    }
  }
  else{
    for(let i =0;i<subscribedStore.getState().length;i++){
      for(let j = 0; j < newsData.length; j++) {
        let item = newsData[j];
        let category = item.name;
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
    if (index === 0) {
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
      category_page = index;
      media_page = 0;
      cancelAnimationFrame(animationId);
      setNewsData(index);
    });
    categoriesWrapper.appendChild(categoryItemDiv);
  });
}

const setArrowHandler = () => {
  const leftArrowWrapper = document.querySelector("#arrow_wrapper_left_list");
  const rightArrowWrapper = document.querySelector("#arrow_wrapper_right_list");
  
  // 이벤트 리스너가 이미 등록되어 있다면 리턴하여 다시 추가하지 않습니다.
  if (leftArrowWrapper._hasClickListener || rightArrowWrapper._hasClickListener) {
    return;
  }
  leftArrowWrapper.addEventListener("click", () => {
    if (media_page === 0) {
      if (category_page === 0) {
        category_page = Object.keys(categorizedData).length - 1;
      } else {
        category_page -= 1;
      }
      media_page = categorizedData[categories[category_page]].length - 1; // 해당 카테고리의 마지막 media_page로 설정
    } else {
      media_page -= 1;
    }
    cancelAnimationFrame(animationId);
    progressBarControl();
    updateCategoryProgress();
  });
  
  rightArrowWrapper.addEventListener("click", () => {
    const isLastMedia = categorizedData[categories[category_page]].length - 1 === media_page;
    const isLastCategory = Object.keys(categorizedData).length - 1 === category_page;
    if (isLastMedia) {
      if (isLastCategory) {
        category_page = 0;
      } else {
        category_page += 1;
      }
      media_page = 0; // 새 카테고리의 첫 media_page로 설정
    } else {
      media_page += 1;
    }
    cancelAnimationFrame(animationId);
    progressBarControl();
    updateCategoryProgress();
  });  
  leftArrowWrapper._hasClickListener = true;
  rightArrowWrapper._hasClickListener = true;
}
/**
 * news data가져와서 기본 셋팅 함수
 */
const getNewsData = async () => {
  var progressBar = document.querySelector(".progress_bar");
  var progressed = document.querySelector(".category_item.progressed");
  if (progressed && progressBar) {
    var rect = progressed.getBoundingClientRect();
    progressBar.style.top = rect.top + "px";
    progressBar.style.left = rect.left + "px";
  }
  categorizedData = categorizeData();
  createCategoryElements(categorizedData);
  setProgressed();
  setNewsData(category_page);
}

/**
 * 현재 category_page에 해당되는 div에 progressed class를 추가하는 함수
 */
const updateCategoryProgress = () => {
  var categoryItems = document.querySelectorAll(".category_item");
  var progressedItem = document.querySelector(".category_item.progressed");
  var progressBar = document.querySelector(".progress_bar");

  if (progressedItem) {
    progressedItem.classList.remove("progressed");
  }

  if (categoryItems[category_page]) {
    categoryItems[category_page].classList.add("progressed");
  }

  var progressed = document.querySelector(".category_item.progressed");

  if (progressed && progressBar) {
    var rect = progressed.getBoundingClientRect();
    progressBar.style.top = rect.top + "px";
    progressBar.style.left = rect.left + "px";
  }
  setNewsData(category_page);
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
 * @param {Object} progressed 
 * @param {querySelector} progressBar 
 * progressBar의 기본 위치 설정하는 함수
 */
const setProgressBarPosition = (progressed, progressBar) => {
  if (!progressed || !progressBar) return;

  const rect = progressed.getBoundingClientRect();
  
  Object.assign(progressBar.style, {
    position: "absolute",
    top: `${rect.top}px`,
    left: `${rect.left}px`
  });
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
    toggleProgressedClass(items, index);
    setProgressBarPosition(items[index], document.querySelector(".progress_bar"));
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
const setWidth = (element, width) => {
  element.style.width = `${width}px`;
};

const incrementPageOrReset = (current, max) => {
  return current < max ? current + 1 : 0;
};

/**
 * 페이지 번호 로직 구현한 함수
 */
const updatePageAndData = () => {
  const isLastMedia = categorizedData[categories[category_page]].length - 1 === media_page;
  const isLastCategory = Object.keys(categorizedData).length - 1 === category_page;
  
  if (isLastMedia) {
    media_page = 0;
    category_page = isLastCategory ? 0 : category_page + 1;
  } else {
    media_page += 1;
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
    setWidth(element, currentWidth);

    if (currentWidth < endWidth) {
      animationId = requestAnimationFrame(step);
    } else {
      updatePageAndData();
      setWidth(element, 0);
      progressBarControl();
    }
  };

  animationId = requestAnimationFrame(step);
};

/**
 * progressBar 관련하여 초기 설정, 세팅하는 함수
 */
const progressBarControl = () => {
  const progressBar = document.querySelector(".progress_bar");
  const duration = 1000;
  const endWidth = 166;

  setWidth(progressBar, 0);
  animateProgressBar(progressBar, endWidth, duration);
};


let categoriesWrapper;
export const listViewInit = () => {
  cancelAnimationFrame(animationId);
  categories = [];
  category_page = 0;
  media_page = 0;
  animationId = null;

  if(categoriesWrapper) {
    categoriesWrapper.innerHTML = `<div class="progress_bar surface-brand-default"></div>`;
  } else {
    categoriesWrapper = document.querySelector('.category');
  }
  getNewsData();
  progressBarControl();
  setArrowHandler();
};


export default listViewInit;
