import { MAX_GRID_PAGE_NUM } from "../config.js";
/**
 * company 데이터 배열을 입력받아 pagination을 적용한 데이터 배열을 return 합니다.
 * @param {[]} data
 * @param {number} PAGINATION_NUM
 * @returns {[]}
 */
function pagination(data, PAGINATION_NUM) {
    const pages = [];
    let pageNumber = Math.min(Math.ceil(data?.length / PAGINATION_NUM), MAX_GRID_PAGE_NUM);
    for (let i = 0; i < pageNumber; i++) {
        pages.push(data.slice(i * PAGINATION_NUM, (i + 1) * PAGINATION_NUM));
    }
    return pages;
}
/**
 * 입력받은 배열 데이터를 shuffle하여 return 합니다.
 * @param {[]} data
 * @returns {[]}
 */
function shuffle(data) {
    return data.sort(() => 0.5 - Math.random());
}
/**
 * Company 데이터 배열을 입력받아 카테고리별로 분류한 데이터 배열을 return 합니다.
 * @param {[]} data
 * @returns {[]}
 */
function categorize(data) {
    const categorizedData = {};
    data.forEach((company) => {
        const category = company.category;
        if (categorizedData[category])
            categorizedData[category].push(company);
        else
            categorizedData[category] = [company];
    });
    return categorizedData;
}
export { pagination, shuffle, categorize };
