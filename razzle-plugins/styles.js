'use strict';

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
  config.module.rules.push({
    test: /\.less$/,
    // exclude: [paths.appBuild],
    use: IS_NODE
      ? [
        {
          // on the server we do not need to embed the css and just want the identifier mappings
          // https://github.com/webpack-contrib/css-loader#scope
          loader: require.resolve('css-loader/locals'),
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName,
          },
        },
        {
          loader: require.resolve('less-loader'),
        },
      ]
      : IS_DEV
        ? [
          {
            loader: require.resolve('style-loader'),
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
          // MiniCssExtractPlugin.loader,
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

  })
  return config;
}
