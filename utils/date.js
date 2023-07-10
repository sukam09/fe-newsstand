export const getKRLocaleDateString = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };

  return date.toLocaleDateString("ko-KR", options);
};
