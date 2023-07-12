function pressViewChange() {
    const pressListView = document.getElementById('pressbar-icon-list-view');
    const pressGridView = document.getElementById('pressbar-icon-grid-view');

    pressListView.addEventListener('click', () => {
        pressListView.childNodes[1].setAttribute("fill", "#4362D0");
        pressGridView.childNodes[1].setAttribute("fill", "#879298");
        showPressView("list");
    });

    pressGridView.addEventListener('click', () => {
        pressListView.childNodes[1].setAttribute("fill", "#879298");
        pressGridView.childNodes[1].setAttribute("fill", "#4362D0");
        showPressView("grid");
    });
}

function showPressView(status) {
    const pressContentContainer = document.getElementsByClassName("press-content-view");
    const pressContentListView = document.getElementsByClassName("press-content-list-view");

    if(status === "list") {
        pressContentContainer[0].style.display = "none";
        pressContentListView[0].style.display = "block";
    }

    else {
        pressContentContainer[0].style.display = "grid";
        pressContentListView[0].style.display = "none";
    }
    
}



export {pressViewChange};
