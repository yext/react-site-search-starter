# React Site Search Starter

<div>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg" alt="License"/>
  </a>
</div>
<br>

The React Site Search Starter is an example repo of an Answers experience built with React and
[Answers Headless](https://github.com/yext/answers-headless) using
[Answers Headless React](https://github.com/yext/answers-headless-react) bindings.
It is intended to be forked and modified to create a custom Answers experience.

## Getting Started

To customize the sample site, first fork the repo from Github using the 'Fork' button on the top right of the Github page
- Next, clone the repo with the command: `git clone https://github.com/yext/react-site-search-starter.git`
  - Note: The URL will need to be updated if you are cloning a forked site
- Install the dependencies by running `npm i`
- To run the app in development mode, run `npm start`

### Configuring the Search Site
The site's config files are located in the `src/config` folder.

#### Answers Headless Config
The `answersHeadlessConfig` defines general configuration for the site. Refer to the `HeadlessConfig` type from
'@yext/answers-headless' to view all of the configuration options. To configure it for a custom site, open
`src/config/answersHeadlessConfig.ts` in a code editor and update the `apiKey` and the `experienceKey` to match
the keys associated with your Answers experience configuration.

#### Routing Config
The `routeConfig` defines which pages are rendered for various URL paths.
Open `src/config/routeConfig.tsx` and modify the object so that the `verticalKey` props for the pages match
the verticalKeys for your search experience. Feel free to remove any routes which are not needed for your experience.
If you would like to add a new page, copy one of the existing pages from `src/pages` and modify it to suit your needs.

#### Universal Results Config
The `universalResultsConfig` configures the verticals rendered by the universal results component.
Open the universalResultsConfig from `src/universalResultsConfig.ts`. Modify the object so that the keys of the object
are the vertical keys needed for your search experience. To view the configuration options for each vertical,
refer to the VerticalConfig interface from `src/components/UniversalResults.tsx`

### Answers React Components
The building block components which make up this starter app are located in `src/components`. The components
provide robust prop interfaces for customizing their behavior. If the customiziation offered is not sufficient, the components
may be edited directly to suit your needs.

#### Custom Component Styling
The styling of the components can be customized with the `customCssClasses` and the `cssCompositionMethod` props.
The `customCssClasses` prop defines a CSS class interface which represents the component's DOM structure.
Tailwind utility classes can be provided to this class interface for customizing the styling. For example, the
padding around the `Navigation` component can be adjusted by passing in the following object as the `customCssClasses` prop:
```ts
{ nav: 'pt-10' }
```

The `cssCompositionMethod` prop customizes how the `customCssClasses` is combined with the built-in styling for the component.
- 'merge' keeps the component's built-in classes and adds the custom classes to them (default).
- 'replace' ignores all of the component’s built-in classes and only uses the custom classes.
- 'assign' keeps the component's built-in classes, however custom classes will completely override their associated built-in classes.
 
For example, suppose a component has a built-in theme of `{ icon: 'flex', button: 'px-4' }`,
and it is provided a custom theme of `{ icon: 'bg-white' }`.
The various composition methods would result in the following composed themes:
- Merge: `{ icon: 'flex bg-white', button: 'px-4' }`
- Replace: `{ icon: 'bg-white' }`
- Assign: `{ icon: 'bg-white', button: 'px-4' }`

### Creating a Production Build

To create an optimized production build, run `npm run build`
The site will be available in the `build` folder which can be served with a command such as `npx serve -s build`

## License

The Yext React Site Search Starter is an open-sourced library licensed under the [BSD-3 License](./LICENSE).
