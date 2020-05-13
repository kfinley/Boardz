#!/bin/bash

cd config
npm install &&npm run bpc
cd ../boardz
npm install &&npm run bpc
cd ../api
npm install && npm run bpc
cd ../boardz/Server
npm install && npm run bpc
cd ../../auth
npm install && npm run bpc
cd ui
npm install && npm run bpc
cd ../../chat/Server
npm install && npm run bpc
