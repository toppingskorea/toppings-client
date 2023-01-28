import buildMonorepoIndex from './build-monorepo-index';
import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { exec } from './utils';
import shell from 'shelljs';
import { DirectoryPathType, PackageJsonType } from './types';

function buildStorybook(currentPackage: PackageJsonType, outputDirectory: DirectoryPathType, npmScriptName: string) {
  console.log(`=> Building storybook for: ${currentPackage.name}`);

  // clear and re-create the out directory
  shell.rm('-rf', outputDirectory);
  shell.mkdir(outputDirectory);

  if (currentPackage.scripts[npmScriptName]) {
    exec(`npm run ${npmScriptName} -- -o ${outputDirectory}`);
  } else {
    exec(`build-storybook  -o ${outputDirectory}`);
  }
}

function buildSubPackage(
  originalDirectory: DirectoryPathType,
  subDirectory: DirectoryPathType,
  outputDirectory: DirectoryPathType,
  npmScriptName: string,
) {
  shell.cd(subDirectory);

  if (!fs.existsSync('package.json')) {
    return;
  }

  const subPackageJsonBinary = fs.readFileSync(path.resolve('package.json'), 'utf8');
  const subPackageJson = JSON.parse(subPackageJsonBinary) as PackageJsonType;

  if (!fs.existsSync('.storybook')) {
    return;
  }

  buildStorybook(subPackageJson, outputDirectory, npmScriptName);

  const builtStorybook = path.join(subDirectory, outputDirectory, '*');
  const outputPath = path.join(originalDirectory, outputDirectory, subPackageJson.name);

  shell.mkdir('-p', outputPath);
  shell.cp('-r', builtStorybook, outputPath);
  shell.rm('-rf', builtStorybook);

  return subPackageJson;
}

export default function build(
  outputDirectory: DirectoryPathType,
  packagesDirectory: DirectoryPathType,
  npmScriptName: string,
) {
  const originalDirectory: DirectoryPathType = process.cwd();

  const packages = glob
    .sync(path.join(originalDirectory, packagesDirectory, '**/package.json'), {
      ignore: '**/node_modules/**',
    })
    // eslint-disable-next-line @typescript-eslint/unbound-method
    .map(path.dirname)
    .map((subPackage) => buildSubPackage(originalDirectory, subPackage, outputDirectory, npmScriptName))
    .filter((subPackage): subPackage is PackageJsonType => !!subPackage);

  shell.cd(originalDirectory);

  buildMonorepoIndex(packages, outputDirectory);

  console.log('Done!');
}
