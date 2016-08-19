'use strict';

const fork = require('child_process').fork;

const path = require('path');

class EnableCheckPlugin {
  constructor({ cwd = '', hookName = '', hookParams = {} } = {}) {
    this[Symbol.for('hookName')] = hookName;

    this[Symbol.for('initProcess')]();
  }

  getProcess() {
    return this[Symbol.for('process')];
  }

  getHookName() {
    return this[Symbol.for('hookName')];
  }

  [Symbol.for('initProcess')]() {
    const modulePath = path.join(__dirname, 'lib','enable-check.js');

    const hookName = this.getHookName();

    this[Symbol.for('process')] = fork(modulePath, [hookName], {silent: true});
  }
};

module.exports = EnableCheckPlugin;
