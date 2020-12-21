#!/bin/bash

set -e

npm run migrate

echo "Starting server"
node -r dotenv/config app.js

