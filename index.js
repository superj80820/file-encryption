const crypto = require("crypto");
const { program } = require("commander");
const encryption = require("./lib/crypto");
const fs = require("fs");
const cli = require("./lib/cli");
const util = require("./lib/util");

function readFile(filePath) {
  return fs.readFileSync(filePath, { encoding: "utf-8" });
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

function defaultHandler(password, inputName, outputName, encryptOrDecrypt) {
  const { encrypt, decrypt } = encryption(
    crypto.createHash("sha256").update(password).digest("hex")
  );

  switch (encryptOrDecrypt) {
    case "Encrypt":
      writeFile(outputName, encrypt(readFile(inputName)));
      break;
    case "Decrypt":
      writeFile(outputName, decrypt(readFile(inputName)));
      break;
  }
}

function configHandler(config, password) {
  const { decrypt } = encryption(
    crypto.createHash("sha256").update(password).digest("hex")
  );

  if (util.isKeyDuplicateInArray(config, "inputName")) {
    console.log("'inputName' is duplicated");
    return;
  }

  if (util.isKeyDuplicateInArray(config, "outputName")) {
    console.log("'outputName' is duplicated");
    return;
  }

  config.forEach(({ inputName, outputName }) => {
    writeFile(outputName, decrypt(readFile(inputName)));
  });
}

(async () => {
  try {
    program.option("-c, --config", "Use config 'crypto-config.json'");
    program.parse(process.argv);

    if (program.config) {
      const config = JSON.parse(readFile("./crypto-config.json"));
      const { password, encryptOrDecrypt } = await cli.useConfig();
      configHandler(config, password, encryptOrDecrypt);
    } else {
      const {
        password,
        inputName,
        outputName,
        encryptOrDecrypt,
      } = await cli.useDefault();
      defaultHandler(password, inputName, outputName, encryptOrDecrypt);
    }
  } catch (err) {
    console.error("Encrypt Or decrypt fail");
    console.error(err);
  }
})();
