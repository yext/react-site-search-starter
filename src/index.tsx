import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';
import './sass/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import PageBuilderApp from './PageBuilderApp';
// import pageBuilderAnswersAppConfig from './config/pageBuilderAnswersAppConfig';

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <PageBuilderApp config={pageBuilderAnswersAppConfig}/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

registerServiceWorker();