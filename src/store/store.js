import { initState } from "../observer/observer.js";

// export const isListActivate = (function () {
//   let instance;
//   let pages = false;
//   function init() {
//     return {
//       getPages: () => {
//         return pages;
//       },
//       setPages: (offset) => {
//         pages += offset;
//         return pages;
//       },
//     };
//   }
//   return {
//     getInstance: function () {
//       if (!instance) {
//         instance = init();
//       }
//       return instance;
//     },
//   };
// })();

const isListActivateState = initState({
  key: "isListActivateState",
  defaultValue: false,
});

const gridPageState = initState({
  key: "gridPageState",
  defaultValue: 0,
});

const listPageState = initState({
  key: "listPageState",
  defaultValue: 0,
});

const categoryState = initState({
  key: "categoryState",
  defaultValue: "",
});

export { isListActivateState, gridPageState, listPageState, categoryState };
