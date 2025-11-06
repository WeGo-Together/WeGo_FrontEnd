module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0],
    'subject-min-length': [2, 'always', 5],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100], // body 한 줄 최대 100글자
  },
};
