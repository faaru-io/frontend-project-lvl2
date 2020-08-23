#!/usr/bin/env node

import commander from 'commander';

const program = commander.program;
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.2');

program
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>');

program.parse(process.argv);

if(program.format) console.log(' - %s format', program.format);

