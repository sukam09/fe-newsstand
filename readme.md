## 📰 뉴스스탠드 구현 과제 - 2주차

## 🖥 화면

#### 1. 최신 뉴스 자동 롤링 영역

#### 2. 전체 언론사: 그리드 보기

#### 3. 전체 언론사: 리스트 보기

## CSS 고려사항

- 재사용성을 위해 자주 사용되는 폰트 속성을 묶어서 사용하였습니다.

```
.font-init {
  color: var(--text-text-default, #5f6e76);
  font-family: Pretendard;
  font-style: normal;
}

.bold-font-init {
  color: var(--text-text-strong, #14212b);
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
```

- 프로그레스바는 keyframe 애니메이션을 사용하여 구현하였습니다.

```.progress-bar {
  background: var(--progress-before);
  display: flex;
  width: 166px;
  height: 40px;
  padding: 0px 16px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-shrink: 0;
  color: white !important;
  position: relative;
  z-index: 2;
}

.progress-bar:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  width: 0;
  background: var(--progress-after);
  animation: progress 20s linear;
  z-index: -1;
}

@keyframes progress {
  0% {
    width: 0px;
  }
  100% {
    width: 100%;
  }
}

```

- 롤링 모션을 위해 transition을 사용하였습니다.
  (./src/rollingBanner.js에서 추가적인 구현 진행하였음)

```
.rollingbanner li.prev {
  top: 17px;
  transition: top 0.5s linear;
}
```
