/** class 변경 */
function _changeClass(element, removeClass, addClass) {
  element.classList.remove(removeClass);
  element.classList.add(addClass);
}

/** 화면에 보이는 요소 변경 */
function _changeDispay(element1, displayType1, element2, displayType2){
  element1.style.display = displayType1;
  element2.style.display = displayType2;
}

/** json 데이터 가져오기 */
async function dataFetch(path){
  const response = await fetch(path);
  const jsonData = await response.json();
  return jsonData;
}

export {_changeClass, _changeDispay, dataFetch}