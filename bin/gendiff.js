#!/usr/bin/env node

import Command from 'commander';

const program = Command.createCommand();
program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1');

program.parse(process.argv);
