export const shuffleData = (data) => {
  return data.agencies.sort(() => 0.5 - Math.random());
};
