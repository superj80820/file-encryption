const crypto = require("crypto");
const { program } = require("commander");
const encryption = require("./lib/crypto");
const cli = require("./lib/cli");
const util = require("./lib/util");
const helper = require("./lib/helper");

function defaultHandler(password, inputName, outputName, encryptOrDecrypt) {
  const { encrypt, decrypt } = encryption(
    crypto.createHash("sha256").update(password).digest("hex")
  );

  switch (encryptOrDecrypt) {
    case "Encrypt":
      helper.writeFile(
        `./file/${outputName}`,
        encrypt(helper.readFile(`./file/${inputName}`))
      );
      break;
    case "Decrypt":
      helper.writeFile(
        `./file/${outputName}`,
        decrypt(helper.readFile(`./file/${inputName}`))
      );
      break;
  }
}

function configHandler(config, password) {
  const { encrypt, decrypt } = encryption(
    crypto.createHash("sha256").update(password).digest("hex")
  );

  util
    .arrayToSpecKeysObejct(config, [
      "inputName",
      "outputName",
      "encryptOrDecrypt",
    ])
    .forEach(({ inputName, outputName, encryptOrDecrypt }) => {
      const isFileExistInFoler = helper.isFileExistInFoler("./file")(inputName);
      if (isFileExistInFoler === "File not exist") {
        console.warn(`${isFileExistInFoler}: ${inputName}`);
        return;
      }
      switch (encryptOrDecrypt) {
        case "Encrypt":
          helper.writeFile(
            `./file/${outputName}`,
            encrypt(helper.readFile(`./file/${inputName}`))
          );
          break;
        case "Decrypt":
          helper.writeFile(
            `./file/${outputName}`,
            decrypt(helper.readFile(`./file/${inputName}`))
          );
          break;
      }
    });
}

(async () => {
  try {
    program.option(
      "-c, --config <value>",
      "Use config to encrypt/decrypt",
      (value, previous) => previous.concat([value]),
      []
    );
    program.parse(process.argv);

    if (program.config.length !== 0) {
      const { password } = await cli.useConfig();
      configHandler(program.config, password);
      return;
    }

    const {
      password,
      inputName,
      outputName,
      encryptOrDecrypt,
    } = await cli.useDefault();
    defaultHandler(password, inputName, outputName, encryptOrDecrypt);
  } catch (err) {
    console.error("Encrypt Or decrypt fail");
    console.error(err);
  }
})();
