'use strict';

module.exports = {
  plugins: [
    'typescript',
    {
      func: require('./razzle-plugins/styles'),
    },
    // {
    //   func: require('./razzle-plugins/build-analyzer'),
    // },
  ],
  // modify: (config, { target, dev }) => {
  //   console.log(target, dev)
  //   console.log(JSON.stringify(config, null, 2))
  //   for (const rule of config.module.rules) {
  //     if (rule.test && rule.test.toString() === "/\\.(js|jsx|mjs)$/") {
  //       console.log(JSON.stringify(rule, null, 2))
  //     }
  //   }
  // }
};
