'use strict';

const spawn = require('cross-spawn');
const dargs = require('dargs');

// https://github.com/mattdesl/spawn-npm-install/blob/master/index.js
// https://github.com/IonicaBizau/spawno/blob/master/lib/index.js
// https://github.com/IonicaBizau/proc-output/blob/master/lib/index.js
// https://github.com/leeroybrun/spawn-npm/blob/master/lib/index.js
//
// https://www.npmjs.com/package/dargs

module.exports = function npmSpawn(cmd, args, spawnArgs) {
  if (typeof args === 'undefined') {
    args = {};
    spawnArgs = {};
  }

  if (typeof spawnArgs === 'undefined') {
    spawnArgs = {};
  }

  if (typeof args === 'string') {
    spawnArgs = args;
    args = {};
  }

  if (typeof spawnArgs === 'string') {
    spawnArgs = {
      cwd: spawnArgs
    };
  }

  spawnArgs = spawnArgs || {};
  args = args || {};

  var cliArgs = dargs(args);

  return new Promise((resolve, reject) => {
    let npm = spawn('npm', cliArgs, spawnArgs);

    let stdout = '';
    let stderr = '';

    proc.on('error', err => {
        return reject(err);
    });

    proc.stdout.on('data', chunk => stdout += chunk);
    proc.stderr.on('data', chunk => stderr += chunk);

    proc.on('close', code => {
      return resolve({
        stdout: stdout,
        stderr: stderr,
        code: code
      });
    });
  });
}
