import { execSync } from 'child_process';
import packageJson from '../package.json';

const installPackage = packageName => {
  if (
    packageJson.hasOwnProperty('devDependencies') === false ||
    packageJson.devDependencies.hasOwnProperty(packageName) === false
  ) {
    console.log(`installing ${packageName}...`);
    execSync(`yarn add -D ${packageName}`);
    console.log(`${packageName} installed!`);
  }
};

const installPackages = packages => {
  const packagesArray = packages instanceof Array ? packages : [packages];
  packagesArray.forEach(installPackage);
};

export default installPackages;
