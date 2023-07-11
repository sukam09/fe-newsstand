import { getJSON } from "../util/util.js";
const setTopic = async () => {
  const mainTopic = await getJSON("../assets/data/mainTopic.json");

  const firstTopics = mainTopic.slice(0, mainTopic.length / 2);
  const secondTopics = mainTopic.slice(mainTopic.length / 2);

  const first = document.querySelector(".news_title_wrapper.first");
  const second = document.querySelector(".news_title_wrapper.second");

  first.innerHTML += getTopicHTML(firstTopics);
  second.innerHTML += getTopicHTML(secondTopics);
};

const getTopicHTML = (topics) => {
  return topics.map((topic, index) => {
    let className = "text-default available-medium14";
    if(index === 0) {
      className += " current";
    } else if(index === 1) {
      className += " next";
    } else if(index === topics.length - 1) {
      className += " prev";
    }
  return `
    <p class="${className}"><a>${topic.content}</a></p>
  `;
  }).join('');
};

const getTopicInit = () => {
  setTopic();
}

export default getTopicInit;