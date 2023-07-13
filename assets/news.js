import { press } from "../assets/press.js";

const category = [
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

const news_by_category = {
  "종합/경제": [],
  "방송/통신": [],
  IT: [],
  영자지: [],
  "스포츠/연예": [],
  "매거진/전문지": [],
  지역: [],
};

const media_0 = press.slice(0, 20); //20
const media_1 = press.slice(20, 25); //5
const media_2 = press.slice(25, 37); //12
const media_3 = press.slice(37, 60); //23
const media_4 = press.slice(60, 73); //13
const media_5 = press.slice(73, 80); //7
const media_6 = press.slice(80, 94); //6

media_0.forEach((media) => {
  news_by_category["종합/경제"].push({
    name: media.name,
    src: media.lightSrc,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:11",
    thumbSrc: "../images/light/img1.svg",
    headTitle: "또 국민연금의 몽니...111",
    subTitle: [
      "위스키 사려고 전부터..11",
      "방시혁 제국이냐...11",
      "사용후핵연료...11",
      "원희룡...11",
      "태평양에는...11",
      "LG엔솔...11",
    ],
    copyRight: "서울경제 언론사에서 직접 편집한 뉴스입니다.",
  });
});

media_1.forEach((media) => {
  news_by_category["방송/통신"].push({
    name: media.name,
    src: media.lightSrc,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:22",
    thumbSrc: "../images/light/img2.svg",
    headTitle: "또 국민연금의 몽니...222",
    subTitle: [
      "위스키 사려고 전부터..22",
      "방시혁 제국이냐...22",
      "사용후핵연료...22",
      "원희룡...22",
      "태평양에는...22",
      "LG엔솔...22",
    ],
    copyRight: "서울경제 언론사에서 직접 편집한 뉴스입니다.2222",
  });
});
media_2.forEach((media) => {
  news_by_category["IT"].push({
    name: media.name,
    src: media.lightSrc,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:33",
    thumbSrc: "../images/light/img3.svg",
    headTitle: "또 국민연금의 몽니...333",
    subTitle: [
      "위스키 사려고 전부터..33",
      "방시혁 제국이냐...33",
      "사용후핵연료...33",
      "원희룡...33",
      "태평양에는...33",
      "LG엔솔...33",
    ],
    copyRight: "서울경제 언론사에서 직접 편집한 뉴스입니다.3333",
  });
});
media_3.forEach((media) => {
  news_by_category["영자지"].push({
    name: media.name,
    src: media.lightSrc,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:444",
    thumbSrc: "../images/light/img4.svg",
    headTitle: "또 국민연금의 몽니...444",
    subTitle: [
      "위스키 사려고 전부터..4",
      "방시혁 제국이냐...44",
      "사용후핵연료...44",
      "원희룡...44",
      "태평양에는...44",
      "LG엔솔...44",
    ],
    copyRight: "서울경제 언론사에서 직접 편집한 뉴스입니다.4444",
  });
});
media_4.forEach((media) => {
  news_by_category["스포츠/연예"].push({
    name: media.name,
    src: media.lightSrc,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:55",
    thumbSrc: "../images/light/img5.svg",
    headTitle: "또 국민연금의 몽니...555",
    subTitle: [
      "위스키 사려고 전부터..55",
      "방시혁 제국이냐...55",
      "사용후핵연료...55",
      "원희룡...55",
      "태평양에는...55",
      "LG엔솔...55",
    ],
    copyRight: "서울경제 언론사에서 직접 편집한 뉴스입니다.5555",
  });
});
media_5.forEach((media) => {
  news_by_category["매거진/전문지"].push({
    name: media.name,
    src: media.lightSrc,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:66",
    thumbSrc: "../images/light/img6.svg",
    headTitle: "또 국민연금의 몽니...666",
    subTitle: [
      "위스키 사려고 전부터..66",
      "방시혁 제국이냐...66",
      "사용후핵연료...66",
      "원희룡...66",
      "태평양에는...66",
      "LG엔솔...66",
    ],
    copyRight: "서울경제 언론사에서 직접 편집한 뉴스입니다.6666",
  });
});
media_6.forEach((media) => {
  news_by_category["지역"].push({
    name: media.name,
    src: media.lightSrc,
    isSub: media.isSub,
    editDate: "2023. 02. 10 18:77",
    thumbSrc: "../images/light/img7.svg",
    headTitle: "또 국민연금의 몽니...7777",
    subTitle: [
      "위스키 사려고 전부터..777",
      "방시혁 제국이냐...777",
      "사용후핵연료...777",
      "원희룡...777",
      "태평양에는...777",
      "LG엔솔...777",
    ],
    copyRight: "서울경제 언론사에서 직접 편집한 뉴스입니다.6666",
  });
});

export { category, news_by_category };
