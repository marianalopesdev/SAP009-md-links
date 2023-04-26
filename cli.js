#!/usr/bin/env node

const mdLinks = require('./fileStatus');

const program = require('commander');
const package = require('./package.json');

program.version(package.version);

program
    .command('add [todo]')
    .description('Adiciona um to-do')
    .action((todo) => {
        console.log(todo);
    });

    
    program
    .argument('<path>')
    .option('--validate', 'Verifica a integridade dos links')
    .option('--stats', 'Verifica a integridade dos links')
    .description('Mostra os links do arquivo')
    .action((path, option) => {
        
   //  console.log(path + ' verify the files, modafocas')
      mdLinks(path,option);
    });


program.parse(process.argv);