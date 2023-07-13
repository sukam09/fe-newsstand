import {getJSON } from '../util/util.js';
let categories = [];
let category_page = 0;
let media_page = 0;
let categorizedData;
let animationId;
const setNewsData = () => {
  const category_progress = document.querySelector(".category_progress");
  const newsItem = categorizedData[categories[category_page]][media_page];
  const media_info_edited = document.querySelector(".media_info_edited");
  const thumbnail_p = document.querySelector(".thumbnail p");
  const media_section_list_p_tags = document.querySelectorAll(".media_section_list p");
  const media_section_source = document.querySelector(".source");

  category_progress.innerHTML = (media_page+1)+"/" + (categorizedData[categories[category_page]].length);
  media_info_edited.innerHTML = newsItem["edit_date"];
  thumbnail_p.innerHTML = newsItem["main_title"];

  for (let i = 0; i < media_section_list_p_tags.length-1; i++) {
    media_section_list_p_tags[i].innerHTML = "";
  }
  if (newsItem && newsItem["sub_title"].length > 0) {
    for (let i = 0; i < newsItem["sub_title"].length; i++) { 
      if (media_section_list_p_tags[i]) { 
        media_section_list_p_tags[i].innerHTML = newsItem["sub_title"][i];
      }
    }
  }
  media_section_source.innerHTML = newsItem["name"] +" 언론사에서 직접 편집한 뉴스입니다.";
}

const getNewsData = async () => {
  const newsData = await getJSON("../assets/data/news_data.json");
  // 데이터를 카테고리별로 분류하는 함수
  function categorizeData(data) {
    let categorizedData = {};

    for(let i = 0; i < data.length; i++) {
      let item = data[i];
      let category = item.category;

      if(!categorizedData[category]) {
        categorizedData[category] = [];
      }

      categorizedData[category].push(item);
    }

    return categorizedData;
  }

  // 각 카테고리별 개수를 구하고 HTML 요소를 생성하는 함수
  function createCategoryElements(categorizedData) {
    let categoriesWrapper = document.querySelector('.category');
  
    Object.keys(categorizedData).forEach((category, index) => {
      categories.push(category);
      let categoryItemCount = categorizedData[category].length;
    
      let categoryItemDiv = document.createElement('div');
      categoryItemDiv.className = "category_item";
      if(index === 0) {
        categoryItemDiv.classList.add('progressed');
      }
      let categoryNameP = document.createElement('p');
      categoryNameP.classList.add("category_name","selected-bold14");
      categoryNameP.textContent = category;
      
      let categoryProgressP = document.createElement('p');
      categoryProgressP.classList.add("category_progress", "display-bold12");
      categoryProgressP.textContent = "1/" + categoryItemCount;
    
      categoryItemDiv.appendChild(categoryNameP);
      categoryItemDiv.appendChild(categoryProgressP);
    
      categoryItemDiv.addEventListener('click', function() {
        category_page = index;
        media_page = 0;
        cancelAnimationFrame(animationId);
        setNewsData();
      });
    
      categoriesWrapper.appendChild(categoryItemDiv);
    });
    
  }
  
  categorizedData = categorizeData(newsData);
  console.log(categorizedData);
  createCategoryElements(categorizedData);
  setProgressed();
}

const setProgressed = () => {
  var categoryItems = document.querySelectorAll(".category_item");

  function updateProgressBar() {
    var progressed = document.querySelector(".category_item.progressed");
    var progressBar = document.querySelector(".progress_bar");

    if (!progressed || !progressBar) return;

    var rect = progressed.getBoundingClientRect();

    progressBar.style.position = "absolute";
    progressBar.style.top = rect.top + "px";
    progressBar.style.left = rect.left + "px";
  }

  for (var i = 0; i < categoryItems.length; i++) {
    categoryItems[i].addEventListener("click", function (event) {
      for (var j = 0; j < categoryItems.length; j++) {
        categoryItems[j].classList.remove("progressed");
      }

      event.currentTarget.classList.add("progressed");
      updateProgressBar();

      // 클릭할 때마다 progressBarControl 호출
      progressBarControl();
    });
  }
};

const progressBarControl = () => {
  let start = null;
  const element = document.querySelector(".progress_bar");
  const duration = 1000;
  const endWidth = 166;

  function step(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    const currentWidth = Math.min((endWidth * elapsed) / duration, endWidth);
    element.style.width = currentWidth + "px";

    if (currentWidth < endWidth) {
      animationId = requestAnimationFrame(step);
    } else {
      console.log(categorizedData[categories[category_page]]);
      if(categorizedData[categories[category_page]].length - 1 === media_page){ // 한 페이지 끝까지 돌면
        media_page = 0;
        category_page += 1;
      }
      else{
        media_page+=1;
      }
      setNewsData();
      element.style.width = "0px";
      progressBarControl();
    }
  }

  element.style.width = "0px"; // 클릭할 때마다 width를 초기화
  animationId = requestAnimationFrame(step);
};

const listViewInit = () => {
  getNewsData();
};

export default listViewInit;
