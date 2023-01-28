import shell from 'shelljs';
import fs from 'fs';
import path from 'path';
import { PackageJsonType } from './types';

const colors = ['purple', 'pink', 'orange', 'green', 'blue', 'red'];

const generateRow = (packageJson: PackageJsonType, index: number) => `
  <a href="${path.join(packageJson.name, 'index.html')}" class="package-row">
    <span class="title is-${colors[index % colors.length]}">
      ${packageJson.name}
    </span>
    <span class="description">${packageJson.description}</span>
  </a>
`;

const generateHTML = (packages: PackageJsonType[]) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Storybooks</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="monorepo-index.css">
  </head>
  <body>
    <img class="banner" src="storybook.svg" alt="Storybook"/>
    <div class="content">
      ${packages.map(generateRow).join('')}
    </div>
  </body>
  </html>
`;

function buildMonorepoIndex(packages: PackageJsonType[], outputDir: string) {
  console.log('=> Building index.html for monorepo');

  const indexHtml = generateHTML(packages);

  shell.cp(path.join(__dirname, 'assets', 'storybook.svg'), path.join(outputDir, 'storybook.svg'));
  shell.cp(path.join(__dirname, 'assets', 'index.css'), path.join(outputDir, 'monorepo-index.css'));

  fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml);
}

export default buildMonorepoIndex;
