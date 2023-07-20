export async function customFetch(url, callback, options) {
  try {
    const response = await fetch(url, options);
    let data = await response.json();

    if (callback) data = callback(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
