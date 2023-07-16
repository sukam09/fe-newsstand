// usage: node datagenerator.js > data.json

const title = [
  "한국의 대통령, 국내 산업 발전을 위한 새로운 정책 발표",
  "국제 사회, 한반도 평화 정착을 위한 대화 촉진에 힘",
  "전 세계를 강타한 한류 열풍, 한국 문화의 글로벌 인기 지속",
  "기후 변화 대응, 한국의 녹색 에너지 전환 정책 강화",
  "한국의 의료 기술 혁신, 국제적으로 주목받다",
  "한국과 중국, 경제 협력 강화를 위한 새로운 협정 체결",
  "한국의 IT 산업, 혁신과 창조성으로 글로벌 시장 선도",
  "한국의 스타트업 열풍, 창업 생태계 활성화",
  "한국의 관광 업계, 새로운 코로나 대응 전략 수립",
  "한국의 연구 개발, 산학 협력 강화를 통한 혁신성장 추진",
  "한국의 영화 산업, 세계적인 인정과 수상에 빛나다",
  "한국의 금융 시장, 디지털화와 혁신으로 변화의 선도",
  "한국의 첨단 제조업, 스마트 팩토리 구축으로 생산성 향상",
  "한국의 교육 혁신, 창의적인 학습 방법으로 글로벌 경쟁력 강화",
  "한국의 신재생 에너지 산업, 확대된 정책 지원으로 성장세 유지",
  "한국의 식품 문화, 건강과 다양성을 반영한 글로벌 인기",
  "한국의 코로나19 대응, 모범 사례로 국제 사회에서 인정받다",
  "한국의 자동차 산업, 친환경 차량 생산 확대로 글로벌 시장 선도",
  "한국의 여성 리더십, 다양성과 평등 추구에 앞장서다",
  "한국의 스포츠 산업, 글로벌 플레이어로 도약하다",
  "한국의 음식 문화, 전 세계에서 사랑받는 맛의 여행",
  "한국의 인공지능 기술, 혁신과 미래를 열다",
  "한국의 플라스틱 감축 정책, 지속 가능한 환경 보호에 앞장",
  "한국의 모바일 게임 산업, 창조적인 콘텐츠로 글로벌 시장 독보",
  "한국의 음악 씬, 한류의 새로운 레지던스",
  "한국의 사이버 보안, 빠르게 진화하는 위협에 대응",
  "한국의 공공 건강 관리, 예방 중심의 혁신적인 정책 추진",
  "한국의 미디어 산업, 디지털 플랫폼 시대의 선두주자",
  "한국의 스마트 시티 구축, 효율적인 도시 관리의 표본",
  "한국의 블록체인 기술, 신뢰와 투명성을 위한 혁신",
  "한국의 미술 산업, 창의적인 예술 작품으로 세계를 감동시키다",
  "한국의 해양 산업, 바다의 자원을 지속 가능하게 관리",
  "한국의 고용 창출, 창조경제를 통한 일자리 창출 추진",
  "한국의 헬스케어 혁신, 디지털 건강 솔루션으로 더 나은 삶 제공",
  "한국의 사회복지 정책, 모든 시민을 위한 공평한 복지 추진",
  "한국의 체육 산업, 글로벌 스포츠 이벤트 개최에 도전",
  "한국의 도시재생 프로젝트, 역사와 현대가 어우러지는 도시 조성",
  "한국의 농업 혁신, 스마트팜과 첨단 기술로 농산물 생산성 향상",
  "한국의 인플루언서 산업, SNS 시대의 새로운 스타들",
  "한국의 자율 주행차 연구, 안전과 편의성을 위한 노력 지속",
  "한국의 지능형 건축, 스마트 도시 건설을 위한 혁신적인 디자인",
  "한국의 환경 보호 정책, 친환경 에너지로 미래를 지키다",
];

const category = [
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

const press = [
  "오마이뉴스",
  "데일리안",
  "헤럴드경제",
  "머니투데이",
  "세계일보",
  "아시아경제",
  "이데일리",
  "조선일보",
  "아이뉴스24",
  "파이낸셜뉴스",
  "스포츠서울",
  "스포츠동아",
  "석간문화일보",
  "KBS WORLD",
  "중앙데일리",
  "인사이트",
  "법률방송뉴스",
  "시사저널e",
  "여성경제신문",
  "조이뉴스24",
  "에너지경제",
  "비즈니스포스트",
  "스코어데일리",
  "KNN",
  "더코리아헤럴드",
  "MBC",
  "한국농어촌방송",
  "뉴데일리",
  "국민일보",
  "일간스포츠",
  "SBS BIZ",
  "ZD넷",
  "마이데일리",
  "경향신문",
  "SBS",
  "서울경제",
  "매일경제",
  "MBN",
  "YTN",
  "시사위크",
  "디지털투데이",
  "데이타뉴스",
  "한국대학신문",
  "서울파이낸스",
  "엑스포츠뉴스",
  "맥스무비",
  "OBS",
  "소년한국일보",
  "한국일보",
  "스포탈코리아",
  "프레시안",
  "노컷뉴스",
  "더중앙",
  "서울신문",
  "스포츠조선",
  "전자신문",
  "한국경제TV",
  "BLOTER",
  "KBS",
  "동아일보",
  "NEWSIS",
  "한국경제",
  "시사IN",
  "산",
  "독서신문",
  "ECONO TIMES",
  "TJB",
  "시사오늘 시사온",
  "데일리한국",
  "뉴스토마토",
  "에이블뉴스",
  "YTN 사이언스",
  "OSEN",
  "디지털타임스",
  "미디어오늘",
  "연합뉴스",
  "한겨레",
  "조선 BIZ",
  "JTBC",
  "METRO",
  "비즈한국",
  "주간경향",
  "FORBES",
  "TV REPORT",
  "티브이데일리",
  "BBS",
  "MONDE",
  "MK스포츠",
  "텐아시아",
  "정책브리핑",
  "씨네21",
  "뉴스타파",
  "뉴스포스트",
  "정신의학신문",
  "철강금속신문",
  "IT조선",
];

console.log(`[`);
for (let i = 0; i < 96; i += 7) {
  for (let j = 0; j < 7; j++) {
    console.log(`{
      "id": "${i + j + 1}",
      "name": "${press[i + j]}",
      "path-light": "/images/light-media/${i + j}.png",
      "path-dark": "/images/dark-media/${i + j}.png",
      "category": "${category[j]}",
      "edit-date": "2023.07.10. 18:${Math.floor(Math.random() * 49) + 10}",
      "main-title": "${title[(i + j) % 42]}",
      "main-img-src": "/images/${i + j}.png",
      "sub-title": ["${title[(i + j) % 36]}", "${
      title[((i + j) % 36) + 1]
    }", "${title[((i + j) % 36) + 2]}", "${title[((i + j) % 36) + 3]}", "${
      title[((i + j) % 36) + 4]
    }", "${title[((i + j) % 36) + 5]}", "${title[((i + j) % 36) + 6]}"],
      "is-subscribe": "false"
    },
      `);
  }
}
console.log(`]`);
