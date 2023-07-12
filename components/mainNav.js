let isGrid = true;
const grid_icon = document.querySelector(".nav-right_grid_icon");
const list_icon = document.querySelector(".nav-right_list_icon");
const main_grid_view = document.querySelector(".main-grid-view");
const main_list_view = document.querySelector(".main-list-view");

async function changeToGrid() {
    isGrid = true;
}

async function changeToList() {
    isGrid = false;
}

function changeView() {
    if (isGrid) {
        main_grid_view.style.display = "flex";
        main_list_view.style.display = "none";
        grid_icon.style.filter =
            "invert(49%) sepia(83%) saturate(5417%) hue-rotate(218deg) brightness(87%) contrast(85%)";
        list_icon.style.filter = "none";
    } else {
        main_grid_view.style.display = "none";
        main_list_view.style.display = "flex";
        list_icon.style.filter =
            "invert(49%) sepia(83%) saturate(5417%) hue-rotate(218deg) brightness(87%) contrast(85%)";
        grid_icon.style.filter = "none";
    }
}

function onClickIcon() {
    grid_icon.addEventListener("click", () => {
        changeToGrid().then(changeView);
    });

    list_icon.addEventListener("click", () => {
        changeToList().then(changeView);
    });
}

export function renderMainNav() {
    onClickIcon();
}
