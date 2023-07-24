/*
기사 컨텐츠 컴포넌트
카테고리 변경시 MainContents의 lastPage변경
*/

import CategoryNav from "../NewsListView/CategoryNav.js";
import Contents from "../NewsListView/Contents.js";
import getRandomIndexArr from "../../api/getRandomIndexArr.js";

let indexArr;
let prevCategory = undefined;

const getPressLogo = function (object, mode) {
  return object[`logo${mode}`].url;
};

const getEditDate = function (object) {
  let [date, time] = object.regDate.split(" ");

  let year = date.substring(0, 4);
  let month = date.substring(4, 6);
  let day = date.substring(6, 8);

  date = `${year}.${month}.${day}`;
  time = time.substring(0, 5);

  return `${date} ${time} 편집`;
};

const getMainThumbnail = function (object) {
  return object.materials[0].image.url;
};

const getMainNewsTitle = function (object) {
  return object.materials[0].title;
};

const getsubTitles = function (object) {
  const titles = [];
  object.materials.slice(1).forEach((element) => {
    titles.push(element.title);
  });
  return titles;
};

const getPressName = function (object) {
  return object.name;
};

const getPressId = function (object) {
  return object.pid;
};

export default function NewsListView($target, props) {
  if (prevCategory !== props.category) {
    prevCategory = props.category;
    if (props.pressType === "all")
      indexArr = getRandomIndexArr(props.data.length);
  }

  const newsOject =
    props.pressType === "all"
      ? props.data[indexArr[props.currentPage - 1]]
      : props.data;

  const categoryNavProps = {
    pressType: props.pressType,
    currentPage: props.currentPage,
    lastPage: props.lastPage,
    category: props.category,
    setContentState: props.setContentState,
    timerArr: props.timerArr,
  };

  const contentsProps = {
    headerData: {
      pressId:
        props.pressType === "all" ? getPressId(newsOject) : newsOject.pid,
      pressLogo: getPressLogo(newsOject, props.mode),
      editDate: getEditDate(newsOject),
      setPressType: props.setPressType,
    },
    newsData: {
      mainNewsData: {
        mainThumbnail: getMainThumbnail(newsOject),
        mainNewsTitle: getMainNewsTitle(newsOject),
      },
      subNewsData: {
        subTitles: getsubTitles(newsOject),
        press: getPressName(newsOject),
      },
    },
  };

  this.render = () => {
    let $div = document.querySelector(".news-container");

    if ($div) {
      $target.removeChild($div);
    }

    $div = document.createElement("div");
    $div.setAttribute("class", "news-container");

    new CategoryNav($div, categoryNavProps);
    new Contents($div, contentsProps);

    $target.innerHtml = "";
    $target.appendChild($div);
  };

  this.render();
}
