import { html } from "../lib/jsx.js";
const NewsRollingBar = (animationDelay = 0) => {
    const updateRecentNews = ({ currentTarget }) => {
        // JSX parsing 과정에서 생긴 빈 text node를 제거합니다.
        // if ((currentTarget as Node)!.firstChild?.nodeValue === " ") {
        //   (currentTarget as Node)!.firstChild!.remove();
        // }
        // 기존 뉴스를 제거합니다.
        currentTarget.children[0].remove();
        currentTarget.appendChild(html `<li class="news-title"><a href="/">뉴스내용</a></li>`);
    };
    const changeAnimationPlayState = (playstate) => {
        return ({ currentTarget, target }) => {
            (currentTarget ?? target).style.animationPlayState =
                playstate;
        };
    };
    return html `
    <article class="news-article__container">
      <div class="news-article__window">
        <div class="news-article__bundle rolling-articles">
          <h3 class="news-article__company">연합뉴스</h3>
          <ul
            class="news-article__list"
            style=${`animation-delay: ${animationDelay}s`}
            onAnimationIteration=${updateRecentNews}
            onMouseEnter=${changeAnimationPlayState("paused")}
            onMouseLeave=${changeAnimationPlayState("running")}
          >
            <li class="news-title">
              <a href=""
                >구글, 2022년 10월 15일 신제품 발표회 개최…픽셀4·노트북 등
                발표할 예정 발표할 예정 발표할 예정</a
              >
            </li>
            <li class="news-title">
              <a href="">내용2</a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  `;
};
export default NewsRollingBar;
