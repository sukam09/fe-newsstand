function pressViewChange() {
    const pressListView = document.getElementById('pressbar-icon-list-view');
    const pressGridview = document.getElementById('pressbar-icon-grid-view');

    pressListView.addEventListener('click', () => {
        pressListView.childNodes[1].setAttribute("fill", "#4362D0");
        pressGridview.childNodes[1].setAttribute("fill", "#879298");
        showPressView("list");
    });

    pressGridview.addEventListener('click', () => {
        pressListView.childNodes[1].setAttribute("fill", "#879298");
        pressGridview.childNodes[1].setAttribute("fill", "#4362D0");
        showPressView("grid");
    });
}

function showPressView(status) {
    console.log("hdhdhd");
    const pressContentContainer = document.getElementsByClassName("press-content-view");
    const pressContentListView = document.getElementsByClassName("press-content-list-view");

    if(status=="list") {
        pressContentContainer[0].style.display = "none";
        pressContentListView[0].style.display = "block";
    }

    else {
        pressContentContainer[0].style.display = "grid";
        pressContentListView[0].style.display = "none";
    }
    
}



export {pressViewChange};
