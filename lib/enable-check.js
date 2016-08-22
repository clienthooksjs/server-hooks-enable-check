'use strict';

const shell = require('shelljs');

const params = JSON.parse(process.argv[3]);

const pluginName = process.argv[2];

shell.config.silent = true;

if (pluginName !== 'pre-receive') {
  process.stderr.write('enable-check >> must be used for `pre-receive`.');
}

try {
  const sha = shell.exec(`git show ${params.newRev}:.clienthooks.cache`).toString();

  if (sha !== params.oldRev) {
    process.stdout.write('enable-check >> please reinstall `client-hooks`');
  }

  // remove sha commit
  shell.exec('git reset --hard HEAD~');

} catch (error) {
  process.stdout.write('enable-check >> please reinstall `client-hooks`');
}

