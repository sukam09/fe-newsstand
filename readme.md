# 📌 TODO

목표 : 하나의 index.html파일에 js DOM API를 이용하여 news stand를 완성한다.

## 2주차 설계

- 롤링 (2p)

  - JS

    - 타이머 기능 구현 (5초)
    - 시간 차 기능 구현

  - CSS
  - 애니메이션 구현
    - `.auto-rolling-news` : css 추가
  - hover 시 멈춤, 밑줄 표시
    - 리스너 `hover` 시 클래스 추가
      - `.hover-latestNews`: 밑줄, 롤링 제거

<br />

- 리스트보기 (5p)

  - 아이콘 클릭 시 컴포넌트 변경
  - 구조 설계

    - AllCategories
    - Category

      - 인자: 언론사 개수, 현재 순서
      - 타이머 설계 (20초) 다음으로 넘어감
      - 애니메이션: 프로그레스바

    - NewsDetail
      - 구조 설계
        - 인자: 언론사 네임 (이미지 출력), 편집 날짜, 메인 뉴스, 뉴스 리스트
      - 새로고침 시 랜덤 출력
      - 버튼 기능 구현

추가 구현

1. 폰트 적용
2. css 모듈화

## 📌 규칙

1. 폴더 구조 만들기

- [ ] src 폴더: js 로직 및 필요한 이미지를 관리하는 폴더
- [ ] commponent 폴더: js 컴포넌트 로직 관리
- [ ] header 폴더: 헤더 태그 컴포넌트 관리
- [ ] lastestNews 폴더: 최신 뉴스 컴포넌트 관리
- [ ] allNews 폴더: 전체 언론사 컴포넌트 관리
- [ ] common 폴더: 공통 컴포넌트 관리
- [ ] asset 폴더: 필요한 이미지 관리
- [ ] constants 폴더: 상수 관리
- [ ] utils 폴더: 유틸 관리

2. 필요한 asset 다운받기

## 📌 image

<img width="100%" alt="스크린샷 2023-07-06 오후 5 55 46" src="https://github.com/bae-sh/fe-newsstand/assets/37887690/4418874b-6403-4cd5-95ed-33343edeb69c">
