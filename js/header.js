function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' };
    const formattedDate = new Date(date).toLocaleDateString('ko', options);
    return formattedDate;
}
  
const today = new Date();
const formattedDate = formatDate(today);

document.querySelector(".header__date").innerHTML = formattedDate;
// console.log(formattedDate);
  