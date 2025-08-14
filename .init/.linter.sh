#!/bin/bash
cd /home/kavia/workspace/code-generation/online-shopping-platform-125854-125863/shopping_app_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

