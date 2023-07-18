export async function getNewsContent() {
  try {
    const response = await fetch("../data/newsContents.json")
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

export async function getPressObj() {
  try {
    const response = await fetch("../data/pressObj.json")
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
