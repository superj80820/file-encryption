const isKeyDuplicateInArray = (array, key) =>
  array
    .map((item) => item[key])
    .filter((item, index, arr) => arr.indexOf(item) != index).length > 0;

const arrayToSpecKeysObejct = (array, specKeys) =>
  array.map((item) =>
    item.split(":").reduce((a, b, index) => {
      a[specKeys[index]] = b;
      return a;
    }, {})
  );

module.exports = {
  isKeyDuplicateInArray,
  arrayToSpecKeysObejct,
};
