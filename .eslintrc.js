module.exports = {
  env: {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jquery": true
  },
  globals: {
    "Vue": true,
    "_": true,
    "mapGetters": true,
    "mapState": true,
    "types": true,
    "Velocity": true,
    "moment": true,
    "Raven": true,
    "process": true
  },
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "semi": [2],
  }
};
