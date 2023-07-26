import {
    fetchPressData,
    fetchNewsData,
    fetchHotTopicData,
} from "../utils/fetch_util.js";

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
