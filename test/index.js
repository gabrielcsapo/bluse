const test = require('tape');

const bluse = require('../index');

test('bluse', (t) => {
  t.plan(5);

  t.test('@object should flatten object', (t) => {
    const data = {
      name: "bluse",
      tags: ["nodejs", "utility", "npm"],
      description: "⚗️ blend and fuse data with ease",
      package: {
        directDependencies: 3,
        totalDependencies: 1093,
        resolveDependencies: [
          'moment@2.0.2',
          'tape@10.0.2',
          'tap@11.0.2'
        ]
      },
      builds: [{
        start: 1235,
        end: 12345,
        name: 'build3'
      }, {
        start: 1235,
        end: 12345,
        name: 'build4'
      }]
    };

    t.deepEqual(bluse(data), {
      name: 'bluse',
      tags: ['nodejs', 'utility', 'npm'],
      description: '⚗️ blend and fuse data with ease',
      'package:directDependencies': 3,
      'package:totalDependencies': 1093,
      'package:resolveDependencies': ['moment@2.0.2', 'tape@10.0.2', 'tap@11.0.2'],
      'builds:start': [1235, 1235],
      'builds:end': [12345, 12345],
      'builds:name': ['build3', 'build4']
    });
    t.end();
  })

  t.test('@array basic usage', (t) => {
    const data = [{
      name: "json-ex",
      tags: ['nodejs', 'utility', 'npm', 'json'],
      contributors: [{
        name: 'Gabriel J. Csapo'
      }],
      doesNotExistElsewhere: 'hello world',
      description: "Extends JSON to be able to serialize and deserialize more than just basic primitives.",
      package: {
        directDependencies: 45,
        totalDependencies: 803,
        resolveDependencies: [
          'moment@1.0.2',
          'tape@4.0.2'
        ]
      },
      builds: [{
        start: 1235,
        end: 12345,
        name: 'build1'
      }, {
        start: 1235,
        end: 12345,
        name: 'build2'
      }]
    }, {
      name: "bluse",
      tags: ['nodejs', 'utility', 'npm'],
      contributors: [{
        name: 'Gabriel J. Csapo'
      }],
      description: "⚗️ blend and fuse data with ease",
      package: {
        directDependencies: 3,
        totalDependencies: 1093,
        resolveDependencies: [
          'moment@2.0.2',
          'tape@10.0.2',
          'tap@11.0.2'
        ]
      },
      builds: [{
        start: 1235,
        end: 12345,
        name: 'build3'
      }, {
        start: 1235,
        end: 12345,
        name: 'build4'
      }]
    }];

    t.deepEqual(bluse(data), {
      name: ['json-ex', 'bluse'],
      tags: ['nodejs', 'utility', 'npm', 'json', 'nodejs', 'utility', 'npm'],
      'contributors:name': ['Gabriel J. Csapo', 'Gabriel J. Csapo'],
      doesNotExistElsewhere: ['hello world'],
      description: ['Extends JSON to be able to serialize and deserialize more than just basic primitives.', '⚗️ blend and fuse data with ease'],
      'package:directDependencies': [45, 3],
      'package:totalDependencies': [803, 1093],
      'package:resolveDependencies': ['moment@1.0.2', 'tape@4.0.2', 'moment@2.0.2', 'tape@10.0.2', 'tap@11.0.2'],
      'builds:start': [1235, 1235, 1235, 1235],
      'builds:end': [12345, 12345, 12345, 12345],
      'builds:name': ['build1', 'build2', 'build3', 'build4']
    });
    t.end();
  });

  t.test('@array recursive nesting of arrays', (t) => {
    var data = [{
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

    t.deepEqual(bluse(data), {
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
    });
    t.end();
  });

  t.test('@array infinite nesting', (t) => {
    const data = [{
      account: {
        person: {
          name: {
            history: {
              date: 123456
            }
          },
          family: [{
            age: 50,
            name: 'Bob'
          }, {
            age: 28,
            name: 'Susan'
          }]
        }
      }
    }, {
      account: {
        person: {
          name: {
            history: {
              date: 654321
            }
          },
          family: [{
            age: 40,
            name: 'Diane'
          }, {
            age: 32,
            name: 'Alfred'
          }]
        }
      }
    }];

    t.deepEqual(bluse(data), {
      'account:person:name:history:date': [123456, 654321],
      'account:person:family:age': [50, 28, 40, 32],
      'account:person:family:name': ['Bob', 'Susan', 'Diane', 'Alfred']
    });

    t.end();
  });

  t.test('@mixed should only return unique values', (t) => {
    const data = [{
      name: "json-ex",
      tags: ['nodejs', 'utility', 'npm', 'json', 'unique'],
      contributors: [{
        name: 'Gabriel J. Csapo'
      }],
      doesNotExistElsewhere: 'hello world',
      description: "Extends JSON to be able to serialize and deserialize more than just basic primitives.",
      package: {
        directDependencies: 45,
        totalDependencies: 803,
        resolveDependencies: [
          'moment@1.0.2',
          'tape@4.0.2'
        ]
      },
      builds: [{
        start: 1235,
        end: 12345,
        name: 'build1'
      }, {
        start: 1235,
        end: 12345,
        name: 'build2'
      }]
    }, {
      name: "bluse",
      tags: ['nodejs', 'utility', 'npm'],
      contributors: [{
        name: 'Gabriel J. Csapo'
      }],
      description: "⚗️ blend and fuse data with ease",
      package: {
        directDependencies: 3,
        totalDependencies: 1093,
        resolveDependencies: [
          'moment@2.0.2',
          'tape@10.0.2',
          'tap@11.0.2'
        ]
      },
      builds: [{
        start: 1235,
        end: 12345,
        name: 'build3'
      }, {
        start: 1235,
        end: 12345,
        name: 'build4'
      }]
    }];

    t.deepEqual(bluse(data, {
      unique: true
    }), {
      "name": ["json-ex", "bluse"],
      "tags": ["nodejs", "utility", "npm", "json", "unique"],
      "contributors:name": ["Gabriel J. Csapo"],
      "doesNotExistElsewhere": ["hello world"],
      "description": ["Extends JSON to be able to serialize and deserialize more than just basic primitives.", "⚗️ blend and fuse data with ease"],
      "package:directDependencies": [45, 3],
      "package:totalDependencies": [803, 1093],
      "package:resolveDependencies": ["moment@1.0.2", "tape@4.0.2", "moment@2.0.2", "tape@10.0.2", "tap@11.0.2"],
      "builds:start": [1235],
      "builds:end": [12345],
      "builds:name": ["build1", "build2", "build3", "build4"]
    });
    t.end();
  })

});
