'use strict';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (config) => {
  config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: "static"
  }))
  return config
}
