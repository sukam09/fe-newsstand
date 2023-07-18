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
