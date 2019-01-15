'use strict';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const autoprefixer = require('autoprefixer');
const postCssOptions = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
  ],
};

/**
 * @param {import('webpack').Configuration} [config] - Webpack config
 */
module.exports = (config, { target, dev }, webpack, userOptions = {}) => {
  console.log(target, dev, userOptions);
  const IS_NODE = target === 'node';
  const IS_DEV = dev;
  if (IS_DEV) {
    // config.devtool = 'eval'
  }
  const localIdentName = '[path][name]_[local]';
  const RE_COMMON = /\.common\.less$/;
  if (!config.optimization) {
    config.optimization = {};
  }
  if (!config.optimization.splitChunks) {
    config.optimization.splitChunks = {
      // chunks: 'all'
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.common.less$/,
          chunks: 'all',
          enforce: true,
        }
      }
    }
  }

  config.plugins.push(new MiniCssExtractPlugin({
    filename: '[name].css'
    // chunkFilename: IS_DEV ? '[id].css' : '[id].[hash].css',
  }));

  config.module.rules.push({
    test: RE_COMMON,
    // exclude: [paths.appBuild],
    // use: [
    //   MiniCssExtractPlugin.loader,
    //   "css-loader",
    //   "less-loader",
    // ]
    use: IS_DEV
      ? [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName,
            sourceMap: true,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: Object.assign(postCssOptions, { sourceMap: true }) ,
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            sourceMap: true,
          },
        },
      ]
      : [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            importLoaders: 1,
            minimize: true,
            localIdentName,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: postCssOptions,
        },
        {
          loader: require.resolve('less-loader'),
        },
      ],
  });

  config.module.rules.push({
    test: /\.less$/,
    exclude: [RE_COMMON],
    use: IS_DEV
      ? [
        {
          loader: IS_NODE ? require.resolve('style-loader/universal') : require.resolve('style-loader'),
          options: {
            universal: true,
          }
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName,
            sourceMap: true,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: Object.assign(postCssOptions, { sourceMap: true }) ,
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            sourceMap: true,
          },
        },
      ]
      : [
        {
          loader: require.resolve('simple-universal-style-loader'),
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            importLoaders: 1,
            minimize: true,
            localIdentName,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: postCssOptions,
        },
        {
          loader: require.resolve('less-loader'),
        },
      ],
  });
  return config;
}
