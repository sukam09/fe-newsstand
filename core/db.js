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

  /**
   * @param {newsData[]} data
   */
  set instance(data) {
    if (this.#instance) return;

    this.#instance = data;
    this.#instanceMapByCategory = this.#instance.reduce(
      (acc, { category, ...rest }) => {
        if (!acc.has(category)) {
          acc.set(category, [rest]);
        } else {
          acc.get(category).push(rest);
        }

        return acc;
      },
      new Map()
    );
  }

  getNewsData() {
    return this.#instance;
  }

  getNewsDataMapByCategory() {
    return this.#instanceMapByCategory;
  }

  getHeadlineData() {
    return [
      ...this.#instance[0]["sub_news"].slice(0, 5),
      ...this.#instance[1]["sub_news"].slice(0, 5),
    ];
  }
}

export const NewsDB = new NewsDatabase();
