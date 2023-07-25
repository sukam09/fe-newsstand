import { initState } from "../observer/observer.js";

const isDark = initState({
  key: "isDark",
  defaultState: false,
});

const isGridView = initState({
  key: "isGridView",
  defaultState: true,
});

const isSubView = initState({
  key: "isSubView",
  defaultState: false,
});

const subscribedPress = initState({
  key: "subscribedPress",
  defaultState: [],
});

const subListPageCount = initState({
  key: "subListPageCount",
  defaultState: 0,
});

const subGridPageCount = initState({
  key: "subGridPageCount",
  defaultState: 0,
});

const gridPageCount = initState({
  key: "gridPageCount",
  defaultState: 0,
});

const nowCategory = initState({
  key: "nowCategory",
  defaultState: "종합/경제",
});

const totalCategoryPages = initState({
  key: "totalCategoryPages",
  defaultState: {},
});

const categoryPageCount = initState({
  key: "categoryPageCount",
  defaultState: {},
});

const clickedUnsubPress = initState({
  key: "clickedUnsubPress",
  defaultState: {},
});


export {
  isDark,
  isGridView,
  isSubView,
  subGridPageCount,
  subListPageCount,
  subscribedPress,
  gridPageCount,
  nowCategory,
  totalCategoryPages,
  categoryPageCount,
  clickedUnsubPress,
};
