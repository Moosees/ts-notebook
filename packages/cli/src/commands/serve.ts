import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a local notebook')
  .option('-p, --port <number>', 'port to run server on', '4242')
  .action((filename = 'notebook.js', options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(parseInt(options.port), path.basename(filename, '.js') + '.js', dir);
  });
