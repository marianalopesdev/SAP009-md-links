#!/usr/bin/env node

const mdLinks = require('./src/fileStatus');

const program = require('commander');
const package = require('./package.json');

program.version(package.version);

program
    
    program
    .argument('<path>')
    .option('--validate', 'Verifica a integridade dos links')
    .option('--stats', 'Verifica a integridade dos links')
    .description('Mostra os links do arquivo')
    .action((path, option) => {
        
    mdLinks(path,option);
    });


program.parse(process.argv);