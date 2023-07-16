import { MAX_GRID_PAGE_NUM, PAGINATION_UNIT } from "../config.js";
import { categorize, shuffle } from "./helpers.js";
const COMPANIES_URL = "./src/data/companies.json";
const RECENT_NEWS_URL = "./src/data/recent-news.json";
/**
 * url로 데이터를 요청합니다.
 * @param { string } url 요청할 url을 설정합니다.
 * @param { Object } [options] fetch API의 options을 설정합니다.
 * @param { Function } [callback] 받아온 데이터를 가공하는 callback 함수를 설정합니다.
 * @returns
 */
const customFetch = async (url, callback, options) => {
    try {
        const response = await fetch(url, options).then((res) => res.json());
        return callback ? callback(response) : response;
    }
    catch (err) {
        console.error(err);
    }
};
// DATABASE
const DB = {
    companies: null,
    recentNews: null,
    categories: null,
    categorizedCompanies: null,
};
/**
 * DB.companies에 데이터가 없으면 fetch하여 DB.companies에 저장합니다. 최초 1회만 실행합니다.
 */
export async function updateDBCompanies() {
    const data = await customFetch(COMPANIES_URL, shuffle);
    DB.companies = data.slice(0, PAGINATION_UNIT * MAX_GRID_PAGE_NUM);
}
/**
 * Grid Page를 위한 데이터를 반환합니다.
 * @param { number } idx
 * @returns { Company[] }
 */
export async function getGridPageData(idx) {
    if (DB.companies === null)
        await updateDBCompanies();
    return DB.companies.slice(PAGINATION_UNIT * idx, PAGINATION_UNIT * (idx + 1));
}
/**
 * List Page를 위한 데이터를 반환합니다.
 * @param { string } category
 * @param { number }idx
 * @returns
 */
export async function getListPageData(category, idx) {
    if (DB.companies === null)
        await updateDBCompanies();
    if (DB.categorizedCompanies === null) {
        DB.categorizedCompanies = categorize(DB.companies);
    }
    return DB.categorizedCompanies[category][idx];
}
export async function getDBLength() {
    if (DB.companies === null)
        await updateDBCompanies();
    return DB.companies.length;
}
export async function getCategories() {
    if (DB.companies === null)
        await updateDBCompanies();
    if (DB.categories)
        return DB.categories;
    // DB.categories = categorize(DB.companies!);
    const categorizedData = categorize(DB.companies);
    return Object.keys(categorizedData).map((key) => ({
        name: key,
        amount: categorizedData[key].length,
    }));
    // return Object.keys(DB.companies.map((company) => company.category));
}
