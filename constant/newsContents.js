const rollingNewsContentLeft = [
  "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[2보] 서울 지하철요금 10월 150원 오른다…버스 8월 300원↑",
  "[3보] 이재명 “양평 의혹, 답하라”하자···원희룡 일타강사 本",
  "[단독] '이재명 대표 '선당후사' 필요' 민주 상임고문들",
  "[5보] 윤 대통령 'NATO 우크라이나 신탁기금 참여 예정'",
];
const rollingNewsContentRight = [
  "[속보1] 군 검찰, ‘군사기밀 유출 혐의’ 부승찬 전 국방부",
  "[속보2] 與최고위원 본경선, 김병민·김용태·김재원·민영삼",
  "[속보3] 삼성동 현대百 7중충돌, 주차요원 위독…80대 운전자",
  "[속보4] '세금으로 방류 홍보 vs 與 괴담 피해는 국민",
  "[속보5] '7층 더 높여 21층 짓겠다' 한남2 수주한 대우건설",
];

const categoryList = [
  {
    id: 1,
    categoryName: "종합/경제",
    data: [
      {
        logoSrc: "./assets/logo/light/img1.svg",
        name: "YTN 사이언스",
        imgSrc:
          "https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202211/24/catlab/20221124080217131azjg.jpg",
        mainTitle: "[단독]양평군, '국 토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },

          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "서울 지하철요금 10월 150원 오른다…버스 8월 300원↑",
            link: "",
          },
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img2.svg",
        name: "Able뉴스",
        imgSrc:
          "https://mml.pstatic.net/www/mobile/edit/20230706_1095/upload_1688629051112X1Ks8.gif",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "韓 작년 경제규모 '톱10' 유지 실패···13위 추정",
            link: "",
          },
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title: "韓 작년 경제규모 '톱10' 유지 실패···13위 추정",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img3.svg",
        name: "뉴스토마토",
        imgSrc:
          "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
        mainTitle: "[단독]이 강아지 귀엽다 발언..",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },

          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "방통심의위, 제주 4·3 사건 역사왜곡 논란 TV조선에 행정지도",
            link: "",
          },
          {
            title: "韓 작년 경제규모 '톱10' 유지 실패···13위 추정",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title:
              "[영상] 박찬대 “김부겸·정동균 땅? 김건희 일가 땅 덮을 수 있다 믿나?”",
            link: "",
          },
        ],
      },
    ],
    tabs: 81,
  },
  {
    id: 2,
    categoryName: "방송/통신",
    data: [
      {
        logoSrc: "./assets/logo/light/img4.svg",
        name: "아이뉴스24",
        imgSrc:
          "https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525081724428qquq.jpg",
        mainTitle:
          "윤석년 KBS 이사 해임 건의하기로... 방통위 “KBS 명예 실추시켜”",
        subTitleList: [
          {
            title:
              "KBS 사장 “공익적 프로그램 축소 및 폐지가 불가피” 대국민 호소문 발",
            link: "",
          },
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title:
              "KBS노조 “법카 이해 못할 지출”… 남 이사장 “공개된 내용을 호도”",
            link: "",
          },
          {
            title: "정부 오염수 유튜브 유료 광고 논란 “세금으로 홍보하나”",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img5.svg",
        name: "아이뉴스24",
        imgSrc:
          "https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202211/24/catlab/20221124080217131azjg.jpg",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: "국민 47.7% '우리 농업의 가장 큰 문제는 일손 부족'",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img6.svg",
        name: "아이뉴스24",
        imgSrc:
          "https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title:
              "北朝鮮、「ＩＣＢＭ級」発射 過去最長７４分飛行、北海道沖落下",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title:
              "北朝鮮、「ＩＣＢＭ級」発射 過去最長７４分飛行、北海道沖落下",
            link: "",
          },
          {
            title: "岸田首相「断じて容認できず」 北朝鮮弾道ミサイル",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img7.svg",
        name: "씨네21",
        imgSrc:
          "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG",
        mainTitle: '"주택 거래 늘어"…가계대출 3개월째 증가',
        subTitleList: [
          {
            title:
              "[인터뷰] 디아블로 세계관에 뱀파이어가? 개발진이 말하는 '혈기사'는",
            link: "",
          },
          {
            title:
              "[현장] 조주완 LG전자 비주력사업 정리, 당분간 없다…플러스 경영할",
            link: "",
          },
          {
            title: "시간당 50mm 집중호우…아파트도 못 버틴다",
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
    ],
    tabs: 24,
  },
  {
    id: 3,
    categoryName: "IT",
    data: [
      {
        logoSrc: "./assets/logo/light/img8.svg",
        name: "아이뉴스24",
        imgSrc:
          "https://www.palnews.co.kr/news/photo/201801/92969_25283_5321.jpg",
        mainTitle: "사실 고양이도 귀엽다...",
        subTitleList: [
          {
            title:
              "KBS 사장 “공익적 프로그램 축소 및 폐지가 불가피” 대국민 호소문 발",
            link: "",
          },
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title:
              "KBS노조 “법카 이해 못할 지출”… 남 이사장 “공개된 내용을 호도”",
            link: "",
          },
          {
            title: "정부 오염수 유튜브 유료 광고 논란 “세금으로 홍보하나”",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img9.svg",
        name: "아이뉴스24",
        imgSrc:
          "https://m.segye.com/content/image/2021/06/18/20210618504877.jpg",
        mainTitle: "나만 없어 고양이",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: "大谷は三振と四球 千賀は登板なし―米大リーグ球宴",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img10.svg",
        name: "아이뉴스24",
        imgSrc:
          "https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202211/24/catlab/20221124080217131azjg.jpg",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title:
              "北朝鮮、「ＩＣＢＭ級」発射 過去最長７４分飛行、北海道沖落下",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title:
              "北朝鮮、「ＩＣＢＭ級」発射 過去最長７４分飛行、北海道沖落下",
            link: "",
          },
          {
            title: "岸田首相「断じて容認できず」 北朝鮮弾道ミサイル",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img11.svg",
        name: "아이뉴스24",
        imgSrc:
          "https://www.dailygaewon.com/news/photo/202105/11330_11828_3159.jpg",
        mainTitle: '"주택 거래 늘어"…가계대출 3개월째 증가',
        subTitleList: [
          {
            title:
              "[인터뷰] 디아블로 세계관에 뱀파이어가? 개발진이 말하는 '혈기사'는",
            link: "",
          },
          {
            title:
              "[현장] 조주완 LG전자 비주력사업 정리, 당분간 없다…플러스 경영할",
            link: "",
          },
          {
            title: "시간당 50mm 집중호우…아파트도 못 버틴다",
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
    ],
    tabs: 10,
  },
  {
    id: 4,
    categoryName: "영자지",
    data: [
      {
        logoSrc: "./assets/logo/light/img12.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/536/354",
        mainTitle:
          "윤석년 KBS 이사 해임 건의하기로... 방통위 “KBS 명예 실추시켜”",
        subTitleList: [
          {
            title:
              "KBS 사장 “공익적 프로그램 축소 및 폐지가 불가피” 대국민 호소문 발",
            link: "",
          },
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title:
              "KBS노조 “법카 이해 못할 지출”… 남 이사장 “공개된 내용을 호도”",
            link: "",
          },
          {
            title: "정부 오염수 유튜브 유료 광고 논란 “세금으로 홍보하나”",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img13.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/536/354",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: "大谷は三振と四球 千賀は登板なし―米大リーグ球宴",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img14.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/533/354",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title:
              "北朝鮮、「ＩＣＢＭ級」発射 過去最長７４分飛行、北海道沖落下",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title:
              "北朝鮮、「ＩＣＢＭ級」発射 過去最長７４分飛行、北海道沖落下",
            link: "",
          },
          {
            title: "岸田首相「断じて容認できず」 北朝鮮弾道ミサイル",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img15.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/533/354",
        mainTitle: '"주택 거래 늘어"…가계대출 3개월째 증가',
        subTitleList: [
          {
            title:
              "[인터뷰] 디아블로 세계관에 뱀파이어가? 개발진이 말하는 '혈기사'는",
            link: "",
          },
          {
            title:
              "[현장] 조주완 LG전자 비주력사업 정리, 당분간 없다…플러스 경영할",
            link: "",
          },
          {
            title: "시간당 50mm 집중호우…아파트도 못 버틴다",
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
    ],
    tabs: 30,
  },
  {
    id: 5,
    categoryName: "스포츠/연애",
    data: [
      {
        logoSrc: "./assets/logo/light/img16.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/536/354",
        mainTitle:
          "윤석년 KBS 이사 해임 건의하기로... 방통위 “KBS 명예 실추시켜”",
        subTitleList: [
          {
            title: "정부 오염수 유튜브 유료 광고 논란 “세금으로 홍보하나”",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
          {
            title:
              "KBS 사장 “공익적 프로그램 축소 및 폐지가 불가피” 대국민 호소문 발",
            link: "",
          },
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title:
              "KBS노조 “법카 이해 못할 지출”… 남 이사장 “공개된 내용을 호도”",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img1.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/536/354",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: "大谷は三振と四球 千賀は登板なし―米大リーグ球宴",
            link: "",
          },

          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img12.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/533/354",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title:
              "北朝鮮、「ＩＣＢＭ級」発射 過去最長７４分飛行、北海道沖落下",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title:
              "北朝鮮、「ＩＣＢＭ級」発射 過去最長７４分飛行、北海道沖落下",
            link: "",
          },
          {
            title: "岸田首相「断じて容認できず」 北朝鮮弾道ミサイル",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img13.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/533/354",
        mainTitle: '"주택 거래 늘어"…가계대출 3개월째 증가',
        subTitleList: [
          {
            title:
              "[인터뷰] 디아블로 세계관에 뱀파이어가? 개발진이 말하는 '혈기사'는",
            link: "",
          },
          {
            title:
              "[현장] 조주완 LG전자 비주력사업 정리, 당분간 없다…플러스 경영할",
            link: "",
          },
          {
            title: "시간당 50mm 집중호우…아파트도 못 버틴다",
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
    ],
    tabs: 15,
  },
  {
    id: 6,
    categoryName: "매거진/전문지",
    data: [
      {
        logoSrc: "./assets/logo/light/img1.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/536/354",
        mainTitle:
          "윤석년 KBS 이사 해임 건의하기로... 방통위 “KBS 명예 실추시켜”",
        subTitleList: [
          {
            title:
              "KBS 사장 “공익적 프로그램 축소 및 폐지가 불가피” 대국민 호소문 발",
            link: "",
          },
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title:
              "KBS노조 “법카 이해 못할 지출”… 남 이사장 “공개된 내용을 호도”",
            link: "",
          },
          {
            title: "정부 오염수 유튜브 유료 광고 논란 “세금으로 홍보하나”",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img1.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/536/354",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: "大谷は三振と四球 千賀は登板なし―米大リーグ球宴",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img1.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/533/354",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title:
              "北朝鮮、「ＩＣＢＭ級」発射 過去最長７４分飛行、北海道沖落下",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title:
              "北朝鮮、「ＩＣＢＭ級」発射 過去最長７４分飛行、北海道沖落下",
            link: "",
          },
          {
            title: "岸田首相「断じて容認できず」 北朝鮮弾道ミサイル",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img1.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/533/354",
        mainTitle: '"주택 거래 늘어"…가계대출 3개월째 증가',
        subTitleList: [
          {
            title:
              "[인터뷰] 디아블로 세계관에 뱀파이어가? 개발진이 말하는 '혈기사'는",
            link: "",
          },
          {
            title:
              "[현장] 조주완 LG전자 비주력사업 정리, 당분간 없다…플러스 경영할",
            link: "",
          },
          {
            title: "시간당 50mm 집중호우…아파트도 못 버틴다",
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
    ],
    tabs: 21,
  },
  {
    id: 7,
    categoryName: "지역",
    data: [
      {
        logoSrc: "./assets/logo/light/img1.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/536/354",
        mainTitle:
          "윤석년 KBS 이사 해임 건의하기로... 방통위 “KBS 명예 실추시켜”",
        subTitleList: [
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title:
              "KBS노조 “법카 이해 못할 지출”… 남 이사장 “공개된 내용을 호도”",
            link: "",
          },
          {
            title: "정부 오염수 유튜브 유료 광고 논란 “세금으로 홍보하나”",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
          {
            title:
              "KBS 사장 “공익적 프로그램 축소 및 폐지가 불가피” 대국민 호소문 발",
            link: "",
          },
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img1.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/536/354",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title: "大谷は三振と四球 千賀は登板なし―米大リーグ球宴",
            link: "",
          },
          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img1.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/533/354",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "[단독]가락시장 공사 잡음···서울농수산공사 나몰라라?",
            link: "",
          },
          {
            title:
              "北朝鮮、「ＩＣＢＭ級」発射 過去最長７４分飛行、北海道沖落下",
            link: "",
          },
          {
            title: '"나 살려고 남 속이라니"···전세사기 피해자들 절규',
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title:
              "北朝鮮、「ＩＣＢＭ級」発射 過去最長７４分飛行、北海道沖落下",
            link: "",
          },
          {
            title: "岸田首相「断じて容認できず」 北朝鮮弾道ミサイル",
            link: "",
          },
        ],
      },
      {
        logoSrc: "./assets/logo/light/img1.svg",
        name: "아이뉴스24",
        imgSrc: "https://picsum.photos/533/354",
        mainTitle: '"주택 거래 늘어"…가계대출 3개월째 증가',
        subTitleList: [
          {
            title:
              "[인터뷰] 디아블로 세계관에 뱀파이어가? 개발진이 말하는 '혈기사'는",
            link: "",
          },
          {
            title:
              "[현장] 조주완 LG전자 비주력사업 정리, 당분간 없다…플러스 경영할",
            link: "",
          },
          {
            title: "시간당 50mm 집중호우…아파트도 못 버틴다",
            link: "",
          },
          {
            title: "새마을금고 논란···힘받는 예금자보호 상향 논의",
            link: "",
          },
          {
            title: "주차시비 여성 폭행한 전직 보디빌더···구속 피했다",
            link: "",
          },
          {
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
            link: "",
          },
        ],
      },
    ],
    tabs: 8,
  },
];
