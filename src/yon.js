// @flow

import { argv, exit } from 'process';
import { packageManager, execute } from './tool_env';

const mappings = {
  install(...args) {
    switch (packageManager) {
      case 'yarn':
        if (args.length > 0) {
          return ['add', ...args];
        }
        return ['install'];

      default:
        return ['install', ...args];
    }
  },
  run(...args) {
    // TODO - "--" may be part of actual command arguments!
    let dash;
    switch (packageManager) {
      case 'yarn':
        dash = args.findIndex(arg => arg === '--');
        if (dash >= 0) {
          args.splice(dash, 1);
        }
        return args;

      default:
        return args;
    }
  },
};

const args = mappings[argv[2]]
  ? mappings[argv[2]](...argv.slice(2))
  : argv.slice(2);

execute(packageManager, args)
  .then(exit)
  .catch((err) => {
    console.error(err);
    exit(-1);
  });
