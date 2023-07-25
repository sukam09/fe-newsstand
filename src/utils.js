import { fetchPressInfo } from './api.js';

export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export async function getPidMap() {
  const data = await fetchPressInfo();
  return new Map(data.map(({ id, name, logo }) => [id, { name, logo }]));
}
