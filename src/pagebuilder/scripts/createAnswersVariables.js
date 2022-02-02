const fs = require("fs-extra");

const styleVariableNames = {
  '--yxt-color-brand-primary': 'brandColor',
  '--yxt-base-font-size': 'baseFontSize',
  '--yxt-cta-border-radius': ['ctas', 'borderRadius'],
  '--yxt-cta-color': ['ctas', 'color']
};
const path = __dirname + '/../sass/answers-variables.scss';

function createAnswersVariables(config) {
  let answersVars = ':root {\n';
  const styles = config.common?.style;
  if (styles) {
    Object.entries(styleVariableNames).forEach(([name, path]) => {
      let value = '';
      if (!Array.isArray(path)) {
        value = _findValue(styles, path);
      } else {
        value = path.reduce((obj, key) => {
          return _findValue(obj, key);
        }, styles).toString();
      }
      answersVars += _constructVariableString(name, value);
    });
  }
  answersVars += '}'

  fs.writeFileSync(path, answersVars);
}

function _findValue(arr, path) {
  let value = '';
  Object.entries(arr).forEach(([key, val]) => {
    if (key === path) {
      value = val;
    }
  });
  return value;
}

function _constructVariableString(name, value) {
  if (!value) {
    return '';
  }
  return '\t' + name + ': ' + value + ';\n';
}

module.exports = createAnswersVariables;
