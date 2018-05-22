# Canary Dashboard demo

## Setup

* `npm install` to install dependencies
* `yarn start` or `npm start` to start dev server

## Libraries and frameworks

* [React](https://reactjs.org/)
* [Flux](https://facebook.github.io/flux/)
* [Material-UI](https://github.com/mui-org/material-ui) - Material-themed React components
* [create-react-app](https://github.com/facebook/create-react-app) / [react-scripts](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts) - Used to generate initial project files. Note: scripts and config files (e.g. webpack.config.js) are hidden. Run `npm run eject` to add scripts and config files directly to the project. [info here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject)

## Important files

* 'src/index.tsx' - entry for main js bundle
* 'public/worker.js' - web worker for parsing api data
* 'public/index.html'

### Assumptions

* the "value" property for devices and readings will always be an integer and can be expressed as an 8-bit int (between -128 and 127). If this is not the case, the array type for the values array in public/worker.js can be changed
