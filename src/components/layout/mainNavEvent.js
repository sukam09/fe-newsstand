import { removeInterval, initCategoryTab } from "../list/progressEvent.js";

const grid_icon = document.querySelector(".nav-right_grid_icon");
const list_icon = document.querySelector(".nav-right_list_icon");
const main_grid_view = document.querySelector(".main-grid-view");
const main_list_view = document.querySelector(".main-list-view");

const view_info = {
    is_grid_view: true,

    getIsGridView: function () {
        return this.is_grid_view;
    },

    changeToGridView: async function () {
        this.is_grid_view = true;
    },

    changeToListView: async function () {
        this.is_grid_view = false;
    },

    changeView: function () {
        const grid_icon = document.querySelector(".nav-right_grid_icon");
        const list_icon = document.querySelector(".nav-right_list_icon");
        const main_grid_view = document.querySelector(".main-grid-view");
        const main_list_view = document.querySelector(".main-list-view");

        if (this.is_grid_view) {
            // 그리드 뷰
            removeInterval();
            main_grid_view.style.display = "flex";
            main_list_view.style.display = "none";
            grid_icon.style.filter =
                "invert(49%) sepia(83%) saturate(5417%) hue-rotate(218deg) brightness(87%) contrast(85%)";
            list_icon.style.filter = "none";
        } else {
            // 리스트 뷰
            initCategoryTab();
            main_grid_view.style.display = "none";
            main_list_view.style.display = "flex";
            list_icon.style.filter =
                "invert(49%) sepia(83%) saturate(5417%) hue-rotate(218deg) brightness(87%) contrast(85%)";
            grid_icon.style.filter = "none";
        }
    },
};

export function viewIconClickEvent(is_grid_icon) {
    is_grid_icon
        ? view_info.changeToGridView().then(() => {
              view_info.changeView();
          })
        : view_info.changeToListView().then(() => {
              view_info.changeView();
          });
}
