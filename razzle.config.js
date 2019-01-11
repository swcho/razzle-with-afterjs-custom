'use strict';

module.exports = {
  plugins: [
    'typescript',
    {
      func: require('./razzle-plugins/styles'),
    },
  ],
  // modify(config, { target, dev }, webpack) {
  //   console.log(target, dev)
  //   console.log(JSON.stringify(config, null, 2))
  //   for (const rule of config.module.rules) {
  //     if (rule.test && rule.test.toString() === "/\\.(js|jsx|mjs)$/") {
  //       console.log(JSON.stringify(rule, null, 2))

  //     }

};
