透過簡單的指令使用密碼將檔案加密與解密

## 怎麼運作？

### 加密

```bash
$ docker run -it -v ${PWD}:/app/file superj80820/fileencryption
```

輸入加密密碼，選擇需加密的檔案與輸出檔名，

![](https://i.imgur.com/LCWtGVk.png)

之後加密檔案就會產生。

### 解密

```bash
$ docker run -it -v ${PWD}:/app/file superj80820/fileencryption
```

輸入解密密碼，選擇需解密的檔案與輸出檔名，

![](https://i.imgur.com/1RtugKO.png)

之後解密檔案就會產生。

---

如要批次運行，可輸入以下指令

```
$ docker run -it -v ${PWD}:/app/file superj80820/fileencryption -c <InputFile>:<OutputFile>:<Encrypt Or decrypt>
```

```bash
$ docker run -it -v ${PWD}:/app/file superj80820/fileencryption -c .env:.env.local:Encrypt -c .env:.env.test:Dencrypt
```

## Reference

- [vlucas/encryption.js](https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb)
