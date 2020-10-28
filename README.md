## How to run?

### Decrypt

```bash
$ docker run -it -v ${PWD}:/app/file superj80820/envencryption
```

Select a `specific file` to decrypt it into `.env`

![](https://i.imgur.com/E0R93iX.png)

After that, `.env` will be created

### Encrypt

```bash
$ docker run -it -v ${PWD}:/app/file superj80820/envencryption
```

Select a `specific env file` to encrypt

![](https://i.imgur.com/rtNqwlc.png)

After that, encrypted `specific env file` will be created

## Reference

- [vlucas/encryption.js](https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb)
