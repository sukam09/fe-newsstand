import { fetchData } from "../utils/index.js";

const categories = {
  "종합/경제": { id: 0 },
  "방송/통신": { id: 1 },
  IT: { id: 2 },
  영자지: { id: 3 },
  "스포츠/연예": { id: 4 },
  "매거진/전문지": { id: 5 },
  지역: { id: 6 },
};

const pressData = await fetchData("/src/data/press-data.json");

/** 데이터 필터링 */
Object.keys(categories).forEach((cate) => {
  categories[cate].press = pressData.filter((v) => v.category === cate);
});

Object.keys(categories).forEach((cate) => {
  categories[cate].press = categories[cate].press.sort(
    () => Math.random() - 0.5
  );
});

export default categories;
