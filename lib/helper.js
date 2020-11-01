const fs = require("fs");

const isFileExistInFoler = (foler) => (path) =>
  fs.existsSync(`${foler}/${path}`) ? true : "File not exist";

const readFile = (filePath) => fs.readFileSync(filePath, { encoding: "utf-8" });

const writeFile = (filePath, content) => fs.writeFileSync(filePath, content);

module.exports = {
  isFileExistInFoler,
  readFile,
  writeFile,
};
