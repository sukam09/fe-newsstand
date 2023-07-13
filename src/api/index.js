import { MAX_PAGE_NUM, PAGINATION_UNIT } from "../config.js";
import { shuffle } from "./helpers.js";
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
    category: null,
};
/**
 * DB.companies에 데이터가 없으면 fetch하여 DB.companies에 저장합니다. 최초 1회만 실행합니다.
 */
export async function updateDBCompanies() {
    const data = await customFetch(COMPANIES_URL, shuffle);
    DB.companies = data.slice(0, PAGINATION_UNIT * MAX_PAGE_NUM);
}
