const fs = require("fs-extra");
const get = require("lodash/get");

const styleVariableNames = {
  '--yxt-color-brand-primary': 'brandColor',
  '--yxt-base-font-size': 'baseFontSize',
  '--yxt-cta-border-radius': ['ctas', 'borderRadius'],
  '--yxt-cta-color': ['ctas', 'color']
};
const path = __dirname + '/../sass/answers-variables.scss';

function createAnswersVariablesFile(config) {
  let answersVarsFileBody = ':root {\n';
  const styles = config.common?.style;
  if (styles) {
    Object.entries(styleVariableNames).forEach(([name, path]) => {
      const value = get(styles, path);
      answersVarsFileBody += _constructVariableString(name, value);
    });
  }
  answersVarsFileBody += '}';

  fs.writeFileSync(path, answersVarsFileBody);
}

function _constructVariableString(name, value) {
  if (!value) {
    return '';
  }
  return '  ' + name + ': ' + value + ';\n';
}

module.exports = createAnswersVariablesFile;
