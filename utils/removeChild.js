// 부모 태그 내 모든 자식 태그 삭제
export const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
