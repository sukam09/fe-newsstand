# fe-newstand

<img width="1728" alt="스크린샷 2023-07-06 오후 5 07 26" src="https://github.com/JungHun98/fe-newsstand/assets/97653343/582eb67d-9cbd-4bbf-8675-ddc52e590995">

# 뉴스 스탠드 설계

## 개발 컨벤션

1. 컴포넌트 추상화 단계 통일하기

   - 하위 컴포넌트들의 추상화 단계를 통일하지 않는다면, 현재 이 컴포넌트가 어떻게 구성되어 있는지 유추하기 어려움

   ```JSX
   function App() {
    // code ...

    render() {
      <div>
       <header>
         // header inner ...
       </header>

       <Rolling />

       <main>
         // main inner...
       </main>
      </div>
    }
   }
   ```

   - 하위 컴포넌트로 구성되어 있는 컴포넌트인 경우, 하위 컴포넌트의 추상화 단계를 통일
   - 개발자(사람)가 코드를 봤을 때, 가독성을 향상 시킬 수 있고 빠른 이해가 가능

   ```js
   function App() {
    // code ...

    render() {
      <div>
       <Header />
       <Rolling />
       <Main />
      </div>
    }
   }
    /* 렌더링 되는 과정을 알기 힘들지만 App 컴포넌트는 Header, Rolling, Main
   세 개의 컴포넌트로 이루어져 있는 것은 쉽게 파악이 가능하다. */
   ```

2. Fetch해오는 데이터 형식이 변경되어도 유지보수가 용이하도록 데이터 처리 함수 분리하기
   - 네트워크를 통해 데이터를 받아와 서버가 보내주는 자료구조에 의존적인 데이터처리 로직을 작성할 가능성 존재
   - 서버에서 전송하는 데이터 형식이 이전과 달라지는 경우 코드 수정이 불가피
     - ex) 이전에 전달받은 데이터 형식 배열 -> 객체로 바뀌는 경우 담고 있는 데이터의 길이나 처리 로직을 변경
   - 따라서 추후 코드 수정을 쉽게 할 수 있도록 전체 데이터에서 필요한 데이터를 가공하는 로직을 분리
     - ex) 데이터의 개수 구하는 함수, 필요한 데이터를 추출하는 함수 등
3. 디렉토리 구조 신경 쓰기

   - 현재 컴포넌트가 어떤 컴포넌트로 이뤄져 있는지 유추할 수 있도록 구성
     - 코드를 읽어보지 않아도 애플리케이션의 구성을 유추 가능
   - 컴포넌트로 분리하면 하나의 파일에서 작업했을 때 보다 수정하고 싶은 로직의 위치를 빠르게 파악할 수 있음
   - 코드를 보다 체계적으로 구조화하고 깔끔하게 만듦으로써 다른 개발자가 작업하던 코드를 받아도 빠르게 작업을 이어나갈 수 있음

4. 주석 작성하기

5. 컴포넌트 형태 통일하기
   - 컴포넌트의 매개변수 형식이 컴포넌트마다 다르다면 구현하는 개발자도 힘겨워지고, 가독성 저하의 문제 발생

```js
/* 이 파일의 목적과 기능 */
/**
 * @param {HTMLElement} $target 부모 컴포넌트
 * @param {Object} props 부모 컴포넌트로부터 전달받은 데이터
*/
export default function Component($target, props) {
  // code ...
  this.render() {
    // ... redering ...
  }
}
```

## 설계 순서

1. 컴포넌트 아키택처 설계/디렉토리 구조 설계
2. 기능 설계
3. State/props 설계

- 추상적인 단위를 먼저 설계하고 세부적인 단위를 다음으로 설계
- 시스템 구조를 쉽게 이해 가능
- 전체 시스템의 복잡성을 줄일 수 있음
  - 추상적인 단위는 더 작고 관리하기 쉬운 모듈로 분리되며, 각 모듈을 개별적으로 관리 가능
  - 코드의 유지보수를 쉽게 해줌

### 컴포넌트 아키택처 설계

![Alt text](image-1.png)

### 디렉토리 구조 설계

컴포넌트 폴더에 하위 컴포넌트들의 폴더 생성을 반복(컴포넌트 트리 구조를 디렉토리로 재구성)

```
newsstand
├─ index.html
├─ index.js
└─ src
   ├─ App.js
   └─ App
      ├─ Header.js
      ├─ Rolling.js
      ├─ Main.js

      ├─ Rolling
      │  └─ RollingContents.js

      └─ Main
         ├─ ContentNav.js
         ├─ MainContent.js

         ├─ ContentNav
         │  ├─ Button.js
         │  ├─ PressType.js
         │  └─ ViewerType.js

         └─ MainContent
            ├─ NewsListView.js
            ├─ PressGridView.js
            ├─ Button.js

            └─ NewsListView
              ├─ CategoryNav.js
              ├─ Contents.js

              └─ Contents
                  ├─ Header.js
                  ├─ News.js

```

### 컴포넌트 기능 설계

#### App

- `App`: 페이지의 light/dark 모드 전환

#### Rolling

- `Rolling`: 롤링하는 컴포넌트의 컨테이너
- `RollingContents`: 실제 롤링되는 컨텐츠 컴포넌트

  - 생성되는 컴포넌트마다 롤링 시작시간이 달라야함

#### Main

- `Main`: 페이지의 메인 컨텐츠(신문사/뉴스기사) 컨테이너

#### Main/ContentNav

- `Main/ContentNav`: Main 컴포넌트의 contents state를 grid/list, all/my로 전환

- `Main/ContentNav/PressType`: Main 컴포넌트의 press State를 변경하는 버튼으로 구성

  - 전체 언론사 버튼: pressType을 "all"로 설정
  - 구독한 언론사 버튼: pressType을 "my"로 설정

