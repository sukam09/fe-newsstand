import { MESSAGE } from "../utils/constant.js";

class ViewState {
  constructor() {
    this.view = {
      navTab: {
        MY_PUBLISHER: false,
        ALL_PUBLISHER: true,
      },
      user: {
        grid: true,
        list: false,
      },
    };
  }

  setNavTabView(currentView, status) {
    currentView === MESSAGE.MY_PUBLISHER
      ? this.focusMySubscribeView(status)
      : this.focusAllPublisherView(status);
  }

  setUserView(current) {
    current === "list" ? this.focusListView() : this.focusGridView();
  }

  getNavTabView() {
    return Object.keys(this.view.navTab).find(
      (key) => this.view.navTab[key] === true
    );
  }

  getUserView() {
    return Object.keys(this.view.user).find(
      (key) => this.view.user[key] === true
    );
  }

  focusMySubscribeView(status) {
    this.view.navTab.MY_PUBLISHER = status;
    this.view.navTab.ALL_PUBLISHER = !status;
  }
  focusAllPublisherView(status) {
    this.view.navTab.MY_PUBLISHER = !status;
    this.view.navTab.ALL_PUBLISHER = status;
  }
  focusListView() {
    this.view.user.list = true;
    this.view.user.grid = false;
  }
  focusGridView() {
    this.view.user.list = false;
    this.view.user.grid = true;
  }
}

export const View = new ViewState();
