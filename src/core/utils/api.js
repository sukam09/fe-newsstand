export async function getRollingList() {
  try {
    const response = await fetch("../data/headline.json")
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

export async function getNewsContent() {
  try {
    const response = await fetch("../data/newsContent.json")
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
