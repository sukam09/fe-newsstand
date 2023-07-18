export default function getRandomIndexArr(length) {
  const indexArr = Array.from({ length: length }, (_, i) => i);
  indexArr.sort(() => Math.random() - 0.5);

  return indexArr;
}
