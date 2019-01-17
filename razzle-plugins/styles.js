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

  if (!config.optimization) {
    config.optimization = {};
  }
  if (!config.optimization.splitChunks) {
    config.optimization.splitChunks = {
      // chunks: 'all'
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /(\.vendor\.less$|node_modules\/)/,
          chunks: 'initial',
          enforce: true,
        },
        common: {
          name: 'common',
          test: /\/src\/components\/.*\.(less|tsx)$/,
          chunks: 'all',
          enforce: true,
        }
      }
    }
  }
  config.plugins.push(new MiniCssExtractPlugin({
    filename: '[name].[hash].css'
    // chunkFilename: IS_DEV ? '[id].css' : '[id].[hash].css',
  }));

  const localIdentName = '[path][name]_[local]';

  const RE_VENDOR_STYLE = /(\.vendor\.less$|node_modules\/.*\.css$)/;
  config.module.rules.push({
    test: RE_VENDOR_STYLE,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          localIdentName,
          importLoaders: 2,
          minimize: true,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: postCssOptions,
      },
      {
        loader: require.resolve('less-loader'),
      },
    ]
  })

  const RE_COMMON_STYLE = /\/src\/components\/.*\.less$/;
  config.module.rules.push({
    test: RE_COMMON_STYLE,
    use: IS_DEV
      ? [
        {
          loader: IS_NODE
            ? require.resolve('isomorphic-style-loader') //MiniCssExtractPlugin.loader
            : require.resolve('isomorphic-style-loader'),
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            localIdentName,
            modules: true,
            importLoaders: 2,
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
            localIdentName,
            modules: true,
            importLoaders: 2,
            minimize: true,
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
    exclude: [RE_VENDOR_STYLE, RE_COMMON_STYLE],
    use: IS_DEV
      ? [
        {
          loader: require.resolve('isomorphic-style-loader'),
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            importLoaders: 2,
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
          loader: require.resolve('isomorphic-style-loader'),
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            importLoaders: 2,
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
