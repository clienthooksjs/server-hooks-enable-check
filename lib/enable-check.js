'use strict';

const shell = require('shelljs');

const pluginName = process.argv[2];

const params = JSON.parse(process.argv[3]);

if (pluginName !== 'pre-receive') {
  process.stderr.write('enable-check >> must be used for `pre-receive`.');
}

try {
  const sha = shell.exec(`git-show ${params.newRev}:.clienthooks.cache`);

  if (sha !== params.oldRev) {
    process.stdout.write('enable-check >> please reinstall `client-hooks`');
  }
} catch (error) {
    process.stdout.write('enable-check >> please reinstall `client-hooks`');
}

