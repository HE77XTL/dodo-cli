#!/usr/bin/env node

import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import { program }from 'commander';
import gitDownload from 'download-git-repo';


// inquirer.prompt([
//   {
//     name:'type',
//     type: 'list',
//     message: 'choose a type of project to init',
//     choices: ['react', 'vue', 'h5'],
//     default: 'react',
//   }
// ]).then((res) => {})


program
    .command('create <name>')
    .description('create a project from HE77XTL/template-admin-vue')
    .action((name) =>{
      if(!name){
        console.log(chalk.red('need a project name'));
        return
      }
      const spinner = ora('template Downloading');
      spinner.start();

      //const url = 'direct:' + 'https://gitee.com/snowzoro/cli-test.git' npm install child_process
      const url = 'direct:' + 'https://github.com/HE77XTL/template-admin-vue.git#main'

      // git clone https://gitee.com/snowzoro/dodoui-react.git  download-git-repo Response code 403 (Forbidden)

      gitDownload(url, name, function (err) {
        if(err){
          spinner.fail();
          console.log(chalk.red('downloading template fail'));
          console.log(chalk.gray(err));
          return
        }
        spinner.succeed();
        console.log(chalk.green('init project success! '));
      })
    })
    .version('0.8.0');
program.parse(process.argv);
