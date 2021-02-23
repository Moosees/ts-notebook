import { Command } from 'commander';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a local notebook')
  .option('-p, --port <number>', 'port to run server on', '4242')
  .action((filename = 'notebook.js', { port }) => console.log(filename, port));
