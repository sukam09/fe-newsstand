import { DATA_PATH } from "../constants/constants.js";

export async function getData(dataName) {
  try {
    const response = await fetch(`${DATA_PATH}${dataName}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
}
