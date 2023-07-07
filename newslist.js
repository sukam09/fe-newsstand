
const newsList = [];
const array = [];
for(let i=0;i<96;i++){
    array.push(i);
}
array.forEach(arr => {
    newsList.push({"id":arr});
})
console.log(newsList);

const shuffledArray = array.sort(() => Math.random() - 0.5);
console.log(shuffledArray);


