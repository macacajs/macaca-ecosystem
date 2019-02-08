#!/usr/bin/env node

'use strict'

const path = require('path');
const program = require('commander');
const LCL = require('last-commit-log');
const { parse: urlParse } = require('url');
const { execSync } = require('child_process');

const lcl = new LCL();

program
  .option('-c, --cwd <s>', 'pointed dist directory')
  .option('-b, --branch <s>', 'pointed branch to publish')
  .option('-v, --versions', 'output version infomation')
  .usage('');

program
  .command('push', 'push to remote')
  .action((cmd, options) => {
    const cwd = path.resolve(program.cwd || process.cwd());
    const branch = program.branch;

    if (!process.env.REPO_TOKEN) {
      console.log('missing process.env.REPO_TOKEN');
    }

    const execSyncWithLog = cmd => {
      console.log(cmd);
      console.log(cwd);
      execSync(cmd, {
        cwd,
        stdio: [0, 1, 2],
        env: process.env,
      });
    };

    const gitInfo = lcl.getLastCommitSync();
    console.log(gitInfo);
    const gitBranch = gitInfo.gitBranch;
    if (!~['master', 'develop'].indexOf(gitBranch)) {
      console.log(`${gitBranch} is not in [master, develop]`);
      if (!gitBranch.startsWith('docs')) {
        console.log(`${gitBranch} is not starts with docs`);
        process.exit(0);
        return;
      }
    }
    const { path: originGitPath } = urlParse(gitInfo.gitUrl);
    execSyncWithLog('git init');
    execSyncWithLog('git add --all .');
    execSyncWithLog('git commit -m "Travis CI Auto Builder"');

    execSyncWithLog(`git push --quiet --force https://$REPO_TOKEN@github.com${originGitPath}.git master:${branch}`);
    process.exit(0);
  }).on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ macaca-ecosystem push -c ./docs_dist -b gh-pages');
  });

program.parse(process.argv);
