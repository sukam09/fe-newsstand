import { fetchPressInfo } from './api.js';

export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export async function getPressList() {
  const data = await fetchPressInfo();
  const result = data.map(({ name, logo }) => ({ name, logo }));
  result.unshift(null);
  return result;
}
