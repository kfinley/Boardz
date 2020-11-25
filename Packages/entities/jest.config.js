const { pathsToModuleNameMapper } = require('ts-jest/utils');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: ".",
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "vue"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.js$": "babel-jest"
  },
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: true,
    }
  },

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
  testURL: "http://localhost/",

};
