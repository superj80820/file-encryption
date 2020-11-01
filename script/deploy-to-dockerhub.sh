#!/bin/bash

npm install
docker build . -t="superj80820/fileencryption"
docker push superj80820/fileencryption