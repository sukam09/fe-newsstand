import { MAX_GRID_PAGE_NUM, PAGINATION_UNIT, CATEGORY_OPTIONS, } from "../constant.js";
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
/**
 * 입력받은 배열 데이터를 shuffle하여 return 합니다.
 * customFetch의 callback 함수로 사용합니다.
 * @param {[]} data
 * @returns {[]}
 */
export function shuffle(data) {
    return data.sort(() => 0.5 - Math.random());
}
class NewsStore {
    // #company : [ Company, Company, Company, ... ]
    #company = [];
    // #category : { 종합/경제:[1,2,3,4,5,6,7,8,9,10], 방송/통신:[11,12,13,14,15,16,17,18,19,20], ... }
    #category = new Map();
    #subscribe = [];
    /**
     * DB.companies에 데이터가 없으면 fetch하여 DB.companies에 저장합니다. 최초 1회만 실행합니다.
     * 데이터의 개수가 Pagination Unit * Max Page Number보다 클 경우, Pagination Unit * Max Page Number만큼만 저장합니다.
     */
    async init() {
        const data = await customFetch(COMPANIES_URL, shuffle);
        this.#company = data.slice(0, PAGINATION_UNIT * MAX_GRID_PAGE_NUM);
        CATEGORY_OPTIONS.map((category) => this.#category?.set(category, []));
        this.#company?.forEach((com) => this.#category.get(com.category).push(com.id));
        const localStorageSubscribe = JSON.parse(window.localStorage.getItem("subscribe") ?? "[]");
        window.localStorage.removeItem("subscribe");
        localStorageSubscribe.forEach((id) => this.postSubscribeById(id, true));
        this.#subscribe = localStorageSubscribe.map((id) => this.getDataById({ id }).data[0]);
    }
    /**
     * id로 데이터를 찾아 반환합니다.
     * @param { id : number } param
     * @returns
     */
    getDataById({ id }) {
        const data = this.#company.find((company) => company.id === id);
        return { data: data ? [data] : [] };
    }
    /**
     * Grid Page를 위한 데이터를 반환합니다.
     * @param { number } idx
     * @returns { Company[] }
     */
    getGridPageData({ idx, subscribe = false, }) {
        const data = !subscribe ? this.#company : this.#subscribe;
        return {
            data: data.slice(PAGINATION_UNIT * idx, PAGINATION_UNIT * (idx + 1)),
            maxPage: Math.ceil(data.length / PAGINATION_UNIT),
        };
    }
    // /**
    //  * List Page를 위한 데이터를 반환합니다.
    //  * category로 필터링된 데이터가 없으면 필터링 후 저장하고, 있으면 저장된 데이터를 반환합니다.
    //  * @param { "종합/경제" | "방송/통신" | "IT" | "영자지" | "스포츠/연예" | "매거진/전문지" | "지역" } category
    //  * @param { number } idx
    //  * @returns
    //  */
    // getListPageData({
    //   category,
    //   idx,
    // }: {
    //   category: CategoryOptions;
    //   idx: number;
    // }) {
    //   if (this.#category === null) {
    //     this.#category = {};
    //   }
    //   if (!this.#category![category]) {
    //     this.#category![category] = this.#company
    //       ?.filter((company) => company.category === category)
    //       .map((company) => company.id);
    //   }
    //   return this.getDataById({ id: this.#category![category]![idx] });
    // }
    getListNavigationData({ subscribe = false }) {
        if (subscribe)
            return this.#subscribe?.map((company) => {
                return { id: company.id, name: company.name };
            });
        return [...this.#category].map(([category, id]) => {
            return {
                category: category,
                length: id.length,
            };
        });
    }
    getCategoryData({ category }) {
        return this.#category.get(category);
    }
    getRecentNews() {
        // #company에서 랜덤으로 하나의 company를 가져와 랜덤으로 article들을 가져옵니다.
        const company = this.#company[Math.floor(Math.random() * this.#company.length)];
        return Math.random() >= 0.99
            ? {
                company: company.name,
                articles: [
                    { title: company.mainArticle.title, url: company.mainArticle.url },
                ],
            }
            : {
                company: company.name,
                articles: [
                    ...company.subArticles.slice(0, Math.floor(Math.random() * 6) + 1),
                ],
            };
    }
    getSubscribeList() {
        // 기존
        // return this.#company
        //   ?.filter((company) => company.subscribe)
        //   .map((company) => company.id);
        // 수정
        // 구독 순서를 보장하기 위해서는 subscribe된 기사들을 따로 저장해야 합니다.
        return this.#subscribe?.map((company) => company.id);
    }
    postSubscribeById(id, subscribe) {
        this.#company.find((company) => company.id === id).subscribe = subscribe;
        const originSubscribe = JSON.parse(window.localStorage.getItem("subscribe") ?? "[]");
        const newSubscribe = subscribe
            ? [...originSubscribe, id]
            : originSubscribe.filter((originId) => originId !== id);
        window.localStorage.setItem("subscribe", JSON.stringify(newSubscribe));
        if (subscribe) {
            this.#subscribe?.push(this.getDataById({ id }).data[0]);
        }
        else {
            this.#subscribe = this.#subscribe?.filter((company) => company.id !== id);
            console.log(this.#subscribe);
        }
    }
}
const newsStore = new NewsStore();
export default newsStore;
