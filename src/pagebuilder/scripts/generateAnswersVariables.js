const fs = require('fs');
const chokidar = require('chokidar');
const createAnswersVariables = require('./createAnswersVariables');

const configPath = __dirname + '/../pageBuilderAnswersAppConfig.json';
generateAnswersVariables();

chokidar.watch(configPath).on('change', () => generateAnswersVariables());

function generateAnswersVariables() {
  const config = JSON.parse(fs.readFileSync(configPath));
  createAnswersVariables(config);
}
