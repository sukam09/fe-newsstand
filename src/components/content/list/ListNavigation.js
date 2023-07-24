import { html } from "../../../lib/jsx.js";
const isActive = () => false;
const ListNavigation = (categories) => {
    const $template = html `
    <nav class="list__nav">
      ${categories.map((category) => html `
          <div class=${isActive() && "active"}>
            <span class="category-name">${category.name}</span>

            ${isActive() &&
        html ` <span class="category-idx">
                <span class=${isActive() && `category-idx--active`}>
                  ${idx + 1}
                </span>
                /${category.amount}
              </span>
              <div class="category--progress"></div>`}
          </div>
        `)}
    </nav>
  `;
    return $template;
};
export default ListNavigation;
