module.exports = {
  isKeyDuplicateInArray(array, key) {
    return (
      array
        .map((item) => item[key])
        .filter((item, index, arr) => arr.indexOf(item) != index).length > 0
    );
  },
};
