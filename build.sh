#!/bin/bash
set -e

echo "Building frontend..."
npm run build

echo "Building server..."
cd server
npm install
npm run build
cd ..

echo "Build complete."
