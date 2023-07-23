# FE-newsstand

소프티어 2기 news stand 프로젝트입니다.

## 파일 구조

```
├─ assets
│  ├─ icons
│  ├─ logo
│  └─ etc
├─ data
│  ├─ headlone.json
│  ├─ news.json
│  └─ press.json
├─ modules
│  ├─ components
│  │  └─ ...
│  ├─ controller
│  │  └─ ...
│  ├─ store
│  │  └─ ...
│  ├─ app.js
│  └─ utils.js
├─ style
│  └─ ...
├─ server.js
└─ index.html
```

## MVC 패턴

Model(store)과 View(component)를 분리하고 중재하는 역할을 하는 controller를 정의하였습니다.

## 옵저버 패턴

Model이 변하면 그와 관련된 View를 변하도록 하는 옵저버 패턴을 적용하였습니다.
