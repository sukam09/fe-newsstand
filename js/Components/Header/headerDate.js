const formatToday = () => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };
  const formattedToday = new Date().toLocaleDateString("ko", options);
  return formattedToday;
};

const setHeaderDate = () => {
  const formattedToday = formatToday();
  const $header__date = document.querySelector(".header__date");

  $header__date.innerHTML = formattedToday;
};

export { setHeaderDate };
