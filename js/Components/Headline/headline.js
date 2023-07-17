import { setRolling } from "./rolling.js";

export function Headline() {
  document.addEventListener("DOMContentLoaded", () => {
    setRolling();
  });

  return `
    <section class="headline">
      <div class="headline__content">
        <div class="headline__content__newspaper">연합뉴스</div>
        <div class="headline__content_rolling">
          <ul>
            <li>
              <span class="headline__content__title">
                [1보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출
              </span>
            </li>
            <li>
              <span class="headline__content__title">
                [2보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출
              </span>
            </li>
            <li>
              <span class="headline__content__title">
                [3보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출
              </span>
            </li>
            <li>
              <span class="headline__content__title">
                [4보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출
              </span>
            </li>
            <li>
              <span class="headline__content__title">
                [5보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="headline__content">
        <div class="headline__content__newspaper">연합뉴스</div>
        <div class="headline__content_rolling">
          <ul>
            <li>
              <span class="headline__content__title">
                [1보] 최고위원 본경선, 김병민•김용태•김재원•민영삼
              </span>
            </li>
            <li>
              <span class="headline__content__title">
                [2보] 최고위원 본경선, 김병민•김용태•김재원•민영삼
              </span>
            </li>
            <li>
              <span class="headline__content__title">
                [3보] 최고위원 본경선, 김병민•김용태•김재원•민영삼
              </span>
            </li>
            <li>
              <span class="headline__content__title">
                [4보] 최고위원 본경선, 김병민•김용태•김재원•민영삼
              </span>
            </li>
            <li>
              <span class="headline__content__title">
                [5보] 최고위원 본경선, 김병민•김용태•김재원•민영삼
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `;
}
