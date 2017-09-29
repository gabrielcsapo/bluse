module.exports = {
    title: "bluse",
    description: "Generating data is hard enough, combining it should be easy ⚗️",
    nav: {
      Source: "https://github.com/gabrielcsapo/bluse"
    },
    options: {
      width: '90%'
    },
    body: [{
      type: "html",
      value: `
        <div style="text-align:center;">
          <blockquote style="display:inline-block;">
            <a href="https://github.com/gabrielcsapo/bluse"><code>bluse</code></a> ⚗️ blend and fuse data with ease
          </blockquote>
        </div>
      `
    }, {
      type: "code",
      title: "Bluse a simple object 😉",
      value: `
        const bluse = require('bluse');

        const data = {
          name: "bluse",
          tags: ["nodejs", "utility", "npm"],
          description: "⚗️ blend and fuse data",
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

        console.log(JSON.stringify(bluse(data), null, 4));
      `
    }, {
      type: 'code',
      title: 'Bluse an array of complex objects 🔬',
      value: `
        const bluse = require('bluse');

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
          description: "⚗️ blend and fuse data",
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

        console.log(JSON.stringify(bluse(data), null, 4));
      `
    }, {
      type: 'code',
      title: 'Bluse an array of EXTREMELY complex objects 🔬',
      value: `
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

        console.log(JSON.stringify(bluse(data), null, 4));
      `
    }, {
      type: 'code',
      title: 'Bluse an array of complex objects and get back unique values 🔬',
      value: `
        const bluse = require('bluse');

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
          description: "⚗️ blend and fuse data",
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

        console.log(JSON.stringify(bluse(data, { unique: true }), null, 4));
      `
    }, {
      type: 'code',
      title: 'Bluse an object with nested mixed array types 🔬',
      value: `
        const bluse = require('bluse');

        const data = {
          foo: ['echo $FOO'],
          bar: ['bar', {
            barfoo: []
          }],
          install: ['npm --version', 'node --version', {
            npm: ['npm install', {
              list: ['ls -lh']
            }]
          }],
          lint: ['npm run lint'],
          coverage: ['npm run coverage'],
          test: ['npm test'],
          docs: ['npm run generate-docs']
        };

        console.log(JSON.stringify(bluse(data), null, 4));
      `
    }],
    output: "./docs",
    externals: [
      "./dist/bluse.min.js"
    ]
}
