/**
 * 로컬 path 내의 데이터 가져오는 함수
 * @param url json 파일이 위치하는 로컬 경로
 */
const getJSON = async (url) => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.error("Error : ", err);
    return null;
  }
};

export { getJSON };
