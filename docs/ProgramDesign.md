## 📰 뉴스 스탠드

### 🖥 화면 구성

- 웹 화면의 정중앙에 콘텐츠 배치

#### 공통 영역

- **Header**
  - 뉴스스탠드 로고
    - 클릭 시, 새로고침
  - 시스템 날짜
    - 예시: 2023.07.10. 월요일
- **RecentNews**
  - 최신 뉴스 자동롤링 영역
  - 애니메이션 활용
  - 최신 뉴스 데이터 가져와 뒤에 추가 + 앞 요소 삭제
- **News**
  - Filter Options : All(default) / Subscribe
  - View Options : 그리드 뷰(default) / 리스트 뷰
- **Button(Prev/Next)**
  - 그리드 뷰 : 페이지 이동
  - 리스트 뷰 : 언론사 이동, 마지막일 경우 카테고리 이동

#### 컴포넌트

- **SnackBar**
  - 함수 형태로 구현 >> parameter : 문구
  - 내가 구독한 언론사에 추가되었습니다.
- **Alert**
  - 함수 형태로 구현 >> parameter : 문구, true 문구, false 문구, function
  - {언론사 이름}을(를) 구독해지하시겠습니까?
- **구독하기 버튼**
  - 그리드 뷰 : + 구독하기 / x 해지하기
  - 리스트 뷰 : + 구독하기 / x

#### 그리드 뷰

- 그리드 (6\*4)
- 그리드 내부 로고
- hover시 구독•해지 버튼
- 데이터를 24개로 pagination

#### 리스트 뷰

- Nav
  - 전체 언론사 : Category
  - 내가 구독한 언론사 : 언론사 List
  - `display: flex;`와 `overflow: scroll;`을 활용
- 리스트 뷰
  - 언론사 로고 / 편집 일시 / 구독•해지 버튼
  - 해당 언론사의 메인 뉴스 1개와 서브 뉴스 6개
  - copyright

#### 다크모드

- On/Off Button
  - Options : System Preference(default) / Light / Dark
  - Button을 checkbox로 제작
  - OS의 테마를 읽고 초기값 설정
  - `body` 태그에 `color-theme` 속성 삽입 (light/dark)

### 💾 데이터

- store

  ```ts
  설계 예정
  ```

- `customFetch`(@asdf99245님 아이디어)
  - `shuffle()` : 처음 데이터 가져오면서 데이터 shuffle
  - `pagination()` :
  - `categorize()` :

### 🔀 Flow

1. Initialize `init()`
   - Header 시스템 날짜 설정
   - Store 초기화
   - localStorage에서 구독 정보 가져오기
   - EventHandler 부착
2. Data Fetching
   - GET data from json
3. Rendering
   - View Type에 따라 렌더링
