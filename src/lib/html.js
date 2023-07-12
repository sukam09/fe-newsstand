/**
 * html을 Template literal로 작성 시 사용하는 함수
 *
 * XSS(Cross Site Scripting)을 방지하기 위해 string 값이 passing될 경우 String으로 타입 변경
 *
 * [lit-html](!https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) 사용시 color scheme 적용 가능
 *
 * @param {TemplateStringsArray} strings
 * @param {Array<string | number | null>} values
 * @returns {String.raw}
 */
const html = (strings, ...values) => {
    const safeValues = values.map((value) => typeof value === "string" ? String(value) : value);
    return String.raw({ raw: strings }, ...safeValues);
};
export { html };
