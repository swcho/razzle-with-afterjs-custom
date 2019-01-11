'use strict';

// https://github.com/SheikhG1900/with-razzle/blob/73774e85bd/razzle-plugins/react-loadable.js
const { ReactLoadablePlugin } = require("react-loadable/webpack")
module.exports = (config, { target }, webpack, userOptions = {}) => {
  if (target === 'web') {
    config.plugins = [ ...config.plugins, new ReactLoadablePlugin(userOptions)] 
  }
  return config
}
