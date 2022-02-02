const fs = require('fs');
const chokidar = require('chokidar');
const createAnswersVariablesFile = require('./createAnswersVariablesFile');

const configPath = __dirname + '/../pageBuilderAnswersAppConfig.json';
generateAnswersVariables();

if (process.argv[2] === '-watch') {
  chokidar.watch(configPath).on('change', () => generateAnswersVariables());
}

function generateAnswersVariables() {
  const config = JSON.parse(fs.readFileSync(configPath));
  createAnswersVariablesFile(config);
}
