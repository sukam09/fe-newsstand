import { fetchData } from "../utils/index.js";

const pressName = await fetchData("/src/data/newsName-data.json");

export default pressName;
