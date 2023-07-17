import { RollingItem } from "./rollingItem.js";

export function HeadlineContent(props) {
  return `
    <div class="headline__content">
      <div class="headline__content__newspaper">연합뉴스</div>
      <div class="headline__content_rolling">
        <ul>
          ${props.rollingData
            .map((item) => RollingItem({ title: item.title }))
            .join(" ")}
        </ul>
      </div>
    </div>
  `;
}
