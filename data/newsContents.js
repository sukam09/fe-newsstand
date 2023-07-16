const rollingNewsContentLeft = [
  "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[2보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[3보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[4보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[5보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
];
const rollingNewsContentRight = [
  "[속보1] 與최고위원 본경선, 김병민·김용태·김재원·민영삼",
  "[속보2] 與최고위원 본경선, 김병민·김용태·김재원·민영삼",
  "[속보3] 與최고위원 본경선, 김병민·김용태·김재원·민영삼",
  "[속보4] 與최고위원 본경선, 김병민·김용태·김재원·민영삼",
  "[속보5] 與최고위원 본경선, 김병민·김용태·김재원·민영삼",
];

const categoryList = [
  {
    id: 1,
    categoryName: "종합/경제",
    data: [
      {
        logoSrc: "./assets/light/img1.svg",
        name: "YTN 사이언스",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail.png",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
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
            title: "'포르쉐 의혹' 박영수 혐의 부인···\"잘못된 처신 죄송\"",
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
        logoSrc: "./assets/light/img2.svg",
        name: "Able뉴스",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail2.png",
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
        logoSrc: "./assets/light/img3.svg",
        name: "뉴스토마토",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail3.png",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
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
    tabs: 3,
  },
  {
    id: 2,
    categoryName: "방송/통신",
    data: [
      {
        logoSrc: "./assets/light/img4.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail.png",
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
        logoSrc: "./assets/light/img5.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail2.png",
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
        logoSrc: "./assets/light/img6.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail3.png",
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
        logoSrc: "./assets/light/img7.svg",
        name: "씨네21",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail.png",
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
    tabs: 4,
  },
  {
    id: 3,
    categoryName: "IT",
    data: [
      {
        logoSrc: "./assets/light/img8.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail2.png",
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
        logoSrc: "./assets/light/img9.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail3.png",
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
        logoSrc: "./assets/light/img10.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail.png",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "SM 인수 하이브, 카카오 등장에 '닭 쫓던 개'",
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
        logoSrc: "./assets/light/img11.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail2.png",
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
    tabs: 3,
  },
  {
    id: 4,
    categoryName: "영자지",
    data: [
      {
        logoSrc: "./assets/light/img12.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail3.png",
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
        logoSrc: "./assets/light/img13.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail.png",
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
        logoSrc: "./assets/light/img14.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail2.png",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "SM 인수 하이브, 카카오 등장에 '닭 쫓던 개'",
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
        logoSrc: "./assets/light/img15.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail3.png",
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
    tabs: 4,
  },
  {
    id: 5,
    categoryName: "스포츠/연예",
    data: [
      {
        logoSrc: "./assets/light/img16.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail.png",
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
        logoSrc: "./assets/light/img1.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail2.png",
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
        logoSrc: "./assets/light/img12.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail3.png",
        mainTitle: "[단독]양평군, '국토부안'에 끝까지 미온적이었다",
        subTitleList: [
          {
            title: "SM 인수 하이브, 카카오 등장에 '닭 쫓던 개'",
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
        logoSrc: "./assets/light/img13.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail.png",
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
    tabs: 3,
  },
  {
    id: 6,
    categoryName: "매거진/전문지",
    data: [
      {
        logoSrc: "./assets/light/img1.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail2.png",
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
        logoSrc: "./assets/light/img2.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail3.png",
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
        logoSrc: "./assets/light/img3.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail.png",
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
        logoSrc: "./assets/light/img4.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail2.png",
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
    tabs: 4,
  },
  {
    id: 7,
    categoryName: "지역",
    data: [
      {
        logoSrc: "./assets/light/img1.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail3.png",
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
        logoSrc: "./assets/light/img2.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail.png",
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
        logoSrc: "./assets/light/img3.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail2.png",
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
        logoSrc: "./assets/light/img4.svg",
        name: "아이뉴스24",
        editDate: "2023. 02. 10 18:27 편집",
        imgSrc: "/assets/others/Thumbnail3.png",
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
    tabs: 4,
  },
];

export { categoryList };
