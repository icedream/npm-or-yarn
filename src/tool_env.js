import spawn from 'execa';
import { env } from 'process';
import createDebug from 'debug';

const debug = createDebug('tool');

function detectPackageManager() {
  // @TODO - use a better data source than the user-configurable user agent
  const userAgent = process.env.npm_config_user_agent;

  // Yarn?
  if (/\byarn\/[\d.]+\b/.test(userAgent)) {
    return 'yarn';
  }

  return 'npm';
}

export const packageManager = detectPackageManager();

/**
 * Executes a given command with given argument array and then resolves the
 * promise with whatever exit code the process returns.
 */
export function execute(name, args, options = {}) {
  return new Promise((resolve, reject) => {
    // console.log('Environment:', env);
    console.log('Executing:', [name, ...args]
      .map(v => (v.includes(' ') ? JSON.stringify(v) : v))
      .join(' '));
    debug('Environment:', env);

    const proc = spawn(name, args, {
      stdio: 'inherit',
      // cwd: undefined,
      env,
      ...options,
    });

    proc.on('error', reject);
    proc.on('close', resolve);
  });
}
