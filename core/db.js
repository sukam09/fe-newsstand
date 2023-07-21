/**
 * @typedef {Object} MainNews
 * @property {string} thumbnail
 * @property {string} title
 */

/**
 * @typedef {Object} newsData
 * @property {string} name
 * @property {string} src
 * @property {string} category
 * @property {string} edit_date
 * @property {MainNews} main_news
 * @property {string[]} sub_news
 */

class NewsDatabase {
  #instance = null;
  #instanceMapByCategory = null;
  #instanceMapByName = null;

  /**
   * @param {newsData[]} data
   */
  set instance(data) {
    if (this.#instance) return;

    this.#instance = data;
    this.#instanceMapByCategory = this.#createCategoryMap();
    this.#instanceMapByName = this.#createNameMap();
  }

  getNewsData() {
    return this.#instance;
  }

  getNewsDataMapByCategory() {
    return this.#instanceMapByCategory;
  }

  getNewsOneByName(name) {
    return this.#instanceMapByName.get(name);
  }

  getHeadlineData() {
    return [
      ...this.#instance[0]["sub_news"].slice(0, 5),
      ...this.#instance[1]["sub_news"].slice(0, 5),
    ];
  }

  queryByCategory(category) {
    return this.#instanceMapByCategory.get(category);
  }

  getCountByCategory(category) {
    return this.#instanceMapByCategory.get(category).length;
  }

  #createCategoryMap() {
    return this.#instance.reduce((acc, { category, ...rest }) => {
      if (!acc.has(category)) {
        acc.set(category, [rest]);
      } else {
        acc.get(category).push(rest);
      }

      return acc;
    }, new Map());
  }

  #createNameMap() {
    return this.#instance.reduce((acc, { name, ...rest }) => {
      acc.set(name, rest);
      return acc;
    }, new Map());
  }
}

export const NewsDB = new NewsDatabase();
