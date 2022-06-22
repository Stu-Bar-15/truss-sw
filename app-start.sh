#!/bin/bash
echo "Running Yarn Build..."
yarn build
echo "Running Yarn Build... COMPLETE"

echo "Starting server..."
node server.js
