const pressObjArr = [];

(() => {
  for (let i = 1; i <= 96; i++) {
    pressObjArr.push({
      id: i,
      imgSrc: `./images/img${i}.png`,
      isSub: false,
    });
  }
})();
