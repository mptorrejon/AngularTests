#!/bin/bash
#install dependencies
npm install angular --save
npm install -g karma --save-dev
npm install -g karma-jasmine --save-dev
npm install jasmine-core --save-dev
npm install angular-mocks --save-dev
npm install karma-phantomjs-launcher --save-dev
#creates working directories
mkdir app && mkdir tests
