#!/bin/bash

find . -name '*.tgz' -delete;
find . -path '*/node_modules/api' -exec rm -rf {} \;
find . -path '*/node_modules/auth' -exec rm -rf {} \;
find . -path '*/node_modules/auth-ui' -exec rm -rf {} \;
find . -path '*/node_modules/config' -exec rm -rf {} \;
find . -path '*/node_modules/entities' -exec rm -rf {} \;
# find . -name 'package-lock.json' -delete;