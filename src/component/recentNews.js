import leftrecentArticles from "../../../data/recent_left_article.json" assert { type: "json"};
import rightrecentArticles from "../../../data/recent_right_article.json" assert { type: "json"};

let timeout;
let left_interval;
let right_interval;

function makeList(dom, location){
    let recentArticles;

    if(location === "left"){
        recentArticles = leftrecentArticles;
    }
    else{
        recentArticles = rightrecentArticles;
    }

    const lastIndex= recentArticles.length - 1;
    let classname = "#";
    const newsList = document.createElement("ul");

    recentArticles.forEach((value,index) =>{
        const article = document.createElement("li");
        if(index === 0){
            classname = "current";
        }
        else if(index === 1){
            classname = "next";
        }
        else if(index === lastIndex){   
            classname = "prev"
        }
        else{
            classname = "#"
        }
        article.innerHTML = value.artlcle;
        article.classList.add(classname);
        newsList.appendChild(article);
    });
    dom.appendChild(newsList);
}

function rollingNews(selected){
    document.querySelector(`#main-${selected}-bar .prev`).classList.remove("prev");

    let current = document.querySelector(`#main-${selected}-bar .current`);
    current.classList.remove("current");
    current.classList.add("prev");

    let next = document.querySelector(`#main-${selected}-bar .next`);
    if(next.nextElementSibling == null){
        document.querySelector(`#main-${selected}-bar ul li:first-child`).classList.add("next");
    }else{
        next.nextElementSibling.classList.add("next");
    }
    next.classList.remove("next");
    next.classList.add("current");
}

function leftRollingRoop(){
    left_interval = setInterval(()=>{
        rollingNews("left");  
    }, 5000);
}

function rightRollingRoop(){
    right_interval = setInterval(()=>{
        timeout = setTimeout(() =>{
            rollingNews("right");  
        }, 1000)
    }, 5000);
}

function addMouseover(leftBar, rightBar){
    leftBar.addEventListener("mouseout", () => {
        leftRollingRoop();
    })
    leftBar.addEventListener("mouseover",() =>{
        clearInterval(left_interval);
    })
    rightBar.addEventListener("mouseout", () => {
        rightRollingRoop();
    })
    rightBar.addEventListener("mouseover",() =>{
        clearInterval(right_interval);
    })
}

export default function recentNews(){
    const leftBar = document.getElementById("main-left-bar");
    const rightBar = document.getElementById("main-right-bar");
    makeList(leftBar, "left");
    makeList(rightBar, "right");

    leftRollingRoop();
    rightRollingRoop();

    addMouseover(leftBar,rightBar);
}
