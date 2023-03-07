#!/usr/bin/env node

import inquirer from 'inquirer';



import gitClone from 'git-clone';

import ora from 'ora';
import chalk from 'chalk';
import { program }from 'commander';


program
    .command('create <name>')
    .description('create a project from HE77XTL/template-admin-vue')
    .action((name) =>{
      if(!name){
        console.log(chalk.red('need a project name'));
        return
      }

      inquirer.prompt([
        {
          name:'type',
          type: 'list',
          message: 'choose a type of project to init',
          choices: ['react', 'vue', 'h5'],
          default: 'react',
        }
      ]).then((res) => {
        console.log('res---');
        console.log(res);

        const spinner = ora('template Downloading');
        spinner.start();

        const url = 'https://gitee.com/snowzoro/cli-test.git'
        //const url = 'https://github.com/HE77XTL/template-admin-vue.git#main'

        // git clone https://gitee.com/snowzoro/dodoui-react.git  download-git-repo Response code 403 (Forbidden)
        gitClone(url, 'test/temp2', function (err) {
          console.log('git clone');
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
    })
    .version('0.8.0');
program.parse(process.argv);
