export async function getRollingList() {
  try {
    const response = await fetch("../constant/headline.json")
      .then((response) => response.json())
      .then((json) => {
        return json.newsList;
      });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPressObj() {
  try {
    const response = await fetch("../constant/pressObj.json")
      .then((response) => response.json())
      .then((json) => {
        return json.pressList;
      });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getNewsContents() {
  try {
    const response = await fetch("../constant/newsContents.json")
      .then((response) => response.json())
      .then((json) => {
        return json.categoryList;
      });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
