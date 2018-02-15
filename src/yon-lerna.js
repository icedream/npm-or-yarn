import { argv, exit } from 'process';
import { packageManager, execute } from './tool_env';

let args = [];

if (packageManager !== 'npm') {
  args.push(`--npm-client=${packageManager}`);
}

args.push(...argv.splice(2));

if (packageManager === 'yarn') {
  // Enforce using Yarn Workspaces instead of Lerna's own dependency management
  if (args.includes('bootstrap')) {
    args = args.filter(arg => !/^--(hoist|use-workspaces)/i.test(arg));
    // args.push('--hoist');
    args.push('--nohoist');
    args.push('--use-workspaces');
  }
}

if (args.includes('bootstrap')) {
  if (process.env.ONGOING_LERNA_BOOTSTRAP === 'yes') {
    console.warn('bootstrap called inside bootstrap phase, ignoring.');
    exit(0);
  }
  process.env.ONGOING_LERNA_BOOTSTRAP = 'yes';
}

execute('lerna', args)
  .then(() => { exit(0); })
  .catch((err) => {
    console.error('failed to execute tool:', err);
    exit(err.exitCode || 1);
  });
