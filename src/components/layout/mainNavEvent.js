import { progress_bar_info } from "../list/progressBarEvent.js";

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
            progress_bar_info.removeInterval();
            main_grid_view.style.display = "flex";
            main_list_view.style.display = "none";
            grid_icon.style.filter =
                "invert(49%) sepia(83%) saturate(5417%) hue-rotate(218deg) brightness(87%) contrast(85%)";
            list_icon.style.filter = "none";
        } else {
            // 리스트 뷰
            progress_bar_info.initProgressBar({ category_old: 1, category_now: 1, page_num: 1 });
            main_grid_view.style.display = "none";
            main_list_view.style.display = "flex";
            list_icon.style.filter =
                "invert(49%) sepia(83%) saturate(5417%) hue-rotate(218deg) brightness(87%) contrast(85%)";
            grid_icon.style.filter = "none";
        }
    },
};

export function viewIconClickEvent() {
    this.is_grid_icon
        ? view_info.changeToGridView().then(() => {
              view_info.changeView();
          })
        : view_info.changeToListView().then(() => {
              view_info.changeView();
          });
}
