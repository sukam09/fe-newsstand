import light_media from "./light-media.js";
const category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];

const news_by_category = {
  "종합/경제": [],
  "방송/통신": [],
  IT: [],
  영자지: [],
  "스포츠/연예": [],
  "매거진/전문지": [],
  지역: [],
};

const media_0 = light_media.slice(0, 20); //20
const media_1 = light_media.slice(20, 25); //5
const media_2 = light_media.slice(25, 37); //12
const media_3 = light_media.slice(37, 60); //23
const media_4 = light_media.slice(60, 73); //13
const media_5 = light_media.slice(73, 80); //7
const media_6 = light_media.slice(80, 94); //6

media_0.forEach(media => {
  news_by_category["종합/경제"].push({
    name: media.name,
    src: media.src,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:27",
    thumbSrc: "../img/Thumbnail.png",
    headTitle: "또 국민연금의 몽니...",
    subTitle: ["위스키 사려고 전부터..", "방시혁 제국이냐...", "사용후핵연료...", "원희룡...", "태평양에는...", "LG엔솔..."],
  });
});

media_1.forEach(media => {
  news_by_category["방송/통신"].push({
    name: media.name,
    src: media.src,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:27",
    thumbSrc: "../img/Thumbnail.png",
    headTitle: "또 국민연금의 몽니1...",
    subTitle: ["위스키 사려고 전부터..", "방시혁 제국이냐...", "사용후핵연료...", "원희룡...", "태평양에는...", "LG엔솔..."],
  });
});
media_2.forEach(media => {
  news_by_category["IT"].push({
    name: media.name,
    src: media.src,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:27",
    thumbSrc: "../img/Thumbnail.png",
    headTitle: "또 국민연금의 몽니2...",
    subTitle: ["위스키 사려고 전부터..", "방시혁 제국이냐...", "사용후핵연료...", "원희룡...", "태평양에는...", "LG엔솔..."],
  });
});
media_3.forEach(media => {
  news_by_category["영자지"].push({
    name: media.name,
    src: media.src,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:27",
    thumbSrc: "../img/Thumbnail.png",
    headTitle: "또 국민연금의 몽니3...",
    subTitle: ["위스키 사려고 전부터..", "방시혁 제국이냐...", "사용후핵연료...", "원희룡...", "태평양에는...", "LG엔솔..."],
  });
});
media_4.forEach(media => {
  news_by_category["스포츠/연예"].push({
    name: media.name,
    src: media.src,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:27",
    thumbSrc: "../img/Thumbnail.png",
    headTitle: "또 국민연금의 몽니4...",
    subTitle: ["위스키 사려고 전부터..", "방시혁 제국이냐...", "사용후핵연료...", "원희룡...", "태평양에는...", "LG엔솔..."],
  });
});
media_5.forEach(media => {
  news_by_category["매거진/전문지"].push({
    name: media.name,
    src: media.src,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:27",
    thumbSrc: "../img/Thumbnail.png",
    headTitle: "또 국민연금의 몽니5...",
    subTitle: ["위스키 사려고 전부터..", "방시혁 제국이냐...", "사용후핵연료...", "원희룡...", "태평양에는...", "LG엔솔..."],
  });
});
media_6.forEach(media => {
  news_by_category["지역"].push({
    name: media.name,
    src: media.src,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:27",
    thumbSrc: "../img/Thumbnail.png",
    headTitle: "또 국민연금의 몽니6...",
    subTitle: ["위스키 사려고 전부터..", "방시혁 제국이냐...", "사용후핵연료...", "원희룡...", "태평양에는...", "LG엔솔..."],
  });
});

export { category, news_by_category };
