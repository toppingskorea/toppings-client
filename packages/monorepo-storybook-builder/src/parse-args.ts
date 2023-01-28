import yargs from 'yargs';

const argv = yargs
  .wrap(yargs.terminalWidth())
  .option('packages', {
    alias: 'p',
    desc: 'Directory for package.jsons (monorepo support)',
    type: 'string',
  })
  .option('out', {
    alias: 'o',
    desc: 'Configure the output directory',
    type: 'string',
  })
  .parseSync();

export default () => {
  return {
    PACKAGES_DIRECTORY: argv.packages,
    OUTPUT_DIR: argv.out,
  };
};
