#!/bin/bash

./clean.sh
cd config
npm run bpc
cd ../entities
npm run bpc
cd ../api
npm run bpc
cd ../auth
npm run bpc
cd ui
npm run bpc