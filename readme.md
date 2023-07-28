### 폴더구조

[뉴스스탠드 데모영상](https://youtu.be/RX3RJi6MUi8)

```bash
├── assets
│   ├── basicIcon
│   ├── logo
│   │   ├── light
│   │   └── dark
│   └── thumbnail
│
├── css
│   ├── header
│   └── main
│       ├── categoryArea
│       ├── mediaArea
│       └── snakBar
│
├── data
│
├── js
│   ├── core
│   ├── newsstand
│   ├── store
│   ├── tag
│   └── utils
│
└── home.html
```

---

### 기술적 도전

뉴스스탠드 미션을 진행하면서 다음과 같은 기술적 도전을했습니다.

- 옵저버 패턴 적용하기
- store을 생성하기 (with 리덕스)
- querySelector 직접 만들어보기

---

### store 생성하기

구독하기 & 해지하기 기능을 구현하면서 구독중인 언론사를 담는 store가 필요했습니다. 이때, 각 모듈들이 서로 동일한 구독 상태를 공유해야하므로 하나의 store를 생성해야했습니다.

store에는 리덕스 개념을 적용시켰습니다. 따라서 다음과 같이 구조를 구성하였습니다.

### store

##### 추가적으로 옵저버 패턴을 적용시키기위해 subscribe 메소드를 생성하여 구독 함수를 받을 수 있도록하였습니다.

```javascript
export function createStore(reducer) {
  let state;
  let handler = [];
  reducer(state, {
    type: "@@__init__@@",
  });

  return {
    dispatch: (action) => {
      state = reducer(state, action);
      // notify
      handler.forEach((h) => {
        h();
      });
    },
    subscribe: (listener) => {
      handler.push(listener);
    },
    //unsubscribe

    getState: () => state,
  };
}
```

### dispatch

```javascript
// SET: 언론사 구독하기
export function setSubscribe(name, src, id) {
  store.dispatch(actionCreator(ACTION.SUBSCRIBE, [name, src, id]));
}

// SET: 구독 해지하기
export function setUnsubscribe(name) {
  store.dispatch(actionCreator(ACTION.UNSUBSCRIBE, name));
}
```

### reducer

```javascript
function reducer(state = InitState, action) {
  switch (action.type) {
    // 구독하기
    case ACTION.SUBSCRIBE:
      return { ...state, subList: [...state.subList, action.data] };
    // 구독 해지하기
    case ACTION.UNSUBSCRIBE:
      return {
        ...state,
        subList: state.subList.filter((sub) => sub[0] !== action.data),
      };
    default:
      return { ...state };
  }
}
```

---

### querySelector 직접 만들기

#### 이번 미션을 진행하면서 DOM조작을위해 querySelector를 많이 사용했습니다.

크롱님이 querySelector API를 직접 만들어보는 선택미션을주셔서 만들어보기로 했습니다.
querySelector를 구현하기위해 노드 객체가 가지고있는 속성을 확인하기위해 `console.dir`를 사용하면서 어떤 속성을 가지고 있는지 확인하고
root노드부터 시작하고 자식노드들을 재귀적으로 순회하면서 구현하였습니다.

```javascript
// "div"와 같은 태그네임을 인자로 받아 모든 노드 객체들을 반환합니다.
customQuerySelectAllByTagName(search, node = document) {
    node.localName === search && this.result.push(node);

    for (const elem of node.children) {
      this.customQuerySelectAllByTagName(search, elem);
    }
    return this.result;
  }

  // 클래스 이름을 인자로 받아 모든 노드 객체들을 반환합니다.
  getAllElementWithClassName(search, node = document) {
    if (node.classList) {
      [...node.classList].includes(search) && this.result.push(node);
    }

    for (const elem of node.children) {
      this.getAllElementWithClassName(search, elem);
    }

    return this.result;
  }

  // 클래스 이름을 인자로 받아 첫번째로 발견된 노드 객체를 반환합니다.
  getElementWithClassName(search, node = document) {
    for (const elem of node.children) {
      [...elem.classList].includes(search) &&
        !this.result.length &&
        this.result.push(elem);
      this.getElementWithClassName(search, elem);
    }

    return this.result;
  }
```

### 이슈 & 위키에 정리한 내용들

- [뉴스스탠드 개발일기](https://github.com/devMingu/fe-newsstand/wiki/%EB%89%B4%EC%8A%A4%EC%8A%A4%ED%83%A0%EB%93%9C-%EC%A0%9C%EC%9E%91%EC%9D%BC%EA%B8%B0)
- [바닐라로 리덕스 적용하기](https://github.com/devMingu/fe-newsstand/wiki/%EB%B0%94%EB%8B%90%EB%9D%BC%EB%A1%9C-store%EC%97%90-%EB%A6%AC%EB%8D%95%EC%8A%A4-%EA%B0%9C%EB%85%90-%EB%8F%84%EC%9E%85%ED%95%98%EA%B8%B0)
- [querySelector 만들기](https://github.com/devMingu/fe-newsstand/issues/17)
- [언론사를 동시에 구독할때 생기는 문제 해결하기](https://github.com/devMingu/fe-newsstand/issues/15)
- [이벤트리스너 중복으로 발생한 문제점](<https://github.com/devMingu/fe-newsstand/wiki/%EC%BD%98%ED%85%90%EC%B8%A0-%EC%88%AB%EC%9E%90%EA%B0%80-%EC%9D%B4%EC%83%81%ED%95%98%EA%B2%8C-%EC%A6%9D%EA%B0%80%ED%95%98%EB%8A%94-%ED%98%84%EC%83%81-(%EC%9D%B4%EB%B2%A4%ED%8A%B8%EB%A6%AC%EC%8A%A4%EB%84%88-%EC%A4%91%EB%B3%B5)>)
- [고차함수 reduce 사용기](https://github.com/devMingu/fe-newsstand/wiki/%EA%B3%A0%EC%B0%A8%ED%95%A8%EC%88%98-reduce-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0.)
