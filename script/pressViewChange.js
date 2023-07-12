function pressViewChange() {
    const pressListView = document.getElementById('pressbar-icon-list-view');
    const pressGridview = document.getElementById('pressbar-icon-grid-view');

    pressListView.addEventListener('click', () => {
        pressListView.childNodes[1].setAttribute("fill", "#4362D0");
        pressGridview.childNodes[1].setAttribute("fill", "#879298");
    })

    pressGridview.addEventListener('click', () => {
        pressListView.childNodes[1].setAttribute("fill", "#879298");
        pressGridview.childNodes[1].setAttribute("fill", "#4362D0");
    })
}

pressViewChange();