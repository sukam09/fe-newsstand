import newsStore from "../../store/news.js";
import { html } from "../../lib/jsx.js";
const DEFAULT_DELAY = 5;
const changeAnimationPlayState = (playstate) => {
    return ({ currentTarget, target }) => {
        (currentTarget ?? target).style.animationPlayState =
            playstate;
    };
};
const removeBundle = ({ currentTarget }) => {
    currentTarget.classList.remove("instant-rolling", "rolling");
    currentTarget.children[0].remove();
    currentTarget.removeEventListener("animationend", removeBundle);
};
const removeFirstChild = (currentTarget) => {
    currentTarget.children[0].remove();
};
const addArticle = (currentTarget, article) => currentTarget.appendChild(NewsTitle(article));
const NewsTitle = ({ title, url }) => html `<li class="news-title"><a href=${url}>${title}</a></li>`;
const NewsArticles = (recentNews, delay = 0) => {
    let recentNewsIdx = 1;
    console.log(recentNews);
    const updateArticle = ({ currentTarget }) => {
        addArticle(currentTarget, recentNews.articles[recentNewsIdx++]);
        removeFirstChild(currentTarget);
    };
    const updateRecentNews = (e) => {
        const $rolling = e.currentTarget.parentNode?.parentNode;
        $rolling?.append(NewsArticles(newsStore.getRecentNews()));
        if (recentNews.articles.length !== 1) {
            removeFirstChild(e.currentTarget);
            $rolling?.classList.add("rolling");
        }
        else {
            $rolling?.classList.add("instant-rolling");
        }
        console.log("animtionend");
        e.stopPropagation();
        $rolling?.addEventListener("animationend", removeBundle);
    };
    const { title, url } = recentNews.articles[0];
    const $template = html `
    <div class="news-article__bundle">
      <h3 class="news-article__company">${recentNews.company}</h3>
      <ul
        class="news-article__list"
        style=${`animation-iteration-count: ${recentNews.articles.length - 1};`}
        onAnimationIteration=${updateArticle}
        onAnimationStart=${(e) => {
        if (recentNews.articles.length !== 1) {
            addArticle(e.currentTarget, recentNews.articles[recentNewsIdx++]);
        }
        // else {
        //   const $rolling = (e.currentTarget as Node).parentNode?.parentNode;
        //   ($rolling as HTMLElement)?.classList.add("rolling");
        // }
    }}
        onMouseEnter=${changeAnimationPlayState("paused")}
        onMouseLeave=${changeAnimationPlayState("running")}
        onAnimationEnd=${updateRecentNews}
      >
        ${NewsTitle({ title, url })}
      </ul>
    </div>
  `;
    console.log($template.querySelector(".news-article__list"));
    $template.querySelector(".news-article__list").style.animationDelay = `${DEFAULT_DELAY + delay}s`;
    return $template;
};
const NewsRollingBar = (delay = 0) => html `
  <article class="news-article__container">
    <div class="news-article__window">
      <div>${NewsArticles(newsStore.getRecentNews(), delay)}</div>
    </div>
  </article>
`;
export default NewsRollingBar;
