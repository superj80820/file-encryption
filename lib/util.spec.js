const util = require("./util");

test("isKeyDuplicateInArray", () => {
  expect(
    util.isKeyDuplicateInArray(
      [
        {
          inputName: ".env.york",
          outputName: ".env",
        },
        {
          inputName: ".env.york2",
          outputName: ".env",
        },
      ],
      "inputName"
    )
  ).toBe(false);

  expect(
    util.isKeyDuplicateInArray(
      [
        {
          inputName: ".env.york",
          outputName: ".env",
        },
        {
          inputName: ".env.york",
          outputName: ".env2",
        },
      ],
      "inputName"
    )
  ).toBe(true);

  expect(
    util.isKeyDuplicateInArray(
      [
        {
          inputName: ".env.york",
          outputName: ".env",
        },
        {
          inputName: ".env.york2",
          outputName: ".env",
        },
      ],
      "outputName"
    )
  ).toBe(true);

  expect(
    util.isKeyDuplicateInArray(
      [
        {
          inputName: ".env.york",
          outputName: ".env",
        },
        {
          inputName: ".env.york",
          outputName: ".env2",
        },
      ],
      "outputName"
    )
  ).toBe(false);
});

test("arrayToSpecKeysObejct", () => {
  expect(
    util.arrayToSpecKeysObejct(
      ["a:b:c", "d:e:f"],
      ["inputName", "outputName", "encryptOrDecrypt"]
    )
  ).toStrictEqual([
    {
      inputName: "a",
      outputName: "b",
      encryptOrDecrypt: "c",
    },
    {
      inputName: "d",
      outputName: "e",
      encryptOrDecrypt: "f",
    },
  ]);
});
