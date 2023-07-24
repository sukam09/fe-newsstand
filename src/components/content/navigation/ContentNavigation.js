import { GRID, LIST } from "../../../constant.js";
import { html } from "../../../lib/jsx.js";
import CompanyTypeButton from "./CompanyTypeButton.js";
import ViewTypeButton from "./ViewTypeButton.js";
const viewTypeData = [
    { type: LIST, srText: "리스트 보기" },
    { type: GRID, srText: "그리드 보기" },
];
const companyTypeData = [
    { type: "all", text: "전체 언론사" },
    { type: "subscribe", text: "내가 구독한 언론사" },
];
const ContentNaviagtion = ({}) => {
    const $template = html `
    <nav class="main__nav">
      <div class="company-type">
        ${companyTypeData.map((item) => CompanyTypeButton({ type: item.type, text: item.text }))}
      </div>
      <div class="view-type">
        ${viewTypeData.map((item) => ViewTypeButton({ type: item.type, srText: item.srText }))}
      </div>
    </nav>
  `;
    return $template;
};
export default ContentNaviagtion;
