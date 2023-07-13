```bash
├── assets
│   ├── data
│   │   ├── newsTitle.json (헤드라인 뉴스 자동롤링 구현 시 필요한 데이터)
│   │   └── newspaperSrc.json (언론사 그리드 뷰에서 필요한 데이터)
│   └── images
│       ├── pressLogo
│       │   ├── dark (다크모드에서 사용하는 언론사 이미지)
│       │   └── light (라이트모드에서 사용하는 언론사 이미지)
│       └── symbols (언론사 이미지를 제외하고 사용하는 여러 심볼 이미지)
├── css
│   ├── header (헤더에서 사용하는 css)
│   │   └── header.css
│   ├── newsbar (자동롤링 구현 시 사용하는 css)
│   │   └── rolling.css
│   ├── pressContent (언론사 그리드/리스트 뷰 구현 시 사용하는 css)
│   │   └── pressContent.css
│   └── style.css (공통으로 사용하는 css)
├── index.html (메인 html 파일)
├── readme.md
├── script
│   ├── app.js (html 파일과 이어주는 js파일)
│   ├── header (헤더에서 사용하는 js)
│   │   └── showTodayDate.js
│   ├── newsbar (자동롤링 구현 시 사용하는 js)
│   │   └── rolling.js
│   └── pressContent (언론사 그리드/리스트 뷰 구현 시 사용하는 js)
│       ├── pressGridList.js
│       └── pressViewChange.js
└── utils (범용성을 고려해 다른 프로젝트에서도 사용할 수 있는 파일)
    ├── css 
    │   └── reset.css (css 초기화 파일)
    └── js
        ├── getElements.js (원하는 요소를 얻을 수 있는 함수 재구조화)
        └── getJson.js (fetch를 이용해 데이터를 주고 받는 js파일)
```
