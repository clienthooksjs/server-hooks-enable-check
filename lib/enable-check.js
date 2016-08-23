'use strict';

const shell = require('shelljs');

const params = JSON.parse(process.argv[3]);

const pluginName = process.argv[2];

shell.config.silent = true;

if (pluginName !== 'pre-receive') {
  process.stderr.write('enable-check >> must be used for `pre-receive`.\n');
}

try {
  const cache = shell.exec(`git show ${params.newRev}:.clienthooks.cache`).toString();

  const sha = shell.exec(`git rev-parse ${params.newRev}~`).toString();

  if (cache!== sha) {
    process.stdout.write('enable-check >> please reinstall `client-hooks`\n');
  }

  // remove sha commit
  shell.exec(`git reset --hard ${params.newRev}~`);

} catch (error) {
  process.stdout.write('enable-check >> please reinstall `client-hooks`\n');
}

