const freeze = (object) => Object.freeze(object);

export const NEWS_COUNT = 24;

export const VIEW_TYPE = freeze({
  GRID: "grid",
  LIST: "list",
});

export const THEME = freeze({
  LIGHT: "light",
  DARK: "dark",
});

export const CATEGORIES = freeze([
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
]);

export const CATEGORIES_TO_INDEX = freeze(
  CATEGORIES.reduce((acc, curr, idx) => {
    acc[curr] = idx;
    return acc;
  }, {})
);
