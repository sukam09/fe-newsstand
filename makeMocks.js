const fs = require("fs");

const arr = [];
for (let i = 0; i < 96; i++) {
  const json = {
    name: "",
    src: `./assets/images/${i}.png`,
  };

  arr.push(json);
}

fs.writeFileSync("./mocks/news1.json", JSON.stringify(arr), {
  flag: "a",
});
