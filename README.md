# React Site Search Starter

<div>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg" alt="License"/>
  </a>
</div>
<br>

The React Site Search Starter is an example repo of an Answers experience built with React.
It is intended to be forked and modified to create a custom Answers experience.

## Getting Started

If you would like to customize the sample site, first fork the repo from Github using the 'Fork' button on the top right of the Github page
- Next, clone the repo with the command: `git clone https://github.com/yext/react-site-search-starter.git`
  - Note: The URL will need to be updated if you are cloning a forked site
- To run the app in development mode, run `npm start`

### Customizing the Search Site
First open up `src/App.tsx` in a code editor and update the `apiKey` and the `experienceKey` to match the keys associated with your
answers experience configuration.

Modify the `const routes` object so that the `verticalKeys` for the pages match the verticalKeys for your search experience.
Feel free to remove any routes which are not needed for your experience. If you would like to add a new page, copy one of the
existing pages from `src/pages` and modify it to suit your needs.

Next, open up the universalResultsConfig from `src/universalResultsConfig.ts`. Modify the object so that the keys of the object are the vertical
keys needed for your search experience. To view the configuration options for each vertical, refer to the VerticalConfig interface from
`src/components/UniversalResults.tsx`

Finally, update the config inside `src/utils/constants` to match the api and experience keys used above.

## Creating a Production Build

To create an optimized production build, run `npm run build`
The site will be available in the `build` folder which can be served with a command such as `npx serve -s build`

## License

The Yext React Site Search Starter is an open-sourced library licensed under the [BSD-3 License](./LICENSE).