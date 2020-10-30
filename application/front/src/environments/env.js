
const { writeFile } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
var environment = argv.environment;
var isProd = environment === 'prod';

var targetPath = "./src/environments/environment." + environment + ".ts";

var packageDatas = require('../../package.json');

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProd},
   httpdBackHost: '${process.env.HTTPD_BACK_HOST}',
   version: '${packageDatas.version}'
};
`;

writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Output generated at " + targetPath);
});