- `Main/ContentNav/ViewerType`: Main 컴포넌트의 viewer State를 변경하는 버튼으로 구성

  - listView 버튼: viewerType을 "list"로 변경
  - gridView 버튼: viewerType을 "grid"로 변경

- `Main/ContentNav/Button`: 메인 컨텐츠의 형태를 변경할 수 있는 버튼

#### Main/MainContent

- `MainContent`: 메인 컨텐츠 렌더링

- `MainContent/PressGridView`: 언론사의 그리드 뷰 컴포넌트

- `MainContent/NewsListView`: 카테고리 별 기사 리스트 뷰 컴포넌트

- `MainContent/Button`: MainContents의 Page를 전환하는 버튼

  - 왼쪽 버튼: 이전 페이지로 전환, 현재 페이지가 첫 번째 페이지라면 화면에서 보이지 않음
  - 오른쪽 버튼: 다음 페이지로 전환, 현재 페이지가 마지막 페이지라면 화면에서 보이지 않음

##### Main/MainContent/NewsListView

- `NewsListView/CategoryNav`: 뉴스 리스트 뷰의 카테고리를 전환

  - 프로그레스 바 애니메이션
    - 애니메이션이 끝나면 페이지 전환
    - 마지막 페이지에서 애니메이션 종료시 다음 카테고리로 이동
  - 카테고리 클릭시 카테고리 전환

- `NewsListView/Contents`: 카테고리, 언론사 형태와 페이지에 따라 기사 컨텐츠 렌더링

- `NewsListView/Contents/Header`: 렌더링된 기사의 해더
  - 신문사, 편집 날짜, 구독 버튼
- `NewsListView/Contents/News`: 뉴스 컨텐츠 렌더링

- `NewsListView/Contents/News/MainNews`: 메인 뉴스 렌더링

  - 썸네일, 타이틀

- `NewsListView/Contents/News/SubNews`: 서브 뉴스 렌더링

### state/props 설계

:star: State설계

- `App state`: mode

  - 애플리케이션의 Light mode, Dark mode 상태 저장

- `Main state`: viewerType, pressType

  - 메인 컨텐츠에서 보여질 컨텐츠의 형태를 저장(전체/구독, 그리드 뷰/리스트 뷰)
  - viewerType: gird/list
  - pressType: all/my

- `MainContents`: currentPage, lastPage, category
  - 메인 컨텐츠의 상태를 저장(현재 페이지, 마지막 페이지, 카테고리)
  - currentPage: 1~lastPage
  - lastPage: 컨텐츠 형태, 카테고리 별로 다름
  - category: 리스트 뷰의 기사 카테고리 저장(category id: Number)

:star: Props

- App state: 모든 요소에 전달(Light, Dark)
- Rolling props: start time, 롤링 시작 시간을 전달
- Main state: MainContent와 ContentNav에 전달
  - ContentNav는 Main State와 상태를 변경할 수 있는 함수를 버튼 컴포넌트 까지 전달
- MainContents state: 자신의 하위 컴포넌트 형태에 따라 전달
  - PressGrid: currentPage 전달
  - NewsListView: currentPage, lastPage, category, setState 함수 전달
  - Button: currentPage, lastPage, currentPage 변경 함수 전달

## 고민한 부분

### 컴포넌트 형태

교육생으로부터 얻은 정보를 바탕으로 컴포넌트의 파라미터를 단순 나열하는 방식으로 구현했습니다.

```js
export default function Component($target, ClassName, onClick) {
  // code ...
}
```

이 방식의 문제점은 상위 컴포넌트에서 하위 컴포넌트로 데이터를 넘겨줘야 할 때, 매개변수의 순서를 신경써서 코드를 작성해야한다는 것이었습니다. 매개변수를 작성할 때, 하위 컴포넌트의 형태를 일일이 확인하고 작성해야 했으며, 매개변수 순서배치가 어긋나서 원하는 데이터를 쉽게 가져오지 못했습니다.

따라서 순서에 의한 불편함을 해소하고자 순서에 관련없이 데이터에 접근 할 수 있는 객체를 매개변수로 설정하기로 결정했습니다.

```js
export default function Component($target, props) {
  // code ...
}
```

`props`는 상위 컴포넌트에서 전달한 데이터롤 자바스크립트의 객체 형태로 이루어져 있습니다.

```js
export default function Parent($target, props) {
  // code ...

  this.render = () => {
    //...code

    new Child($Parent, { ...property });
  };
}

// ------------------------------------------------

export default function Child($target, props) {
  // code ...

  this.render = () => {
    //...code

  };
}
```

`props.ClassName`, `props.onClick`과 같이 매개변수의 순서와 상관없이 접근할 수 있습니다.

객체 리터럴에 전달하고자 하는 데이터를 프로퍼티 형태로 값을 넣어주기만 하면돼서 매개변수 순서에 대한 고민을 할 필요가 없어졌습니다. 제대로 된 프로퍼티 키 값으로 접근한다면 손쉽게 접근할 수 있다는 이점도 생겼습니다.

## 아쉬운 부분

Page전환시 MainContent 전체가 리렌더링 되는 형태로 구현하다보니, 하위 컴포넌트인 리스트 뷰의 카테고리가 초기화되는 문제가 발생했습니다. 따라서 `category`의 상태를 상위 컴포넌트인 MainContent에 저장하는 방식으로 해결했습니다.

하지만 `category` 상태는 리스트 뷰일 때만 사용하는 상태 정보이며, 그리드 뷰 상태 일때는 사용하지 않는 정보입니다. 사용하지 않는 상태 정보를 가지고 있는 것이 비효율적이라 생각되는데, 이 부분을 해결하고 싶습니다.
