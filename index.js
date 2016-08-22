'use strict';

const fork = require('child_process').fork;

const path = require('path');

class EnableCheckPlugin {
  constructor({ cwd = '', hookName = '', hookParams = {} } = {}) {
    this[Symbol.for('hookParams')] = hookParams;
    this[Symbol.for('hookName')] = hookName;

    this[Symbol.for('initProcess')]();
  }

  getProcess() {
    return this[Symbol.for('process')];
  }

  getHookName() {
    return this[Symbol.for('hookName')];
  }

  getHookParams() {
    return this[Symbol.for('hookParams')];
  }

  [Symbol.for('initProcess')]() {
    const modulePath = path.join(__dirname, 'lib','enable-check.js');

    const hookParams = JSON.stringify(this.getHookParams());

    const hookName = this.getHookName();

    const process = this.getProcess();

    this[Symbol.for('process')] = fork(modulePath, [hookName, hookParams], {silent: true});
  }
};

module.exports = EnableCheckPlugin;
