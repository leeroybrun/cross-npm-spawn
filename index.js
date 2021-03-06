'use strict';

const crossSpawn = require('cross-spawn');
const dargs = require('dargs');

module.exports = function npmSpawn(cmd, args, spawnArgs, custSpawn) {
  const spawn = custSpawn || crossSpawn;

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

  var cliArgs = [cmd].concat(dargs(args));

  return new Promise((resolve, reject) => {
    let npm = spawn('npm', cliArgs, spawnArgs);

    let stdout = '';
    let stderr = '';

    npm.on('error', err => {
        return reject(err);
    });

    npm.stdout.on('data', chunk => stdout += chunk);
    npm.stderr.on('data', chunk => stderr += chunk);

    npm.on('close', code => {
      return resolve({
        stdout: stdout,
        stderr: stderr,
        code: code
      });
    });
  });
};
