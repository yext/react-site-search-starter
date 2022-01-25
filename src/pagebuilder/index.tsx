import React from 'react';
import ReactDOM from 'react-dom';
import '../tailwind.css';
import '../sass/index.scss';
import PageBuilderApp from './PageBuilderApp';
import pageBuilderAnswersAppConfig from './pageBuilderAnswersAppConfig';
import registerServiceWorker from '../registerServiceWorker';

/**
 * To test pageBuilderApp, use this index file instead of src/index.tsx.
 * In path.js, modify the value of appIndexJs in the export module:
 * "appIndexJs: resolveModule(resolveApp, 'src/pagebuilder/index')"
 */
ReactDOM.render(
  <React.StrictMode>
    <PageBuilderApp config={pageBuilderAnswersAppConfig}/>
  </React.StrictMode>,
  document.getElementById('root')
);

registerServiceWorker();