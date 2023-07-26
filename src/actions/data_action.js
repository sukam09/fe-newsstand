import {
    fetchPressData,
    fetchNewsData,
    fetchHotTopicData,
} from "../utils/fetch_util.js";
/**
 * @description
 * 1. 데이터를 저장한다.
 * 2. 파라미터로 옵션을 받아서 다양한 데이터를 저장하여 확장성을 높인다.
 * @param {*} options
 * @returns {Object} data
 */
export async function save() {
    const data = {};
    try {
        data["press_data"] = await fetchPressData();
        data["news_data"] = await fetchNewsData();
        data["hot_topic_data"] = await fetchHotTopicData();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    return data;
}
