'use strict';

const shell = require('shelljs');

const pluginName = process.argv[2];

const hookParams = JSON.parse(process.argv[3]);

if (pluginName !== 'pre-receive') {
  process.stderr.write('enable-check >> must be used for `pre-receive`.');
}

shell.exec(`git diff ${hookParams.newValue} ${hookParams.newValue}`);

shell.exec(`git-show ${hookParams.newValue} .clienthooks.cache`);
