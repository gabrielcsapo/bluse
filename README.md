# bluse

> ⚗️ blend and fuse data with ease

[![Npm Version](https://img.shields.io/npm/v/bluse.svg)](https://www.npmjs.com/package/bluse)
[![Build Status](https://travis-ci.org/gabrielcsapo/bluse.svg?branch=master)](https://travis-ci.org/gabrielcsapo/bluse)
[![Dependency Status](https://david-dm.org/gabrielcsapo/bluse.svg)](https://david-dm.org/gabrielcsapo/bluse)
[![devDependency Status](https://david-dm.org/gabrielcsapo/bluse/dev-status.svg)](https://david-dm.org/gabrielcsapo/bluse#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/bluse.svg)]()
[![npm](https://img.shields.io/npm/dm/bluse.svg)]()

## Installation

```
npm install bluse --save
```

## Usage

> To use `bluse` as a standalone library without a bundler, use the bundle located at dist/`bluse`.js. Else if you are using webpack or any other bundler, simply require('`bluse`') will suffice!

```javascript
const bluse = require('bluse');

const data = [{
  builds: [{
    start: 1235,
    end: 12345,
    name: 'build1',
    steps: [{
      name: 'install',
      script: 'npm install',
      output: 'install successfully',
      dependencies: [
        'moment@1.0.2',
        'kraken-js@2.0.1',
        'tape@4.0.2'
      ],
      code: 0,
      start: 1,
      end: 34133
    }, {
      name: 'lint',
      script: 'npm run lint',
      output: 'failed lint!',
      code: 1,
      start: 2,
      end: 12
    }]
  }, {
    start: 1235,
    end: 12345,
    name: 'build2'
  }]
}, {
  builds: [{
    start: 1235,
    end: 12345,
    name: 'build3',
    steps: [{
      name: 'install',
      script: 'npm install',
      output: 'large outtttt',
      dependencies: [
        'moment@2.0.2',
        'kraken-js@2.0.1',
        'tape@10.0.2',
        'tap@11.0.2'
      ],
      code: 0,
      start: 1,
      end: 34123
    }, {
      name: 'lint',
      script: 'npm run lint',
      output: 'large outtttt',
      code: 0,
      start: 2,
      end: 1256
    }, {
      name: 'coverage',
      script: 'npm run coverage',
      output: 'RUNNING COVERAAAGGEE',
      code: 0,
      start: 2,
      end: 123456
    }]
  }, {
    start: 1235,
    end: 12345,
    name: 'build4'
  }]
}];

bluse(data);
```

Now that you have `blused` your data! It should look like the following:

```javascript
{
  'builds:start': [1235, 1235, 1235, 1235],
  'builds:end': [12345, 12345, 12345, 12345],
  'builds:name': ['build1', 'build2', 'build3', 'build4'],
  'builds:steps:name': ['install', 'lint', 'install', 'lint', 'coverage'],
  'builds:steps:script': ['npm install', 'npm run lint', 'npm install', 'npm run lint', 'npm run coverage'],
  'builds:steps:output': ['install successfully', 'failed lint!', 'large outtttt', 'large outtttt', 'RUNNING COVERAAAGGEE'],
  'builds:steps:dependencies': ['moment@1.0.2', 'kraken-js@2.0.1', 'tape@4.0.2', 'moment@2.0.2', 'kraken-js@2.0.1', 'tape@10.0.2', 'tap@11.0.2'],
  'builds:steps:code': [0, 1, 0, 0, 0],
  'builds:steps:start': [1, 2, 1, 2, 2],
  'builds:steps:end': [34133, 12, 34123, 1256, 123456]
}
```

## Contributions

`bluse` has been extensively tested with over 200,000 records and can hold up to the task! If you can break `bluse` please contribute back!
