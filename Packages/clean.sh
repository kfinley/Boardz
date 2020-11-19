#!/bin/bash

find . -name '*.tgz' -delete;
find . -type d | grep -E "/api/dist$|/auth/dist$|/auth/ui/dist$|/config/dist$|/entities/dist$" | xargs rm -rf
find . -path '*/node_modules/api' -exec rm -rf {} \;
find . -path '*/node_modules/auth' -exec rm -rf {} \;
find . -path '*/node_modules/auth-ui' -exec rm -rf {} \;
find . -path '*/node_modules/config' -exec rm -rf {} \;
find . -path '*/node_modules/entities' -exec rm -rf {} \;