"use strict";

const crypto = require("crypto");
const encryption = require("./encryption");
const readline = require("readline");
const fs = require("fs");

function readInput(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

function readFile(filePath) {
  return fs.readFileSync(filePath, { encoding: "utf-8" });
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

(async () => {
  try {
    const password = await readInput("Password: ");
    const inputName = `./file/${await readInput("Input file name: ")}`;
    const outputName = `./file/${await readInput("Output file name: ")}`;
    const encryptOrDecrypt = await readInput(
      "Encrypt Or decrypt\n(a)Encrypt\n(b)Decrypt\n: "
    );
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    const { encrypt, decrypt } = encryption(hash);

    switch (encryptOrDecrypt) {
      case "a":
        writeFile(outputName, encrypt(readFile(inputName)));
        break;
      case "b":
        writeFile(outputName, decrypt(readFile(inputName)));
        break;
    }
  } catch (err) {
    console.error("Encrypt Or decrypt fail");
    console.error(err);
  }
})();
