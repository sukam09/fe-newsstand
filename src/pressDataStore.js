import { fetchpressNews } from "./dataFetch.js"

const allpressArr = await fetchpressNews();

class pressDataStore {
  #allpressArr
  #shuffledAllPress
  #shuffledAllPressNews
  #shuffledMyPressNews
  #shuffledAllPressNewsCategory
  #shuffledMyPressNewsCategory
  constructor(allpressArr) {
    this.#allpressArr = allpressArr;
    this.#setShuffledAllPress = this.#allpressArr
    this.#setShuffledAllPressNews = this.#shuffledAllPress
  }

  set #setShuffledAllPress(allpressArr) {
    this.#shuffledAllPress = [...allpressArr].sort(() => Math.random() - 0.5);
  }

  set #setShuffledAllPressNews(shuffledAllPress) {
    const categories = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문직", "지역"];
    const pressNewsList = categories.map(category => (
      shuffledAllPress.filter(press => press["category"] === category)));

    const shuffledAllPressNews = pressNewsList.map(newsList => (
      [...newsList].sort(() => Math.random() - 0.5)
    ));

    this.#shuffledAllPressNews = shuffledAllPressNews;
    this.#shuffledAllPressNewsCategory = categories;
  }

  get getAllpressArr() {
    return this.#allpressArr;
  }

  get getShuffledAllPress() {
    return this.#shuffledAllPress;
  }

  get getShuffledAllPressNews() {
    return this.#shuffledAllPressNews;
  }

  get getShuffledAllPressNewsCategory() {
    return this.#shuffledAllPressNewsCategory
  }
}

const pressStore = new pressDataStore(allpressArr);

export default pressStore