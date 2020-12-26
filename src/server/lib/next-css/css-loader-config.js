const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const findUp = require('find-up');
const path = require("path");
const fileExtensions = new Set();
let extractCssInitialized = false;

module.exports = (
  config,
  {
    extensions = [],
    cssModules = false,
    cssLoaderOptions = {},
    dev,
    isServer,
    postcssLoaderOptions = {},
    loaders = [],
  },
) => {
  // We have to keep a list of extensions for the splitchunk config
  // eslint-disable-next-line no-restricted-syntax
  for (const extension of extensions) {
    fileExtensions.add(extension);
  }

  if (!isServer) {
    // eslint-disable-next-line no-param-reassign
    config.optimization.splitChunks.cacheGroups.styles = {
      name: 'styles',
      test: new RegExp(`\\.+(${[...fileExtensions].join('|')})$`),
      chunks: 'all',
      enforce: true,
    };
  }

  if (!isServer && !extractCssInitialized) {
    config.plugins.push(new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: dev
        ? 'static/css/[name].css'
        : 'static/css/[name].[contenthash:8].css',
      chunkFilename: dev
        ? 'static/css/[name].chunk.css'
        : 'static/css/[name].[contenthash:8].chunk.css',
    }));
    extractCssInitialized = true;
  }

  const postcssConfig = findUp.sync('postcss.config.js', {
    cwd: config.context,
  });
  let postcssLoader;

  if (postcssConfig) {
    // Copy the postcss-loader config options first.
    const postcssOptionsConfig = {
      ...postcssLoaderOptions.config,
      path: postcssConfig,
    };

    postcssLoader = {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: path.resolve(postcssConfig)
        }
      }
    };
  }

  console.log('css',cssModules);
  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[local]_[hash:base64:5]',
        exportLocalsConvention: 'camelCase',
        exportOnlyLocals: isServer,
      },
      sourceMap: dev,
      importLoaders: loaders.length + (postcssLoader ? 1 : 0),
    },
  };

  // When not using css modules we don't transpile on the server
  if (isServer && !cssModules) {
    return ['ignore-loader'];
  }

  // When on the server and using css modules we transpile the css



  if (isServer && cssModules) {
    /*
    console.log('--------------------server');
    const obj =[cssLoader, postcssLoader, ...loaders].filter(Boolean);
    let  str = JSON.stringify(obj);
    str = JSON.stringify(obj, null, 4); // (Optional) beautiful indented output.
    console.log(str); // Logs output to dev tools console.
*/
    return [cssLoader, postcssLoader, ...loaders].filter(Boolean);
  }
/*
  console.log('-------------not server');
  const obj =[
    !isServer && dev && 'extracted-loader',
    !isServer && MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader,
    ...loaders,
  ].filter(Boolean);
  let  str = JSON.stringify(obj);
  str = JSON.stringify(obj, null, 4); // (Optional) beautiful indented output.
  console.log(str); // Logs output to dev tools console.
*/
  return [
    !isServer && dev && 'extracted-loader',
    !isServer && MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader,
    ...loaders,
  ].filter(Boolean);
};
