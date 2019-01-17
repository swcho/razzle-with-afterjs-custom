const path = require('path');
module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [{
      loader: require.resolve('ts-loader')
    }, {
      loader: require.resolve('react-docgen-typescript-loader')
    }]
  });
  config.module.rules.push({
    test: /\.(less)$/,
    use: [{
      loader: require.resolve('style-loader')
    }, {
      loader: require.resolve('css-loader')
    }, {
      loader: require.resolve('less-loader')
    }]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};