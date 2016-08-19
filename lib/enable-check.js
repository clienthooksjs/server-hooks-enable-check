'use strict';

const pluginName = process.argv[2];

if (pluginName !== 'pre-receive') {
  process.stderr.write('enable-check >> must be used for `pre-receive`.');
}
