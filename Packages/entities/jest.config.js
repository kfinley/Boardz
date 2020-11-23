module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "vue"
  ],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },
  testMatch: [
    "**/dist/**/?(*.)(spec|test).js?(x)"
  ],
  testURL: "http://localhost/"
}
