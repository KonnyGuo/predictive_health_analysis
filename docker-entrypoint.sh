#!/bin/sh
echo "Inserting sample data..."
npm run insert-data
echo "Training model..."
npm run train
echo "Starting the application..."
node server.js