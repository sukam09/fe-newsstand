import { fetchPressInfo } from './api.js';

export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function convertRegDate(regDate) {
  const [date, time] = regDate.split(' ');

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hourMinute = time.slice(0, 5);

  const convertedRegDate = `${year}.${month}.${day}. ${hourMinute}`;

  return convertedRegDate;
}

export async function getPidMap() {
  const data = await fetchPressInfo();
  return new Map(data.map(({ id, name, logo }) => [id, { name, logo }]));
}
